import { GlobalImages } from "@/services/graphicsService";

export class DemoScene extends Phaser.Scene {
  private scoreText!: Phaser.GameObjects.Text;
  private moneyText!: Phaser.GameObjects.Text;
  private money: number = 100;
  private trash: string[] = [];
  private currentWave: number = 1;

  constructor() {
    super({ key: 'DemoScene' });
  }

  preload(): void {
    Object.values(GlobalImages).forEach((key) => {
      this.load.image(key, key);
    });
  }

  create(): void {
    this.createMap();
    this.setupUI();
    this.initializeGameSystems();
  }

  private createMap(): void {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 8; y++) {
        this.add.image(x * 80, y * 80, 'tile');
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
        this.scene.start('MainMenuScene');
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
