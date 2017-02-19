import Rx from 'rxjs';

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
  last: number;
  accumulatorTick: Rx.Subject<IClockTime> = new Rx.Subject();
  fullTick: Rx.Subject<IClockTime> = new Rx.Subject();

  constructor(public slowFactor: number) {
    this.last = performance.now();
    this.animationFrame();
  }

  animationFrame() {
    const now = performance.now();
    const frameTime = Math.min(1, (now - this.last) / 1000);
    this.last = now;

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
