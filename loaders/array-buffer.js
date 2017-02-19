exports.fetch = (data) => {
  return fetch(data.address)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      return btoa(
        new Uint8Array(arrayBuffer)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
    });
};

exports.instantiate = (load) => {
  return {
    url: load.address,
    buffer: Uint8Array.from(
      atob(load.source),
      (c) => c.charCodeAt(0)
    ).buffer
  };
};
