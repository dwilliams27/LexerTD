import { Manager } from "@/services/managers/managerService";
import { ServiceLocator } from "@/services/serviceLocator";
import { Scene } from "phaser";

export class InputManager extends Manager {
  static readonly serviceName = "InputManager";

  private initialized: boolean = false;
  private activeScene?: Scene;

  constructor(serviceLocator: ServiceLocator) {
    super(serviceLocator);
  }

  async init(scene: Scene): Promise<void> {
    this.activeScene = scene;
    this.initialized = true;
  }

  isInitialized(): boolean {
    return this.initialized;
  }
  
  update(): void {
    console.log('InputManager update');
  }
}
