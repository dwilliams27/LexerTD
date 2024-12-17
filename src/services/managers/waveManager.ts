import { Manager } from "@/services/managers/managerService";
import { ServiceLocator } from "@/services/serviceLocator";
import { Wave } from "@/types/game";
import { Scene } from "phaser";

export class WaveManager extends Manager {
  static readonly serviceName = "WaveManager";

  private initialized: boolean = false;
  private waves: Wave[] = [];
  private activeWave?: Wave;
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
    console.log('WaveManager update');
  }
}
