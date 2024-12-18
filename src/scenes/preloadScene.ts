import { LexerScene } from '@/scenes/lexerScene';
import { MAIN_MENU_SCENE } from '@/scenes/mainMenuScene';
import { SceneService } from '@/services/sceneService';

export const PRELOAD_SCENE = 'PreloadScene';

export class PreloadScene extends LexerScene {
  constructor() {
    super(PRELOAD_SCENE);
  }

  preload() {
    const loadingText = this.add.text(400, 300, 'Loading...', {
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5);
  }

  create() {
    super.create();
    document.fonts.load('10px m5x7').then(() => {
      console.log('Loaded font', this.serviceLocator);
      this.serviceLocator?.getService(SceneService).setActiveScene(this);
      this.serviceLocator?.getService(SceneService).transitionActiveScene(MAIN_MENU_SCENE);
    });
  }
}
