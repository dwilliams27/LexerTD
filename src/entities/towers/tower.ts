import { Enemy } from "@/entities/enemies/enemy";
import { Entity } from "@/entities/entity";
import { Position, TowerType } from "@/types/game";

export class Tower extends Entity {
  level: number;
  damage: number;
  range: number;
  attackSpeed: number;
  cost: number;
  towerType: TowerType;
  target?: Enemy | null;
  kills: number;
  totalDamageDealt: number;

  constructor(
    scene: Phaser.Scene,
    id: string,
    type: string,
    position: Position,
    collisionRadius: number,
    level: number,
    damage: number,
    range: number,
    attackSpeed: number,
    cost: number,
    towerType: TowerType
  ) {
    super(scene, id, type, position, collisionRadius);
    this.level = level;
    this.damage = damage;
    this.range = range;
    this.attackSpeed = attackSpeed;
    this.cost = cost;
    this.towerType = towerType;
    this.target = null;
    this.kills = 0;
    this.totalDamageDealt = 0;
  }

  preUpdate(time: number, delta: number): void {
    throw new Error("Method not implemented.");
  }
}
