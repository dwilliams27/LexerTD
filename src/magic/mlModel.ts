import { WebGPUContext } from "@/magic/webGPUContext";

export class MLModel {
  context: WebGPUContext;
  pipeline;

  constructor(context: WebGPUContext) {
    this.context = context;
    this.pipeline = null;
  }

  async loadWeights(url: URL) {
    const response = await fetch(url);
    const weights = await response.arrayBuffer();
    return this.context.createBuffer(
      new Float32Array(weights), 
      GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    );
  }
}
