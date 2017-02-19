export function fetch(data) {
  return window.fetch(data.address)
    .then((response) => response.blob())
    .then((blob) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => resolve(reader.result);
      });
    });
}

export function translate(load) {
  return `module.exports = '${load.source}'`;
}
