import Vector2D from './vector';
import Circle from './shapes';

export default class Particle {
  public position: Vector2D;
  public velocity: Vector2D;
  public color: string;
  public m: number;

  constructor(x: number, y: number, vx: number, vy: number, m: number = 1, color: string = '#FFF') {
    this.position = new Vector2D(x, y);
    this.velocity = new Vector2D(vx, vy);
    this.color = color;
    this.m = m;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const r = Math.sqrt(this.m / Math.PI);
    Circle.draw(ctx, this.position.x, this.position.y, r, this.color);
  }
}
