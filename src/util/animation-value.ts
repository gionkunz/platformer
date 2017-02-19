import {IUpdateable, IClockTime} from '../clock';

export class AnimationValue implements IUpdateable {
  value: number;
  previousValue: number;
  targetValue: number;
  animationStartTime: number;
  animationEndTime: number;
  currentTime: number;
  done: boolean;

  constructor(initialValue: number) {
    this.value = initialValue;
    this.done = true;
    this.currentTime = 0;
  }

  update(data: IClockTime) {
    this.currentTime = data.time;

    if (this.done) {
      return;
    }

    if (this.animationEndTime < this.currentTime) {
      this.done = true;
      this.value = this.targetValue;
    } else {
      const ratio = (this.currentTime - this.animationStartTime) /
        (this.animationEndTime - this.animationStartTime);
      this.value = this.previousValue + (this.targetValue - this.previousValue) * ratio;
    }
  }

  animateTo(targetValue: number, duration: number) {
    this.done = false;
    this.previousValue = this.value;
    this.targetValue = targetValue;
    this.animationStartTime = this.currentTime;
    this.animationEndTime = this.animationStartTime + duration;
  }
}
