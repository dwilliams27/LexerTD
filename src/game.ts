import 'phaser';
import { DemoScene } from './scenes/demoScene';
import { MainMenuScene } from './scenes/mainMenuScene';
import { GPUService } from './services/gpuService';
import { GameStateManager } from '@/services/managers/gameStateManager';
import { ServiceLocator } from '@/services/serviceLocator';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  backgroundColor: '#2c3e50',
  parent: 'game',
  scene: [MainMenuScene, DemoScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
};

export class Game extends Phaser.Game {
  public rootServiceLocator: ServiceLocator;

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
    this.rootServiceLocator = new ServiceLocator();
    this.rootServiceLocator.addService(GameStateManager, new GameStateManager(this.rootServiceLocator));
    this.rootServiceLocator.addService(GPUService, new GPUService(this.rootServiceLocator));
  }
}

window.addEventListener('load', () => {
  new Game(config);
});
