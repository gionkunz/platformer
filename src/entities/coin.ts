import {Vector} from '../vector';
import {Engine, IDrawable} from '../engine';
import {IClockTime, IUpdateable} from '../clock';

export class Coin implements IUpdateable, IDrawable {
  seq: number = 0;

  constructor(public position: Vector, public pivot: Vector, public engine: Engine) {}

  update(data: IClockTime) {
    this.seq += 0.1;
  }

  draw(engine: Engine, data: IClockTime) {
    const projectedPosition = this.position.subtract(engine.camera.position);

    if (engine.clipBox.isCoordinatesInside(projectedPosition)) {
      engine.renderingContext.beginPath();
      engine.renderingContext.fillStyle = `rgba(180, 180, 80, ${(1 + this.seq % 4) / 5})`;
      engine.renderingContext.moveTo(projectedPosition.x + 8, projectedPosition.y);
      engine.renderingContext.lineTo(projectedPosition.x + 12, projectedPosition.y + 4);
      engine.renderingContext.lineTo(projectedPosition.x + 12, projectedPosition.y + 12);
      engine.renderingContext.lineTo(projectedPosition.x + 8, projectedPosition.y + 16);
      engine.renderingContext.lineTo(projectedPosition.x + 4, projectedPosition.y + 12);
      engine.renderingContext.lineTo(projectedPosition.x + 4, projectedPosition.y + 4);
      engine.renderingContext.closePath();
      engine.renderingContext.fill();
    }
  }
}
