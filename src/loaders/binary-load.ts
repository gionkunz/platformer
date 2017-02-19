export interface IBinaryData {
  contentType: string;
  data: ArrayBuffer;
}

export interface ILoadBinaryData {
  (url: string): Promise<IBinaryData>;
}

function fetchBinarayData(url: string): Promise<IBinaryData> {
  return fetch(url)
    .then(function(response: Response) {
      return response.arrayBuffer().then((arrayBuffer) => {
        return {
          contentType: response.headers.get('Content-Type'),
          data: arrayBuffer
        };
      });
    });
}

function nodeBinaryData(url: string): Promise<IBinaryData> {
  url = url.substr(7);

  return Promise.all([
    SystemJS.import('fs'),
    SystemJS.import('mime-types')
  ]).then(([fs, mime]) => {
    return new Promise((resolve, reject) => {
      fs.readFile(url, (err, data) => {
        if (err) {
          return reject(err);
        } else {
          resolve({
            data,
            contentType: mime.contentType(url)
          });
        }
      });
    });
  });
}

export let loadBinaryData: ILoadBinaryData;

if (typeof window !== 'undefined' && window.fetch) {
  loadBinaryData = fetchBinarayData;
} else {
  loadBinaryData = nodeBinaryData;
}
