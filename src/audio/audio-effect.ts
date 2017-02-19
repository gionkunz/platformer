import {IUpdateable, IClockTime} from '../clock';
import {AnimationValue} from '../util/animation-value';

export class AudioEffect implements IUpdateable {
  input: GainNode;
  output: GainNode;
  private dryGain: GainNode;
  private wetGain: GainNode;
  private ratioAnimation: AnimationValue;

  constructor(private audioContext: AudioContext, public effectNodes: AudioNode[]) {
    this.output = audioContext.createGain();
    this.input = audioContext.createGain();

    this.dryGain = audioContext.createGain();
    this.dryGain.connect(this.output);
    this.wetGain = audioContext.createGain();

    this.input.connect(this.dryGain);
    this.input.connect(this.wetGain);
    this.wetGain.connect(effectNodes[0]);

    for(let i = 0; i < effectNodes.length - 1; i++) {
      effectNodes[i].connect(effectNodes[i + 1]);
    }

    effectNodes[effectNodes.length - 1].connect(this.output);

    this.ratioAnimation = new AnimationValue(0);
  }

  update(time: IClockTime) {
    this.ratioAnimation.update(time);
    this.dryGain.gain.value = 1 - this.ratioAnimation.value;
    this.wetGain.gain.value = this.ratioAnimation.value;
  }

  setDryWet(ratio: number) {
    this.ratioAnimation.animateTo(ratio, 0.1);
  }
}
