
export default class Vector2D {
  public x: number;
  public y: number;

  public static add(v1: Vector2D, v2: Vector2D): Vector2D {
    const x = v1.x + v2.x;
    const y = v1.y + v2.y;
    return new Vector2D(x, y);
  }

  public static subtract(v1: Vector2D, v2: Vector2D): Vector2D {
    const x = v1.x - v2.x;
    const y = v1.y - v2.y;
    return new Vector2D(x, y);
  }

  public static multiply(v: Vector2D, k: number): Vector2D {
    v.x *= k;
    v.y *= k;
    return v;
  }

  public static divide(v: Vector2D, k: number): Vector2D {
    v.x /= k;
    v.y /= k;
    return v;
  }

  public static scalarProduct(v1: Vector2D, v2: Vector2D): number {
    return v1.x * v2.x + v1.y * v2.y;
  }

  public static distanceFrom(v1: Vector2D, v2: Vector2D): number {
    let sum = 0;

    const xd = v2.x - v1.x;
    const yd = v2.y - v1.y;

    sum += xd * xd;
    sum += yd * yd;

    return Math.sqrt(sum);
  }

  public static vectorTo(v1: Vector2D, v2: Vector2D): Vector2D {
    const x = v2.x - v1.x;
    const y = v2.y - v1.y;
    return new Vector2D(x, y);
  }

  public static unitVector(v: Vector2D): Vector2D {
    return new Vector2D(v.x / v.abs(), v.y / v.abs());
  }

  public static abs(v: Vector2D): number {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add(v: Vector2D): Vector2D {
    return new Vector2D(this.x + v.x, this.y + v.y);
  }


  public subtract(v: Vector2D): Vector2D {
    return new Vector2D(this.x - v.x, this.y - v.y);
  }

  public multiply(k: number): Vector2D {
    return new Vector2D(this.x * k, this.y * k);
  }

  public divide(k: number): Vector2D {
    return new Vector2D(this.x / k, this.y / k);
  }

  public scalarProduct(v: Vector2D): number {
    return this.x * v.x + this.y * v.y;
  }

  public distanceFrom(v: Vector2D): number {
    let sum = 0;

    const xd = this.x - v.x;
    const yd = this.y - v.y;

    sum += xd * xd;
    sum += yd * yd;

    return Math.sqrt(sum);
  }

  public vectorTo(v: Vector2D): Vector2D {
    const x = v.x - this.x;
    const y = v.y - this.y;
    return new Vector2D(x, y);
  }

  public unitVector(): Vector2D {
    return new Vector2D(this.x / this.abs(), this.y / this.abs());
  }

  public abs(): number {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }
}
