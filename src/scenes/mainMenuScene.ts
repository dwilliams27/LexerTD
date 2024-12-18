import { DEMO_SCENE } from "@/scenes/demoScene";
import { LexerScene } from "@/scenes/lexerScene";
import { SceneService } from "@/services/sceneService";

export const MAIN_MENU_SCENE = 'MainMenuScene';

export class MainMenuScene extends LexerScene {
  constructor() {
    super(MAIN_MENU_SCENE);
  }

  create(): void {
    super.create();
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    this.graphicsService.createText(
      this,
      centerX,
      centerY - 150,
      "LexerTD",
      { fontSize: '102px' }
    ).setOrigin(0.5);

    const playButton = this.graphicsService.createText(
      this,
      centerX,
      centerY + 50,
      "Start",
      {
        padding: { x: 20, y: 10 },
        backgroundColor: '#4a90e2',
      }
    ).setOrigin(0.5).setInteractive();

    playButton.on('pointerover', () => {
      playButton.setStyle({ backgroundColor: '#3a80d2' });
    });

    playButton.on('pointerout', () => {
      playButton.setStyle({ backgroundColor: '#4a90e2' });
    });

    playButton.on('pointerup', () => {
      this.serviceLocator.getService(SceneService).transitionActiveScene(DEMO_SCENE);
    });
  }
}
