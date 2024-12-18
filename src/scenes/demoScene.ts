import { LexerScene } from "@/scenes/lexerScene";
import { MAIN_MENU_SCENE } from "@/scenes/mainMenuScene";
import { GlobalImages } from "@/services/graphicsService";
import { SceneService } from "@/services/sceneService";

export const DEMO_SCENE = 'DemoScene';

export class DemoScene extends LexerScene {
  private scoreText!: Phaser.GameObjects.Text;
  private moneyText!: Phaser.GameObjects.Text;
  private money: number = 100;
  private trash: string[] = [];
  private currentWave: number = 1;

  constructor() {
    super(DEMO_SCENE);
  }

  preload(): void {
    Object.keys(GlobalImages).forEach((key) => {
      // @ts-ignore
      this.load.image(key, GlobalImages[key]);
    });
  }

  create(): void {
    super.create();
    this.createMap();
    this.setupUI();
    this.initializeGameSystems();
  }

  private createMap(): void {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 8; y++) {
        this.add.image(x * 80, y * 80, 'bg_tile').setScale(0.075);
      }
    }
  }

  private setupUI(): void {
    this.scoreText = this.add.text(16, 16, `Trash: ${this.trash.join(' ')}`, {
      fontSize: '32px',
      color: '#fff',
    });

    this.moneyText = this.add.text(16, 56, `Money: ${this.money}`, {
      fontSize: '32px',
      color: '#fff',
    });

    const menuButton = this.add
      .text(700, 16, 'Menu', {
        fontSize: '24px',
        color: '#fff',
        backgroundColor: '#4a90e2',
        padding: { x: 10, y: 5 },
      })
      .setInteractive()
      .on('pointerup', () => {
        this.serviceLocator.getService(SceneService).transitionActiveScene(MAIN_MENU_SCENE);
      });
  }

  private initializeGameSystems(): void {
    // this.time.addEvent({
    //   delay: 1000,
    //   callback: this.spawnEnemy,
    //   callbackScope: this,
    //   loop: true,
    // });
  }
}
