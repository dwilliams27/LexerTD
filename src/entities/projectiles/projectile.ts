import { Enemy } from "@/entities/enemies/enemy";
import { Entity } from "@/entities/entity";
import { Position } from "@/types/game";

export class Projectile extends Entity {
  damage: number;
  speed: number;
  target: Enemy;

  constructor(scene: Phaser.Scene, id: string, type: string, position: Position, collisionRadius: number, damage: number, speed: number, target: Enemy) {
    super(scene, id, type, position, collisionRadius);
    this.damage = damage;
    this.speed = speed;
    this.target = target;
  }

  preUpdate(time: number, delta: number): void {
    throw new Error("Method not implemented.");
  }
}
