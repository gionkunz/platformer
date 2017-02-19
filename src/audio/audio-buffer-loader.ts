export class AudioSource {
  url: string;
  buffer: AudioBuffer;
}

export class AudioBufferLoader {
  sources: Map<any, Promise<AudioSource>> = new Map();

  constructor(public audioContext: AudioContext) {}

  load(key: any, url: string) {
    const promise = fetch(url)
      .then((response) => response.arrayBuffer())
      .then((data: ArrayBuffer) => {
        return new Promise((success, error) => {
          const audioSource: AudioSource = new AudioSource();
          audioSource.url = url;
          this.audioContext.decodeAudioData(data, (decoded: AudioBuffer) => {
            audioSource.buffer = decoded;
            success(audioSource);
          }, () => error(audioSource));
        });
      });
    this.sources.set(key, promise);
    return promise;
  }
}
