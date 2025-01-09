import { ServiceLocator } from "@/services/serviceLocator";
import { GridPosition, Position } from "@/types/game";

export abstract class Entity extends Phaser.GameObjects.GameObject {
  serviceLocator: ServiceLocator;
  id: string;
  type: string;
  collisionRadius: number;
  position: Position;
  gridPosition?: GridPosition;

  constructor(opts: { serviceLocator: ServiceLocator, scene: Phaser.Scene, id: string, type: string, position: Position, collisionRadius: number }) {
    super(opts.scene, opts.type);
    this.serviceLocator = opts.serviceLocator;
    this.id = opts.id;
    this.type = opts.type;
    this.position = opts.position;
    this.collisionRadius = opts.collisionRadius;
  }

  abstract preUpdate(time: number, delta: number): void;
}
