export interface AudioSource {
  url: string;
  buffer: AudioBuffer;
}

export class AudioBufferDecoder {
  sources: Map<any, Promise<AudioSource>> = new Map();

  constructor(public audioContext: AudioContext) {}

  decode(key: any, audioSource: AudioSource) {
    const promise = new Promise((resolve, reject) => {
      this.audioContext.decodeAudioData(audioSource.buffer, (decoded: AudioBuffer) => {
        audioSource.buffer = decoded;
        resolve(audioSource);
      }, () => reject(audioSource));
    });
    this.sources.set(key, promise);
    return promise;
  }
}
