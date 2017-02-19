import {Vector} from './vector';
import {Engine} from './engine';
import {IClockTime, IUpdateable} from './clock';

export interface ICameraTarget {
  position: Vector;
}

export class Camera implements IUpdateable {
  position: Vector;

  constructor(initial: Vector, public target: ICameraTarget, public engine: Engine) {
    this.position = new Vector(initial.x, initial.y);
  }

  //TODO: Refactor
  update(data: IClockTime) {
    const cx = Math.round(this.target.position.x - this.engine.viewport.width() / 2);
    const cy = Math.round(this.target.position.y - this.engine.viewport.height() / 2);
    const xdif = Math.abs(cx - this.position.x);
    const ydif = Math.abs(cy - this.position.y);

    if(xdif > 5) {
      const mag = Math.round(Math.max(1, xdif * 0.1));

      if(cx != this.position.x) {
        this.position.x += cx > this.position.x ? mag : -mag;
      }
    }

    if(ydif > 5) {
      const mag = Math.round(Math.max(1, ydif * 0.1));

      if(cy != this.position.y) {
        this.position.y += cy > this.position.y ? mag : -mag;
      }
    }
  }
}
