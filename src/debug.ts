import {Engine} from './engine';
import {Vector} from './vector';

export class DebugVector {
  constructor(public vector: Vector, public colour?: string, public origin?: Vector, public scale?: number) {}
}

export class Debug {
  debugVectors: {[s: string]: DebugVector} = {};
  debugVariables: {[s: string]: any} = {};
  logs: {time: number, message: string}[] = [];
  debugLogsElement: HTMLElement;
  debugVariablesElement: HTMLElement;

  constructor(public engine: Engine, public debugElement: HTMLElement) {
    this.debugLogsElement = <HTMLElement>debugElement.querySelector('.debug-logs');
    this.debugVariablesElement = <HTMLElement>debugElement.querySelector('.debug-variables');
  }

  log(message: string) {
    this.logs.push({
      time: +new Date(),
      message
    });
    if (this.logs.length > 10) {
      this.logs.shift();
    }
  }

  draw() {
    Object.keys(this.debugVectors).forEach((key) => {
      const debugVector = this.debugVectors[key];
      this.engine.renderingContext.strokeStyle =
        debugVector.colour || 'rgba(0, 255, 255, 0.9)';

      if (debugVector.origin) {
        const origin = debugVector.origin.subtract(this.engine.camera.position);
        const vector = debugVector.vector
          .scale(debugVector.scale ? debugVector.scale : 1)
          .add(origin);
        this.engine.renderingContext.moveTo(origin.x, origin.y);
        this.engine.renderingContext.lineTo(vector.x, vector.y);

        this.engine.renderingContext.strokeRect(
          vector.x - 1,
          vector.y - 1,
          3, 3
        );
      } else {
        const vector = this.debugVectors[key].vector.subtract(this.engine.camera.position);
        this.engine.renderingContext.strokeRect(
          vector.x - 1,
          vector.y - 1,
          3, 3
        );
      }
    });

    this.debugVariablesElement.innerHTML =
      Object.keys(this.debugVariables).map(
        (key) => `<div>${key}: ${this.debugVariables[key]}</div>`
      ).join('');

    this.debugLogsElement.innerHTML =
      this.logs.map((log) => `<div>${log.time}: ${log.message}</div>`).join('');
  }
}
