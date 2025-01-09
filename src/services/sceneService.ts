import { LexerScene } from "@/scenes/lexerScene";
import { LocatableService, ServiceLocator } from "@/services/serviceLocator";

export class SceneService extends LocatableService {
  static readonly serviceName = "SceneService";
  private initialized: boolean = false;
  private activeScene?: LexerScene;

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

  setActiveScene(scene: LexerScene): void {
    this.activeScene = scene;
  }

  transitionActiveScene(sceneKey: string): void {
    console.log('Transitioning to scene:', sceneKey);
    this.activeScene?.scene.transition({
      target: sceneKey,
      duration: 0,
      data: { ServiceLocator: this.serviceLocator },
    });
  }

  getActiveScene(): LexerScene {
    if (!this.activeScene) {
      throw new Error('No active scene!');
    }
    return this.activeScene;
  }

  destroyActiveScene(): void {
    this.activeScene?.scene.stop();
  }
}
