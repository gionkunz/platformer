import {Vector} from '../vector';
import {Engine, IDrawable} from '../engine';
import {IClockTime, IUpdateable} from '../clock';
import {AnimatedGraphicsTileProvider, drawTile} from '../graphics/graphics-tile';

export class Coin implements IUpdateable, IDrawable {
  seq: number = 0;
  graphicsTileProvider: AnimatedGraphicsTileProvider;

  constructor(public position: Vector, public pivot: Vector, public engine: Engine) {
    this.graphicsTileProvider = new AnimatedGraphicsTileProvider(engine.clock, 0.2, [
      {x: 3, y: 17},
      {x: 4, y: 17},
      {x: 5, y: 17}
    ]);
  }

  update(data: IClockTime) {
    this.seq += 0.1;
  }

  draw(engine: Engine, data: IClockTime) {
    const projectedPosition = this.position.subtract(engine.camera.position);

    if (engine.clipBox.isCoordinatesInside(projectedPosition)) {
      drawTile(
        this.graphicsTileProvider.provideGraphicsTile(),
        engine.renderingContext,
        projectedPosition.x,
        projectedPosition.y,
        engine.tileSize,
        engine.tileSize
      );
    }
  }
}
