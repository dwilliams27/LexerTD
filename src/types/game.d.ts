export interface Position {
  x: number;
  y: number;
}

export interface GridPosition {
  row: number;
  col: number;
}

export interface MapSpace {
  position: GridPosition;
  buildable: boolean;
  occupant?: Entity;
}

export interface LexerMap {
  spaces: MapSpace[][];
  width: number;
  height: number;
  enemyPath: GridPosition[][];
}

export interface Wave {
  number: number;
  prompt: string[];
  enemies: Enemy[];
  totalEnemies: number;
  remainingEnemies: number;
  isStarted: boolean;
  isComplete: boolean;
  startTime: number;
}

export interface Resources {
  gold: number;
  lives: number;
  score: number;
}

export enum TowerType {
  BOOKS_BASE = 'BOOKS_BASE',
}

export enum EnemyType {
  NORMAL = 'NORMAL',
  FAST = 'FAST',
  TANK = 'TANK',
  FLYING = 'FLYING',
  BOSS = 'BOSS',
}

export interface GameState {
  towers: Tower[];
  enemies: Enemy[];
  wave: Wave;
  resources: Resources;
  gameTime: number;
  isPaused: boolean;
  difficulty: number;
  gridSize: {
    rows: number;
    cols: number;
  };
  buildablePositions: GridPosition[];
  selectedTower: Tower | null;
  hoveredTile: GridPosition | null;
  isGameOver: boolean;
  statistics: {
    totalKills: number;
    totalGoldSpent: number;
    totalDamageDealt: number;
    wavesCompleted: number;
    highestWaveReached: number;
  };
}
