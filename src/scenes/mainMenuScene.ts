export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' });
  }

  preload(): void {
    this.load.image('play-button', 'assets/play-button.png');
  }

  create(): void {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    this.add
      .text(centerX, centerY - 100, 'Tower Defense', {
        fontSize: '48px',
        color: '#fff',
      })
      .setOrigin(0.5);

    const playButton = this.add
      .text(centerX, centerY + 50, 'Play Game', {
        fontSize: '32px',
        color: '#fff',
        backgroundColor: '#4a90e2',
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive();

    playButton.on('pointerover', () => {
      playButton.setStyle({ color: '#ff0' });
    });

    playButton.on('pointerout', () => {
      playButton.setStyle({ color: '#fff' });
    });

    playButton.on('pointerup', () => {
      this.scene.start('Level1Scene');
    });
  }
}
