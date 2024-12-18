import { Tower } from "@/entities/towers/tower";
import { LocatableService, ServiceLocator } from "@/services/serviceLocator";
import { Scene } from "phaser";

export const GlobalImages = {
  // Towers
  "books": "/assets/images/books.png",

  // UI
  "start_buttom": "/assets/images/start_button.png",
  "bg_tile": "/assets/images/tile.png",
} as const;

export const GlobalGraphics = {
  "towers": "towers",
} as const;

export type TGlobalGraphics = keyof typeof GlobalGraphics;

export const GlobalSpriteGroups = {
  "towers": "towers",
} as const;

export class GraphicsService extends LocatableService {
  static readonly serviceName = "GraphicsService";
  private initialized: boolean = false;
  private activeScene?: Scene;
  private graphics: Record<string, Record<string, Phaser.GameObjects.Graphics>>;
  private textures: Record<string, Record<string, Phaser.GameObjects.Graphics>>;
  private spriteGroups: Record<string, Phaser.GameObjects.Group>;

  constructor(serviceLocator: ServiceLocator) {
    super(serviceLocator);
    this.graphics = {};
    this.textures = {};
    this.spriteGroups = {};
  }

  async init(scene: Scene): Promise<void> {
    this.activeScene = scene;
    this.graphics = {};
    this.textures = {};

    this.spriteGroups = {
      [GlobalSpriteGroups.towers]: this.activeScene.add.group({
        defaultKey: GlobalSpriteGroups.towers,
        maxSize: 100,
        active: false,
        visible: false
      }),
    };

    this.initialized = true;
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  addGraphics(category: TGlobalGraphics, key: string, graphics: Phaser.GameObjects.Graphics): void {
    if (!this.graphics[category]) {
      this.graphics[category] = {};
    }
    this.graphics[category][key] = graphics;
  }

  getGraphics(category: TGlobalGraphics, key: string): Phaser.GameObjects.Graphics {
    if (!this.graphics[category]) {
      throw new Error(`Graphics category ${category} not found`);
    }
    return this.graphics[category][key];
  }

  addTexture(category: TGlobalGraphics, key: string, texture: Phaser.GameObjects.Graphics): void {
    texture.generateTexture(key);
    if (!this.graphics[category]) {
      this.graphics[category] = {};
    }
    this.graphics[category][key] = texture;
  }

  getTexture(category: TGlobalGraphics, key: string): Phaser.GameObjects.Graphics {
    if (!this.textures[category]) {
      throw new Error(`Texture category ${category} not found`);
    }
    return this.textures[category][key];
  }

  // Text Helpers
  public createText(
    scene: Phaser.Scene, 
    x: number, 
    y: number, 
    text: string | string[], 
    style?: Partial<Phaser.Types.GameObjects.Text.TextStyle>
  ) {
    return scene.add.text(x, y, text, {
      fontFamily: 'm5x7',
      fontSize: '32px',
      // Revisit this
      resolution: 10,
      ...style
    });
  };

  // Tower Helpers
  public genTowerRange(tower: Tower, color: number = 0x00ff00, alpha: number = 0.2): Phaser.GameObjects.Graphics {
    if (!this.activeScene) {
      throw new Error("Scene not initialized");
    }

    const graphics = this.activeScene.add.graphics();
    graphics.lineStyle(2, color, 0.5);
    graphics.fillStyle(color, alpha);
    graphics.strokeCircle(tower.position.x, tower.position.y, tower.range);
    graphics.fillCircle(tower.position.x, tower.position.y, tower.range);

    this.addGraphics(GlobalGraphics.towers, tower.id, graphics);

    return graphics;
  }

  public genTowerSprite(tower: Tower) {
    const sprite = this.spriteGroups[GlobalSpriteGroups.towers].get(tower.position.x, tower.position.y);
    if (sprite) {
      sprite.setActive(true).setVisible(true);
    }
  }
}
