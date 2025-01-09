import { Entity } from "@/entities/entity";
import { MapService } from "@/services/mapService";
import { ServiceLocator } from "@/services/serviceLocator";
import { GridPosition, Position } from "@/types/game";

export class Enemy extends Entity {
  mapService: MapService;

  health: number;
  maxHealth: number;
  reward: number;
  collisionRadius: number;
  speed: number; // Pixels/sec
  path: GridPosition[];
  curPathTargetIndex: number = 0;

  constructor(opts: {
    serviceLocator: ServiceLocator,
    scene: Phaser.Scene,
    id: string,
    type: string,
    position: Position,
    collisionRadius: number,
    path: GridPosition[],
    health: number,
    reward: number,
    speed: number,
  }) {
    super(opts);
    this.health = opts.health;
    this.maxHealth = opts.health;
    this.reward = opts.reward;
    this.path = opts.path;
    this.collisionRadius = opts.collisionRadius;
    this.speed = opts.speed;

    this.mapService = this.serviceLocator.getService(MapService);
  }

  preUpdate(time: number, delta: number): void {
    this.moveTowardsTarget(time, delta);
  }

  moveTowardsTarget(time: number, delta: number) {
    const deltaSeconds = delta / 1000;
    const distanceToMove = this.speed * deltaSeconds;
    const targetPos = this.mapService.gridPosToGlobalPos(this.path[this.curPathTargetIndex]);

    const xDiff = targetPos.x - this.position.x;
    const yDiff = targetPos.y - this.position.y;

    const distanceToTarget = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

    if (distanceToMove >= distanceToTarget) {
      const leftOverDistance = distanceToMove - distanceToTarget;
      this.position = targetPos;
      this.curPathTargetIndex += 1;

      if (leftOverDistance > 0) {
        this.moveTowardsTarget(time, leftOverDistance / this.speed * 1000);
      }
    } else {
      const xMove = (xDiff / distanceToTarget) * distanceToMove;
      const yMove = (yDiff / distanceToTarget) * distanceToMove;

      this.position = {
        x: this.position.x + xMove,
        y: this.position.y + yMove,
      };
    }
  }
}