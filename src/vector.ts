
export default class Vector2D {
  public x: number;
  public y: number;

  static create (x: number, y: number): Vector2D {
    const V = new Vector2D();
    return V.create(x, y);
  }

  public create (x: number, y: number): Vector2D {
    this.x = x;
    this.y = y;
    return this;
  }

  public add (v: Vector2D): Vector2D {
    const V = v;
    this.x += V.x;
    this.y += V.y;
    return this;
  }

 public  subtract (v: Vector2D): Vector2D {
    const V = v;
    this.x -= V.x;
    this.y -= V.y;
    return this;
  }

  public multiply (k: number): Vector2D {
    this.x *= k;
    this.y *= k;
    return this;
  }

  public scalarProduct (v: Vector2D): number {
    const V = v;
    return this.x * V.x + this.y * V.y;
  }

  public distanceFrom (v: Vector2D): number {
    const V = v;
    let sum = 0;

    const xd = this.x - V.x;
    const yd = this.y - V.y;

    sum += xd * xd;
    sum += yd * yd;

    return Math.sqrt(sum);
  }

  public vectorTo (v: Vector2D): Vector2D {
    const V = v;
    const x = V.x - this.x;
    const y = V.y - this.y;
    return Vector2D.create(x, y);
  }

  public unitVector (): Vector2D {
    return Vector2D.create(this.x / this.abs(), this.y / this.abs());
  }

  public abs (): number {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }
}
