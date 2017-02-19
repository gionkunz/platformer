import {Vector} from './vector';
import {Engine} from './engine';
import {IClockTime, IUpdateable} from './clock';
import {MapTile} from './game-map';
import {DebugVector} from "./debug";

export interface IPhysical {
  acceleration: Vector;
  position: Vector;
  velocity: Vector;
  pivot: Vector;
  falling: boolean;
}

export class Physics implements IUpdateable {
  tileForce: MapTile;

  constructor(public engine: Engine, public physical: IPhysical) {}

  update(data: IClockTime) {
    let tileForcePosition = this.physical.position
      .add(this.physical.pivot)
      .scale(1 / this.engine.tileSize)
      .transform(Math.floor);
    this.tileForce = this.engine.map.getTile(tileForcePosition.x, tileForcePosition.y);
    this.engine.debug.debugVectors['tileForcePosition'] = new DebugVector(
      tileForcePosition
        .scale(this.engine.tileSize)
        .add(new Vector(this.engine.tileSize / 2, this.engine.tileSize / 2))
    );

    if (!this.physical.falling && !this.tileForce.data.forcePriority) {
      tileForcePosition = this.physical.position
        .scale(1 / this.engine.tileSize)
        .transform(Math.floor);
      let tileDown = this.engine.map.getTile(tileForcePosition.x, tileForcePosition.y + 1);
      if (tileDown.data.solid) {
        this.tileForce = tileDown;
        this.engine.debug.debugVectors['tileForcePosition'] = new DebugVector(
          tileForcePosition
            .add(new Vector(0, 1))
            .scale(this.engine.tileSize)
            .add(new Vector(this.engine.tileSize / 2, this.engine.tileSize / 2))
        );
      } else {
        this.tileForce = this.engine.map.getTile(tileForcePosition.x + 1, tileForcePosition.y + 1);
        this.engine.debug.debugVectors['tileForcePosition'] = new DebugVector(
          tileForcePosition
            .add(new Vector(1, 1))
            .scale(this.engine.tileSize)
            .add(new Vector(this.engine.tileSize / 2, this.engine.tileSize / 2))
        );
      }
    }

    const wasLeft = this.physical.velocity.x < 0;
    const wasRight = this.physical.velocity.x > 0;

    // Velocity manipulation
    let forces = new Vector(0, 0);
    // Adding gravity to forces
    if (this.tileForce.gravity) {
      forces = forces.add(this.tileForce.gravity);
    } else {
      forces = forces.add(this.engine.gravity);
    }

    this.engine.debug.debugVariables['acceleration'] = this.physical.acceleration;
    // Adding acceleration to forces
    forces = forces.add(this.physical.acceleration);

    // Throttling forces by tile acceleration factors if present
    if (this.tileForce.acceleration) {
      forces = forces.multiply(this.tileForce.acceleration);
    }

    // Integration of forces and velocity
    this.physical.position = this.physical.position.add(this.physical.velocity.scale(data.step));
    this.physical.velocity = this.physical.velocity.add(forces.scale(data.step)).narrow(this.engine.maxVelocity);

    this.engine.debug.debugVariables['forces'] = forces;
    this.engine.debug.debugVariables['velocity'] = this.physical.velocity;

    // Friction on velocity
    if (this.tileForce.friction) {
      this.physical.velocity = this.physical.velocity.multiply(this.tileForce.friction);
    } else {
      this.physical.velocity = this.physical.velocity.multiply(this.engine.friction);
    }

    // Clamping
    if ((wasLeft && (this.physical.velocity.x > 0)) ||
      (wasRight && (this.physical.velocity.x < 0))) {
      this.physical.velocity.x = 0;
    }
    this.physical.velocity = this.physical.velocity.transform((v) => Math.abs(v) < 1 ? 0 : v);

    // Collision detection
    const tilePosition = this.physical.position
      .scale(1 / this.engine.tileSize)
      .transform(Math.floor);
    let tile = this.engine.map.getTile(tilePosition.x, tilePosition.y);
    let tileRight = this.engine.map.getTile(tilePosition.x + 1, tilePosition.y);
    let tileDown = this.engine.map.getTile(tilePosition.x, tilePosition.y + 1);
    let tileDownRight = this.engine.map.getTile(tilePosition.x + 1, tilePosition.y + 1);
    let nx = this.physical.position.x % this.engine.tileSize;
    let ny = this.physical.position.y % this.engine.tileSize;
    if (this.physical.velocity.y > 0) {
      if ((tileDown.data.solid && !tile.data.solid) ||
        (tileDownRight.data.solid && !tileRight.data.solid && nx)) {
        this.physical.position.y = tilePosition.y * this.engine.tileSize;
        this.physical.velocity.y = 0;
        this.physical.falling = false;
        ny = 0;
      }
    } else if (this.physical.velocity.y < 0) {
      if ((tile.data.solid && !tileDown.data.solid) ||
        (tileRight.data.solid && !tileDownRight.data.solid && nx)) {
        this.physical.position.y = (tilePosition.y + 1) * this.engine.tileSize;
        this.physical.velocity.y = 0;
        tile = tileDown;
        tileRight = tileDownRight;
        ny = 0;
      }
    }

    if (this.physical.velocity.x > 0) {
      if ((tileRight.data.solid && !tile.data.solid) ||
        (tileDownRight.data.solid  && !tileDown.data.solid && ny)) {
        this.physical.position.x = tilePosition.x * this.engine.tileSize;
        this.physical.velocity.x = 0;
      }
    } else if (this.physical.velocity.x < 0) {
      if ((tile.data.solid && !tileRight.data.solid) ||
        (tileDown.data.solid && !tileDownRight.data.solid && ny)) {
        this.physical.position.x = (tilePosition.x + 1) * this.engine.tileSize;
        this.physical.velocity.x = 0;
      }
    }

    this.physical.falling = ! (tileDown.data.solid || (nx && tileDownRight.data.solid));
  }
}
