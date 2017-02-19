import {AudioBufferLoader, AudioSource} from './audio-buffer-loader';
import {AudioEffect} from './audio-effect';

export class AudioEnvironment {
  audioBufferLoader: AudioBufferLoader;
  masterGain: GainNode;
  input: GainNode;
  nearConvolver: AudioEffect;
  farConvolver: AudioEffect;

  convolverBuffers: Map<any, Promise<AudioSource>> = new Map();

  constructor(public audioContext: AudioContext) {
    this.audioBufferLoader = new AudioBufferLoader(this.audioContext);

    this.masterGain = this.audioContext.createGain();
    this.masterGain.connect(this.audioContext.destination);

    this.farConvolver = new AudioEffect(this.audioContext, [
      this.audioContext.createConvolver()
    ]);
    this.farConvolver.output.connect(this.masterGain);

    this.nearConvolver = new AudioEffect(this.audioContext, [
      this.audioContext.createConvolver()
    ]);
    this.nearConvolver.output.connect(this.farConvolver.input);

    this.input = this.audioContext.createGain();
    this.input.connect(this.nearConvolver.input);

    this.convolverBuffers.set('ir-cave',
      this.audioBufferLoader.load('ir-cave', '/assets/sounds/ir/cave.wav'));
    this.convolverBuffers.set('ir-tenniscourt',
      this.audioBufferLoader.load('ir-cave', '/assets/sounds/ir/tenniscourt.wav'));
    this.convolverBuffers.set('ir-muffler',
      this.audioBufferLoader.load('ir-cave', '/assets/sounds/ir/muffler.wav'));

    this.farConvolution('ir-tenniscourt', 0.05);
  }

  nearConvolution(key, dryWet) {
    if (key) {
      this.convolverBuffers.get(key).then((source: AudioSource) => {
        this.nearConvolver.effectNodes[0].buffer = source.buffer;
      });
    }

    this.nearConvolver.setDryWet(dryWet);
  }

  farConvolution(key, dryWet) {
    if (key) {
      this.convolverBuffers.get(key).then((source: AudioSource) => {
        this.farConvolver.effectNodes[0].buffer = source.buffer;
      });
    }

    this.farConvolver.setDryWet(dryWet);
  }

  play(key) {
    return this.audioBufferLoader.sources.get(key).then((audioSource: AudioSource) => {
      const sourceNode: AudioBufferSourceNode = this.audioContext.createBufferSource();
      sourceNode.buffer = audioSource.buffer;
      sourceNode.connect(this.input);
      sourceNode.addEventListener('ended', () => sourceNode.disconnect());
      sourceNode.start(0);
      return sourceNode;
    });
  }
}
