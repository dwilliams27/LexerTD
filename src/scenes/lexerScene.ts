import { GraphicsService } from "@/services/graphicsService";
import { ServiceLocator } from "@/services/serviceLocator";

export abstract class LexerScene extends Phaser.Scene {
  serviceLocator!: ServiceLocator;
  graphicsService!: GraphicsService;

  constructor(key: string) {
    super({ key });
  }

  create(): void {
    console.log('Created scene:', this.scene.key);
  }

  init(data: { ServiceLocator: ServiceLocator }) {
    this.serviceLocator = data.ServiceLocator;

    this.graphicsService = this.serviceLocator?.getService(GraphicsService);
  }
}
