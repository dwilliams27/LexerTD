import { Entity } from "@/entities/entity";
import { Position, StatusEffect } from "@/types/game";

export class Enemy extends Entity {
  health: number;
  maxHealth: number;
  speed: number;
  armor: number;
  reward: number;
  pathIndex: number;
  pathProgress: number;
  debuffs: StatusEffect[];
  isFlying: boolean;

  constructor(
    scene: Phaser.Scene,
    id: string,
    type: string,
    position: Position,
    collisionRadius: number,
    health: number,
    speed: number,
    armor: number,
    reward: number,
    pathIndex: number,
    pathProgress: number,
    debuffs: StatusEffect[],
    isFlying: boolean
  ) {
    super(scene, id, type, position, collisionRadius);
    this.health = health;
    this.maxHealth = health;
    this.speed = speed;
    this.armor = armor;
    this.reward = reward;
    this.pathIndex = pathIndex;
    this.pathProgress = pathProgress;
    this.debuffs = debuffs;
    this.isFlying = isFlying;
  }

  preUpdate(time: number, delta: number): void {
    throw new Error("Method not implemented.");
  }
}