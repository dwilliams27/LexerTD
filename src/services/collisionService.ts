import { Entity } from "@/entities/entity";
import { Tower } from "@/entities/towers/tower";
import { LocatableService, ServiceLocator } from "@/services/serviceLocator";
import { GameState, GridPosition } from "@/types/game";
import { Scene } from "phaser";

export class CollisionService extends LocatableService {
  static readonly serviceName = "CollisionService";
  private initialized: boolean = false;
  private scene: Scene;

  constructor(serviceLocator: ServiceLocator, scene: Scene) {
    super(serviceLocator);
    this.scene = scene;
    this.init();
  }

  async init(): Promise<void> {
    this.initialized = true;
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  public isInRange(tower: Tower, entity: Entity): boolean {
    const distance = Phaser.Math.Distance.Between(
      tower.position.x,
      tower.position.y,
      entity.position.x,
      entity.position.y
    );
    return distance <= tower.range;
  }

  public getInRange(tower: Tower, enemies: Entity[]): Entity[] {
    return enemies.filter(enemy => this.isInRange(tower, enemy));
  }

  public checkSimpleCollision(entity1: Entity, entity2: Entity): boolean {
    return Phaser.Geom.Intersects.CircleToCircle(
      new Phaser.Geom.Circle(entity1.position.x, entity1.position.y, entity1.collisionRadius),
      new Phaser.Geom.Circle(entity2.position.x, entity2.position.y, entity2.collisionRadius)
    );
  }

  public isValidTowerPosition(position: GridPosition, gameState: GameState): boolean {
    const isBuildable = gameState.buildablePositions.some(
      pos => pos.row === position.row && pos.col === position.col
    );

    const isOccupied = gameState.towers.some(
      tower => tower.gridPosition?.row === position.row && tower.gridPosition?.col === position.col
    );

    return isBuildable && !isOccupied;
  }
}
