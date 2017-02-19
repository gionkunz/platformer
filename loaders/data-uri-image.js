exports.fetch = (data) => {
  return fetch(data.address)
    .then((response) => response.blob())
    .then((blob) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => resolve(reader.result);
      });
    });
};

exports.instantiate = (load) => {
  return new Promise((resolve) => {
    const image = document.createElement('img');
    image.src = load.source;
    image.onload = () => resolve(image);
  });
};
