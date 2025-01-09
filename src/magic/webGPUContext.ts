export class WebGPUContext {
  device!: GPUDevice;
  queue!: GPUQueue;

  async initialize() {
    if (!navigator.gpu) {
      throw new Error('WebGPU not supported');
    }

    const adapter = await navigator.gpu.requestAdapter({
      powerPreference: 'high-performance'
    });
    if (!adapter) {
      throw new Error('No adapter found');
    }

    this.device = await adapter.requestDevice({
      requiredFeatures: ['shader-f16'],
      requiredLimits: {
        maxStorageBufferBindingSize: 1024 * 1024 * 1024, // 1GB
        maxComputeWorkgroupStorageSize: 32768,
        maxComputeInvocationsPerWorkgroup: 1024
      }
    });
    this.queue = this.device.queue;
  }

  createBuffer(data, usage: number) {
    if (!this.device) {
      throw new Error('WebGPU device not initialized');
    }

    const buffer = this.device.createBuffer({
      size: data.byteLength,
      usage,
      mappedAtCreation: true
    });
    new Float32Array(buffer.getMappedRange()).set(data);
    buffer.unmap();

    return buffer;
  }
}
