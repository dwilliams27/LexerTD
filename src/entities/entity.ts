import { GridPosition, Position } from "@/types/game";

export abstract class Entity extends Phaser.GameObjects.GameObject {
  id: string;
  type: string;
  collisionRadius: number;
  position: Position;
  gridPosition?: GridPosition;

  constructor(scene: Phaser.Scene, id: string, type: string, position: Position, collisionRadius: number) {
    super(scene, type);
    this.id = id;
    this.type = type;
    this.position = position;
    this.collisionRadius = collisionRadius;
  }

  abstract preUpdate(time: number, delta: number): void;
}
