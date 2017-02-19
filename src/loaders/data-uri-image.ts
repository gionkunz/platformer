import {loadBinaryData, IBinaryData} from './binary-load';
import btoa from 'btoa';

export interface IAsyncImage {
  address: string;
  loadedImage: Promise<HTMLImageElement>;
}

export function fetch(data) {
  return loadBinaryData(data.address)
    .then((binaryData: IBinaryData) => {
      if (this.builder) {
        return `data:${binaryData.contentType};base64,${btoa(
          new Uint8Array(binaryData.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        )}`;
      } else {
        return '';
      }
    });
}

export function translate(data) {
  if (this.builder) {
    return `
      var image = document.createElement('img');
      image.src = '${data.source}';
      module.exports = {
        address: '${data.address}',
        loadedImage: new Promise(function(resolve) {
          image.onload = resolve(image);
        })
      };
    `;
  } else {
    return '';
  }
}

export function instantiate(data) {
  const loadedImage = new Promise((resolve) => {
    const image = document.createElement('img');
    image.src = data.address;
    image.onload = () => resolve(image);
  });
  return Promise.resolve({
    address: data.address,
    loadedImage
  });
}
