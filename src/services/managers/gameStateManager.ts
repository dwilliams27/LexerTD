import { Manager } from "@/services/managers/managerService";
import { LocatableService, ServiceLocator } from "@/services/serviceLocator";
import { GameState } from "@/types/game";

export class GameStateManager extends Manager {
  static readonly serviceName = "GameStateManager";

  private gameState?: GameState;
  private initialized: boolean = false;

  constructor(serviceLocator: ServiceLocator) {
    super(serviceLocator);
    this.init();
  }

  async init(): Promise<void> {
    this.initialized = true;
  }

  setGameState(gameState: GameState): void {
    this.gameState = gameState;
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  getGameState(): GameState | undefined {
    return this.gameState;
  }

  update(): void {
    throw new Error("Method not implemented.");
  }
}
