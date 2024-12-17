export interface Position {
  x: number;
  y: number;
}

export interface GridPosition {
  row: number;
  col: number;
}

export interface Wave {
  number: number;
  enemies: Enemy[];
  totalEnemies: number;
  remainingEnemies: number;
  isStarted: boolean;
  isComplete: boolean;
  startTime: number;
}

export interface Path {
  points: Position[];
  type: PathType;
}

export interface Resources {
  gold: number;
  lives: number;
  score: number;
}

export interface StatusEffect {
  type: StatusEffectType;
  duration: number;
  strength: number;
  source: Tower | null;
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

export enum PathType {
  GROUND = 'GROUND',
  AIR = 'AIR',
}

export enum StatusEffectType {
  SLOW = 'SLOW',
  POISON = 'POISON',
  STUN = 'STUN',
  ARMOR_REDUCTION = 'ARMOR_REDUCTION',
}

export interface GameState {
  towers: Tower[];
  enemies: Enemy[];
  wave: Wave;
  paths: Path[];
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
