import {loadBinaryData, IBinaryData} from './binary-load';
import btoa from 'btoa';

export function fetch(data: any) {
  return loadBinaryData(data.address)
    .then((binaryData: IBinaryData) => {
      if (this.builder) {
        return btoa(
          new Uint8Array(binaryData.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      } else {
        data.metadata.binaryData = binaryData;
        return '';
      }
    });
}

export function translate(data) {
  if (this.builder) {
    return `
      module.exports = {
        url: '${data.address}', 
        buffer: Uint8Array.from(
          atob('${data.source}'), 
          function(c) { return c.charCodeAt(0) }
        ).buffer
      }
    `;
  } else {
    return '';
  }
}

export function instantiate(data) {
  return {
    url: data.address,
    buffer: data.metadata.binaryData.data
  };
}
