import Vector2D from './vector';
import Circle from './shapes';

export default class Attractor {
  public position: Vector2D;
  public color: string;

  constructor(x: number, y: number, color: string, public m?: number, ) {
    this.position = Vector2D.create(x, y);
    this.color = color;
    this.m = m ? m : Math.floor((Math.random() * 10) + 1);
  }
  public draw(ctx: CanvasRenderingContext2D) {
    Circle.draw(ctx, this.position.x, this.position.y, 10, this.color);
  }
}
