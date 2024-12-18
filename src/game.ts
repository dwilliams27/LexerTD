import 'phaser';
import './styles/fonts.css';
import { DEMO_SCENE, DemoScene } from './scenes/demoScene';
import { MAIN_MENU_SCENE, MainMenuScene } from './scenes/mainMenuScene';
import { GPUService } from './services/gpuService';
import { GameStateManager } from '@/services/managers/gameStateManager';
import { ServiceLocator } from '@/services/serviceLocator';
import { SceneService } from '@/services/sceneService';
import { PRELOAD_SCENE, PreloadScene } from '@/scenes/preloadScene';
import { GraphicsService } from '@/services/graphicsService';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  backgroundColor: '#2c3e50',
  parent: 'game',
  pixelArt: true,
  antialias: false,
  roundPixels: true,
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
    console.log('Game initializing...');
    this.rootServiceLocator = new ServiceLocator(this);
    this.rootServiceLocator.addService(GameStateManager, new GameStateManager(this.rootServiceLocator));
    this.rootServiceLocator.addService(GPUService, new GPUService(this.rootServiceLocator));
    this.rootServiceLocator.addService(SceneService, new SceneService(this.rootServiceLocator));
    this.rootServiceLocator.addService(GraphicsService, new GraphicsService(this.rootServiceLocator));

    this.addScenes();
    this.scene.start(PRELOAD_SCENE, { ServiceLocator: this.rootServiceLocator });
  }

  addScenes(): void {
    this.scene.add(PRELOAD_SCENE, PreloadScene);
    this.scene.add(MAIN_MENU_SCENE, MainMenuScene);
    this.scene.add(DEMO_SCENE, DemoScene);
  }
}

window.addEventListener('load', () => {
  console.log('Constructing game...');
  new Game(config);
});
