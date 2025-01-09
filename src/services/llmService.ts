import { LocatableService, ServiceLocator } from "@/services/serviceLocator";

export class LLMService extends LocatableService {
  static readonly serviceName = "LLMService";
  private initialized: boolean = false;

  constructor(serviceLocator: ServiceLocator) {
    super(serviceLocator);
    this.init();
  }

  async init(): Promise<void> {
    this.initialized = true;
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  getDistance(embedding1, embedding2) {

  }
}
