import {Vector} from '../vector';
import {Engine, IDrawable} from '../engine';
import {IClockTime, IUpdateable} from '../clock';
import {ICameraTarget} from '../camera';
import {IPhysical, Physics} from '../physics';
import {getGamepadSnapshot} from '../input/gamepad-input';

export class Player implements IUpdateable, IDrawable, ICameraTarget, IPhysical {
  acceleration: Vector = new Vector(0, 0);
  velocity: Vector = new Vector(0, 0);
  falling: boolean;
  physics: Physics;
  jump: boolean;
  jumpDebounce: number = 20;
  sunk: boolean = false;

  constructor(public position: Vector, public pivot: Vector, public engine: Engine) {
    this.physics = new Physics(engine, this);
  }

  update(data: IClockTime) {
    const gamepadSnapshot = getGamepadSnapshot(0);
    if (gamepadSnapshot && gamepadSnapshot.changed) {
      const normalizeValue = (v) => Math.abs(v) < 0.1 ? 0 : v;
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

    if (['water', 'slime'].includes(this.physics.tileForce.data.name)) {
      if (!this.sunk) {
        this.sunk = true;
        this.engine.audioEnvironment.nearConvolution('ir-muffler', 0.9);
      }
    } else {
      this.sunk = false;
      this.engine.audioEnvironment.nearConvolution(null, 0);
    }
  }

  draw(engine: Engine, data: IClockTime) {
    const projectedPosition = this.position.subtract(engine.camera.position);

    if (engine.clipBox.isCoordinatesInside(projectedPosition)) {
      engine.renderingContext.fillStyle = '#f00';
      engine.renderingContext.fillRect(
        projectedPosition.x,
        projectedPosition.y,
        engine.tileSize,
        engine.tileSize
      );
    }
  }
}
