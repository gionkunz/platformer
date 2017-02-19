import {Subject} from 'rxjs/Rx';
import {KEYS, subscribeKeyActionMap} from './input/keyboard-input';

export interface IClockTime {
  time: number;
  step: number;
}

export interface IUpdateable {
  update(data: IClockTime);
}

export class Clock {
  time: number = 0;
  fps: number = 60;
  step: number = 1/this.fps;
  accumulator: number = 0;
  slowDown: boolean;
  speedUp: boolean;
  last: number;
  accumulatorTick: Subject<IClockTime> = new Subject();
  fullTick: Subject<IClockTime> = new Subject();

  constructor(public slowFactor: number) {
    this.last = performance.now();
    this.animationFrame();

    subscribeKeyActionMap({
      [KEYS.KEY_MINUS]: (key) => this.slowDown = key.down,
      [KEYS.KEY_PLUS]: (key) => this.speedUp = key.down
    });
  }

  animationFrame() {
    const now = performance.now();
    const frameTime = Math.min(1, (now - this.last) / 1000);
    this.last = now;

    if (this.slowDown) {
      this.slowFactor += 0.1;
    }

    if (this.speedUp) {
      this.slowFactor = Math.max(0.01, this.slowFactor - 0.1);
    }

    const slowStep = this.step * this.slowFactor;

    this.accumulator += frameTime;
    while (this.accumulator >= slowStep) {
      this.accumulatorTick.next(<IClockTime>{time: this.time, step: this.step});
      this.accumulator -= slowStep;
      this.time += slowStep;
    }
    this.fullTick.next(<IClockTime>{time: this.time, step: this.step});
    requestAnimationFrame(() => this.animationFrame());
  }
}
