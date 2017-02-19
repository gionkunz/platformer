import {Vector} from '../vector';
import {Engine, IDrawable} from '../engine';
import {IClockTime, IUpdateable} from '../clock';
import {ICameraTarget} from '../camera';
import {IPhysical, Physics} from '../physics';
import {getGamepadSnapshot} from '../input/gamepad-input';
import {drawTile, PlayerGraphicsTileProvider} from '../graphics/graphics-tile';

export class Player implements IUpdateable, IDrawable, ICameraTarget, IPhysical {
  acceleration: Vector = new Vector(0, 0);
  velocity: Vector = new Vector(0, 0);
  falling: boolean;
  physics: Physics;
  jump: boolean;
  jumpDebounce: number = 20;
  sunk: boolean = false;
  graphicsTileProvider: PlayerGraphicsTileProvider = new PlayerGraphicsTileProvider(this, this.engine.clock);

  constructor(public position: Vector, public engine: Engine) {
    this.physics = new Physics(engine, this);
  }

  update(data: IClockTime) {
    const gamepadSnapshot = getGamepadSnapshot(0);
    if (gamepadSnapshot && gamepadSnapshot.changed) {
      const normalizeValue = (v) => Math.abs(v) < 0.15 ? 0 : v;
      this.acceleration.x =
        normalizeValue(gamepadSnapshot.gamepad.axes[0]) * this.engine.meters(300);
      this.acceleration.y =
        Math.max(0, normalizeValue(gamepadSnapshot.gamepad.axes[1])) * this.engine.meters(200);
      this.jump = gamepadSnapshot.gamepad.buttons[1].pressed && this.jumpDebounce === 0;
    }

    if (this.jump && this.physics.tileForce.data.jump) {
      this.engine.audioEnvironment.play('jump');
      this.jump = false;
      this.jumpDebounce = 20;
      this.acceleration.y = this.engine.meters(-4000);
      this.physics.update(data);
      this.acceleration.y = 0;
    } else {
      this.jumpDebounce = Math.max(0, this.jumpDebounce - 1);
      this.physics.update(data);
    }

    this.engine.audioEnvironment.setAudioOriginTile(this.physics.tileForce)
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
