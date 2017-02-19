export class AudioEffect {
  input: GainNode;
  output: GainNode;
  private dryGain: GainNode;
  private wetGain: GainNode;

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

    this.setDryWet(0);
  }

  setDryWet(ratio: number) {
    this.dryGain.gain.value = 1 - ratio;
    this.wetGain.gain.value = ratio;
  }
}
