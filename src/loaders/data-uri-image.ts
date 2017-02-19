import * as DataUri from './data-uri';

export function fetch(data) {
  return DataUri.fetch(data);
}

export function translate(load) {
  return DataUri.fetch(load);
}

export function instantiate(load) {
  return new Promise((resolve, reject) => {
    const image: HTMLImageElement = document.createElement('img');
    image.src = load.source;
    image.onload = () => resolve(image);
  });
}
