import { GameStateManager } from "@/services/managers/gameStateManager";
import { InputManager } from "@/services/managers/inputManager";
import { WaveManager } from "@/services/managers/waveManager";
import { LocatableService, ServiceLocator } from "@/services/serviceLocator";

export abstract class Manager extends LocatableService {
  abstract update(): void;
}

// Manages the managers
export class BossMan {
  private serviceLocator: ServiceLocator;
  private inputManager: InputManager;
  private waveManager: WaveManager;
  private gameStateManager: GameStateManager;

  constructor(serviceLocator: ServiceLocator) {
    this.serviceLocator = serviceLocator;

    this.inputManager = new InputManager(this.serviceLocator);
    this.waveManager = new WaveManager(this.serviceLocator);
    this.gameStateManager = new GameStateManager(this.serviceLocator);
  }

  update(): void {
    // Order matters
    this.inputManager.update();
    this.waveManager.update();
    this.gameStateManager.update();
  }
}
