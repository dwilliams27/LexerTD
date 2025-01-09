import { LocatableService, ServiceLocator } from "@/services/serviceLocator";
import { GridPosition, LexerMap, Position } from "@/types/game";

export class MapService extends LocatableService {
  static readonly serviceName = "LevelService";
  private initialized: boolean = false;
  private lexerMap: LexerMap | null = null;
  private colWidth: number = 1;
  private rowHeight: number = 1;

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

  loadMap(map: LexerMap) {
    this.lexerMap = map;
    this.colWidth = this.getCurrentMap().width / this.getCurrentMap().spaces[0].length;
    this.rowHeight = this.getCurrentMap().height / this.getCurrentMap().spaces.length;
  }

  getCurrentMap(): LexerMap {
    if (!this.lexerMap) {
      throw new Error('No map loaded!');
    }
    return this.lexerMap;
  }

  gridPosToGlobalPos(gridPos: GridPosition): Position {
    return {
      x: (this.colWidth * gridPos.col) + (0.5 * this.colWidth),
      y: (this.rowHeight * gridPos.row) + (0.5 * this.rowHeight),
    }
  }
}
