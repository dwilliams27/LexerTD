import { LocatableService, ServiceLocator } from "@/services/serviceLocator";
import { LLM, DiffusionModel, WebGPUContext } from "@/magic";
import { DEV_MODEL_PATHS } from "@/configs/config.dev";

export class GPUService extends LocatableService {
  static readonly serviceName = "GPUService";

  private gpuContext!: WebGPUContext;
  private initialized: boolean = false;
  private modelCache = new Map();

  constructor(serviceLocator: ServiceLocator) {
    super(serviceLocator);
    this.init();
  }

  async init(): Promise<void> {
    this.gpuContext = new WebGPUContext();
    this.gpuContext.initialize();

    const rawDiffusionModel = await this.loadModel('diffusion');
    const diffusion = new DiffusionModel(this.gpuContext);
    await diffusion.initialize();
    
    const llm = new LLM(this.gpuContext);
    await llm.initialize();

    this.initialized = true;
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  public async runInference(input: any): Promise<any> {
    if (!this.initialized) {
      throw new Error('GPU Service not initialized');
    }

    // Implement your WebGPU LLM inference here
    return Promise.resolve({ success: true, data: input });
  }

  async processModelData(response) {
    if (!this.gpuContext?.device) {
      throw new Error('WebGPU not initialized');
    }
    // Get the data as an ArrayBuffer
    const data = await response.arrayBuffer();
    const buffer = new Uint8Array(data);

    // First 8 bytes contain the header size as a 64-bit number
    const headerSize = new DataView(buffer.buffer).getBigUint64(0, true);
    
    // Parse header (metadata)
    const headerData = buffer.slice(8, 8 + Number(headerSize));
    const header = JSON.parse(new TextDecoder().decode(headerData));

    // Process each tensor in the model
    const tensors = new Map();
    let totalSize = 0;

    for (const [name, metadata] of Object.entries(header.tensors)) {
      const [start, end] = metadata.data_offsets;
      const tensorData = buffer.slice(
        8 + Number(headerSize) + start, 
        8 + Number(headerSize) + end
      );

      // Create GPU buffer for this tensor
      const gpuBuffer = await this.createTensorBuffer(tensorData, metadata);
      
      tensors.set(name, {
        buffer: gpuBuffer,
        shape: metadata.shape,
        dtype: metadata.dtype,
        size: tensorData.byteLength
      });

      totalSize += tensorData.byteLength;
    }

    return {
      tensors,
      metadata: header.metadata || {},
      device: this.gpuContext.device,
      totalSize,
      tensorCount: tensors.size
    };
  }

  async createTensorBuffer(tensorData, metadata) {
    // Handle different data types
    let processedData;
    switch (metadata.dtype) {
      case 'F32':
        processedData = new Float32Array(tensorData.buffer, tensorData.byteOffset, tensorData.byteLength / 4);
        break;
      case 'F16':
        // Convert to F32 for now as F16 handling needs special care
        processedData = this.convertFloat16ToFloat32(tensorData);
        break;
      case 'I32':
        processedData = new Int32Array(tensorData.buffer, tensorData.byteOffset, tensorData.byteLength / 4);
        break;
      default:
        throw new Error(`Unsupported dtype: ${metadata.dtype}`);
    }

    // Create and populate GPU buffer
    const buffer = this.gpuContext.device.createBuffer({
      size: processedData.byteLength,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
      mappedAtCreation: true
    });

    new Float32Array(buffer.getMappedRange()).set(processedData);
    buffer.unmap();

    return buffer;
  }

  // Helper for converting FP16 to FP32
  convertFloat16ToFloat32(uint8Array: Uint8Array) {
    const uint16Array = new Uint16Array(uint8Array.buffer, uint8Array.byteOffset, uint8Array.byteLength / 2);
    const float32Array = new Float32Array(uint16Array.length);

    for (let i = 0; i < uint16Array.length; i++) {
      const uint16 = uint16Array[i];
      
      // Extract components
      const sign = (uint16 >> 15) & 0x1;
      let exponent = (uint16 >> 10) & 0x1f;
      let fraction = uint16 & 0x3ff;

      let float32;
      if (exponent === 0x1f) {  // Handle Infinity/NaN
        float32 = fraction === 0 ? 
          (sign ? -Infinity : Infinity) : 
          NaN;
      } else if (exponent === 0) {  // Handle 0/Denormal
        if (fraction === 0) {
          float32 = sign ? -0 : 0;
        } else {
          // Convert denormal
          exponent = -14;
          while (!(fraction & 0x400)) {
            fraction <<= 1;
            exponent--;
          }
          fraction &= 0x3ff;
          float32 = (sign ? -1 : 1) * Math.pow(2, exponent) * (fraction / 0x400);
        }
      } else {  // Handle normal numbers
        float32 = (sign ? -1 : 1) * Math.pow(2, exponent - 15) * (1 + fraction / 0x400);
      }

      float32Array[i] = float32;
    }

    return float32Array;
  }

  // Clean up GPU resources
  destroyModel(model) {
    if (!model) return;

    for (const tensor of model.tensors.values()) {
      tensor.buffer.destroy();
    }
  }

  async loadModel(modelType: 'llm' | 'diffusion') {
    if (this.modelCache.has(modelType)) {
      return this.modelCache.get(modelType);
    }

    const modelPath = DEV_MODEL_PATHS[modelType];
    if (!modelPath) {
      throw new Error(`No dev path configured for model type: ${modelType}`);
    }

    const response = await fetch(`file://${modelPath}`);
    if (!response.ok) {
      throw new Error(`Failed to load model from ${modelPath}`);
    }

    const model = await this.processModelData(response);
    this.modelCache.set(modelType, model);
    return model;
  }

  clearCache() {
    this.modelCache.clear();
  }
}
