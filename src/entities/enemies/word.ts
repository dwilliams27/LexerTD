import { Enemy } from "@/entities/enemies/enemy";
import { LexerScene } from "@/scenes/lexerScene";
import { GridPosition, Position } from "@/types/game";
import { genId } from "@/utils/id";

export class Word extends Enemy {
  private word: string;

  constructor(
    opts: {
      word: string,
      scene: LexerScene,
      position: Position,
      path: GridPosition[][],
      health: number,
      collisionRadius: number,
      reward: number
    }) {
    super({
      ...opts,
      id: genId('wrd'),
      type: 'word',
    });

    this.word = opts.word;
  }
}
