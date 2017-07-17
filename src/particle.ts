import Vector2D from './vector';
import Circle from './shapes';

export default class Particle {
  public position: Vector2D;
  public acceleration: Vector2D;
  public color = '#FFF';

  constructor(x: number, y: number, vx: number, vy: number, color: string) {
    this.position = Vector2D.create(x, y);
    this.acceleration = Vector2D.create(vx, vy);
    this.color = color;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    Circle.draw(ctx, this.position.x, this.position.y, 1, this.color);
  }
}
