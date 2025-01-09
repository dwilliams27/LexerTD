import { Word } from "@/entities/enemies/word";
import { Manager } from "@/services/managers/managerService";
import { MapService } from "@/services/mapService";
import { SceneService } from "@/services/sceneService";
import { ServiceLocator } from "@/services/serviceLocator";
import { Wave } from "@/types/game";

export class WaveManager extends Manager {
  static readonly serviceName = "WaveManager";

  private initialized: boolean = false;
  private currentWaveIndex: number = 0;
  private currentEnemyIndex: number = 0;
  private waves: Wave[] = [];
  private sceneService: SceneService;
  private mapService: MapService;

  constructor(serviceLocator: ServiceLocator) {
    super(serviceLocator);
    this.sceneService = this.serviceLocator.getService(SceneService);
    this.mapService = this.serviceLocator.getService(MapService);
    this.init();
  }

  async init(): Promise<void> {
    this.initialized = true;
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  setLevelWaves(waves: Wave[]) {
    this.waves = waves;
  }

  getCurWave() {
    return this.waves[this.currentWaveIndex];
  }

  startNextWave() {
    if (this.currentWaveIndex + 1 >= this.waves.length) {
      return;
    }
    this.currentWaveIndex += 1;
    this.getCurWave().isStarted = true;
  }

  spawnNextEnemy() {
    if (this.currentEnemyIndex + 1 >= this.getCurWave().enemies.length) {
      return;
    }

    const curScene = this.sceneService.getActiveScene();
    this.getCurWave().enemies.push(new Word({
      word: this.getCurWave().enemies[this.currentEnemyIndex],
      scene: curScene,
      position: this.mapService.gridPosToGlobalPos(this.mapService.getCurrentMap().enemyPath[0][0]),
      path: this.mapService.getCurrentMap().enemyPath,
      health: 100,
      collisionRadius: 100,
      reward: 100
    }));
  }
  
  update(): void {
    console.log('WaveManager update');
  }
}
