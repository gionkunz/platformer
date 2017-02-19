import {AudioBufferDecoder, AudioSource} from './audio-buffer-loader';
import {AudioEffect} from './audio-effect';
import {IUpdateable, IClockTime} from '../clock';
import audioCaveIrBuffer from '../../assets/sounds/ir/cave.mp3';
import audioMufflerIrBuffer from '../../assets/sounds/ir/muffler.mp3';
import audioSacristyIrBuffer from '../../assets/sounds/ir/sacristy.mp3';
import audioJump from '../../assets/sounds/jump.mp3';
import audioCoin from '../../assets/sounds/coin.mp3';
import audioMainThemeOverworld from '../../assets/sounds/main-theme-overworld.mp3';
import {MapTile} from '../game-map';

export interface ConvolutionSettings {
  key: string;
  dryWet: number;
}

export class AudioEnvironment implements IUpdateable {
  audioBufferLoader: AudioBufferDecoder;
  masterGain: GainNode;
  input: GainNode;
  nearConvolver: AudioEffect;
  farConvolver: AudioEffect;
  convolverCurrentKeyMap: Map<AudioEffect, string> = new Map<AudioEffect, string>();
  audioOriginTile: MapTile;
  defaultNearConvolution: ConvolutionSettings = {
    key: 'ir-muffler',
    dryWet: 0
  };
  defaultFarConvolution: ConvolutionSettings = {
    key: 'ir-sacristy',
    dryWet: 0.02
  };

  convolverBuffers: Map<any, Promise<AudioSource>> = new Map();

  constructor(public audioContext: AudioContext) {
    this.audioBufferLoader = new AudioBufferDecoder(this.audioContext);

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

    this.audioBufferLoader.decode('music', audioMainThemeOverworld);
    this.audioBufferLoader.decode('jump', audioJump);
    this.audioBufferLoader.decode('coin', audioCoin);

    this.convolverBuffers.set('ir-cave',
      this.audioBufferLoader.decode('ir-cave', audioCaveIrBuffer));
    this.convolverBuffers.set('ir-muffler',
      this.audioBufferLoader.decode('ir-muffler', audioMufflerIrBuffer));
    this.convolverBuffers.set('ir-sacristy',
      this.audioBufferLoader.decode('ir-sacristy', audioSacristyIrBuffer));

    this.setConvolution(this.farConvolver, this.defaultFarConvolution);
    this.setConvolution(this.nearConvolver, this.defaultNearConvolution);

    this.play('music', 0.5, true);
  }

  setAudioOriginTile(tile: MapTile) {
    this.audioOriginTile = tile;
    this.setConvolution(this.farConvolver, tile.data.farConvolution || this.defaultFarConvolution);
    this.setConvolution(this.nearConvolver, tile.data.nearConvolution || this.defaultNearConvolution);
  }

  private setConvolution(convolver: AudioEffect, settings: ConvolutionSettings) {
    if (settings.key && this.convolverCurrentKeyMap.get(convolver) !== settings.key) {
      this.convolverBuffers.get(settings.key).then((source: AudioSource) => {
        convolver.effectNodes[0].buffer = source.buffer;
      });
      this.convolverCurrentKeyMap.set(convolver, settings.key);
    }

    convolver.setDryWet(settings.dryWet);
  }

  play(key: string, volume: number = 1, loop: boolean = false) {
    return this.audioBufferLoader.sources.get(key).then((audioSource: AudioSource) => {
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = volume;
      gainNode.connect(this.input);

      const sourceNode: AudioBufferSourceNode = this.audioContext.createBufferSource();
      sourceNode.buffer = audioSource.buffer;
      if (loop) {
        sourceNode.loop = true;
      } else {
        sourceNode.addEventListener('ended', () => sourceNode.disconnect());
      }
      sourceNode.connect(gainNode);
      sourceNode.start(0);
      return sourceNode;
    });
  }

  update(data: IClockTime) {
    this.nearConvolver.update(data);
    this.farConvolver.update(data);
  }
}
