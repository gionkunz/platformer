export class BBox {
  topLeft: Vector;
  bottomRight: Vector;

  constructor(v1: Vector, v2: Vector) {
    const x = [v1.x, v2.x].sort();
    const y = [v1.y, v2.y].sort();
    this.topLeft = new Vector(x[0], y[0]);
    this.bottomRight = new Vector(x[1], y[1]);
  }

  isCoordinatesInside(coordinates: Vector) {
    return coordinates.x >= this.topLeft.x
      && coordinates.y >= this.topLeft.y
      && coordinates.x < this.bottomRight.x
      && coordinates.y < this.bottomRight.y;
  }

  width() {
    return this.bottomRight.x - this.topLeft.x;
  }

  height() {
    return this.bottomRight.y - this.topLeft.y;
  }

  clone() {
    return new BBox(this.topLeft.clone(), this.bottomRight.clone());
  }

  toString() {
    return `BBox(${this.topLeft}, ${this.bottomRight})`;
  }
}

export interface IVectorTransform {
  (value: number, component: string) : number;
}

export class Vector {
  static from(data: any): Vector {
    if (data instanceof Array) {
      return new Vector(...data);
    } else {
      return new Vector(data.x, data.y);
    }
  }

  constructor(public x: number, public y: number) {}

  transform(fn: IVectorTransform) {
    return new Vector(fn(this.x, 'x'), fn(this.y, 'y'));
  }

  add(vector: Vector): Vector {
    return this.transform((v: number, c: string) => v + vector[c]);
  }

  subtract(vector: Vector): Vector {
    return this.transform((v: number, c: string) => v - vector[c]);
  }

  multiply(vector: Vector): Vector {
    return this.transform((v: number, c: string) => v * vector[c]);
  }

  divide(vector: Vector): Vector {
    return this.transform((v: number, c: string) => v / vector[c]);
  }

  scale(factor: number): Vector {
    return this.transform((v: number) => v * factor);
  }

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  narrow(vector: Vector) {
    return this.transform((v: number, c: string) 
      => Math.max(Math.min(v, vector[c]), -vector[c]));
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  toString() {
    return `Vector(${this.x}, ${this.y})`;
  }
}
