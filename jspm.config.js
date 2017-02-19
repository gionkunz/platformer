SystemJS.config({
  paths: {
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/",
    "platformer/": "src/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "plugin-typescript": "github:frankwallis/plugin-typescript@7.0.4",
      "typescript": "npm:typescript@2.2.0",
      "os": "npm:jspm-nodelibs-os@0.2.0",
      "net": "npm:jspm-nodelibs-net@0.2.0",
      "crypto": "npm:jspm-nodelibs-crypto@0.2.0",
      "assert": "npm:jspm-nodelibs-assert@0.2.0",
      "child_process": "npm:jspm-nodelibs-child_process@0.2.0",
      "buffer": "npm:jspm-nodelibs-buffer@0.2.1",
      "module": "npm:jspm-nodelibs-module@0.2.0",
      "fs": "npm:jspm-nodelibs-fs@0.2.0",
      "path": "npm:jspm-nodelibs-path@0.2.1",
      "process": "npm:jspm-nodelibs-process@0.2.0",
      "vm": "npm:jspm-nodelibs-vm@0.2.0",
      "util": "npm:jspm-nodelibs-util@0.2.1",
      "stream": "npm:jspm-nodelibs-stream@0.2.0",
      "constants": "npm:jspm-nodelibs-constants@0.2.0",
      "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.0",
      "events": "npm:jspm-nodelibs-events@0.2.0",
      "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
      "https": "npm:jspm-nodelibs-https@0.2.1",
      "http": "npm:jspm-nodelibs-http@0.2.0",
      "zlib": "npm:jspm-nodelibs-zlib@0.2.2",
      "url": "npm:jspm-nodelibs-url@0.2.0",
      "mime-types": "npm:mime-types@2.1.14",
      "atob": "npm:atob@2.0.3",
      "btoa": "npm:btoa@1.1.2",
      "css": "github:systemjs/plugin-css@0.1.32"
    },
    "packages": {
      "npm:typescript@2.2.0": {
        "map": {
          "source-map-support": "npm:source-map-support@0.4.11"
        }
      },
      "npm:jspm-nodelibs-os@0.2.0": {
        "map": {
          "os-browserify": "npm:os-browserify@0.2.1"
        }
      },
      "npm:source-map-support@0.4.11": {
        "map": {
          "source-map": "npm:source-map@0.5.6"
        }
      },
      "npm:jspm-nodelibs-crypto@0.2.0": {
        "map": {
          "crypto-browserify": "npm:crypto-browserify@3.11.0"
        }
      },
      "npm:jspm-nodelibs-buffer@0.2.1": {
        "map": {
          "buffer": "npm:buffer@4.9.1"
        }
      },
      "npm:crypto-browserify@3.11.0": {
        "map": {
          "browserify-cipher": "npm:browserify-cipher@1.0.0",
          "browserify-sign": "npm:browserify-sign@4.0.0",
          "create-ecdh": "npm:create-ecdh@4.0.0",
          "create-hash": "npm:create-hash@1.1.2",
          "create-hmac": "npm:create-hmac@1.1.4",
          "inherits": "npm:inherits@2.0.3",
          "public-encrypt": "npm:public-encrypt@4.0.0",
          "randombytes": "npm:randombytes@2.0.3",
          "pbkdf2": "npm:pbkdf2@3.0.9",
          "diffie-hellman": "npm:diffie-hellman@5.0.2"
        }
      },
      "npm:browserify-sign@4.0.0": {
        "map": {
          "create-hash": "npm:create-hash@1.1.2",
          "create-hmac": "npm:create-hmac@1.1.4",
          "inherits": "npm:inherits@2.0.3",
          "bn.js": "npm:bn.js@4.11.6",
          "browserify-rsa": "npm:browserify-rsa@4.0.1",
          "parse-asn1": "npm:parse-asn1@5.0.0",
          "elliptic": "npm:elliptic@6.3.3"
        }
      },
      "npm:create-hmac@1.1.4": {
        "map": {
          "create-hash": "npm:create-hash@1.1.2",
          "inherits": "npm:inherits@2.0.3"
        }
      },
      "npm:public-encrypt@4.0.0": {
        "map": {
          "create-hash": "npm:create-hash@1.1.2",
          "randombytes": "npm:randombytes@2.0.3",
          "bn.js": "npm:bn.js@4.11.6",
          "browserify-rsa": "npm:browserify-rsa@4.0.1",
          "parse-asn1": "npm:parse-asn1@5.0.0"
        }
      },
      "npm:create-hash@1.1.2": {
        "map": {
          "inherits": "npm:inherits@2.0.3",
          "cipher-base": "npm:cipher-base@1.0.3",
          "sha.js": "npm:sha.js@2.4.8",
          "ripemd160": "npm:ripemd160@1.0.1"
        }
      },
      "npm:pbkdf2@3.0.9": {
        "map": {
          "create-hmac": "npm:create-hmac@1.1.4"
        }
      },
      "npm:diffie-hellman@5.0.2": {
        "map": {
          "randombytes": "npm:randombytes@2.0.3",
          "bn.js": "npm:bn.js@4.11.6",
          "miller-rabin": "npm:miller-rabin@4.0.0"
        }
      },
      "npm:buffer@4.9.1": {
        "map": {
          "isarray": "npm:isarray@1.0.0",
          "ieee754": "npm:ieee754@1.1.8",
          "base64-js": "npm:base64-js@1.2.0"
        }
      },
      "npm:create-ecdh@4.0.0": {
        "map": {
          "bn.js": "npm:bn.js@4.11.6",
          "elliptic": "npm:elliptic@6.3.3"
        }
      },
      "npm:browserify-cipher@1.0.0": {
        "map": {
          "browserify-aes": "npm:browserify-aes@1.0.6",
          "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
          "browserify-des": "npm:browserify-des@1.0.0"
        }
      },
      "npm:evp_bytestokey@1.0.0": {
        "map": {
          "create-hash": "npm:create-hash@1.1.2"
        }
      },
      "npm:browserify-aes@1.0.6": {
        "map": {
          "create-hash": "npm:create-hash@1.1.2",
          "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
          "cipher-base": "npm:cipher-base@1.0.3",
          "inherits": "npm:inherits@2.0.3",
          "buffer-xor": "npm:buffer-xor@1.0.3"
        }
      },
      "npm:browserify-rsa@4.0.1": {
        "map": {
          "bn.js": "npm:bn.js@4.11.6",
          "randombytes": "npm:randombytes@2.0.3"
        }
      },
      "npm:parse-asn1@5.0.0": {
        "map": {
          "browserify-aes": "npm:browserify-aes@1.0.6",
          "create-hash": "npm:create-hash@1.1.2",
          "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
          "pbkdf2": "npm:pbkdf2@3.0.9",
          "asn1.js": "npm:asn1.js@4.9.1"
        }
      },
      "npm:browserify-des@1.0.0": {
        "map": {
          "cipher-base": "npm:cipher-base@1.0.3",
          "inherits": "npm:inherits@2.0.3",
          "des.js": "npm:des.js@1.0.0"
        }
      },
      "npm:elliptic@6.3.3": {
        "map": {
          "bn.js": "npm:bn.js@4.11.6",
          "inherits": "npm:inherits@2.0.3",
          "brorand": "npm:brorand@1.0.7",
          "hash.js": "npm:hash.js@1.0.3"
        }
      },
      "npm:cipher-base@1.0.3": {
        "map": {
          "inherits": "npm:inherits@2.0.3"
        }
      },
      "npm:sha.js@2.4.8": {
        "map": {
          "inherits": "npm:inherits@2.0.3"
        }
      },
      "npm:miller-rabin@4.0.0": {
        "map": {
          "bn.js": "npm:bn.js@4.11.6",
          "brorand": "npm:brorand@1.0.7"
        }
      },
      "npm:jspm-nodelibs-stream@0.2.0": {
        "map": {
          "stream-browserify": "npm:stream-browserify@2.0.1"
        }
      },
      "npm:des.js@1.0.0": {
        "map": {
          "inherits": "npm:inherits@2.0.3",
          "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
        }
      },
      "npm:asn1.js@4.9.1": {
        "map": {
          "bn.js": "npm:bn.js@4.11.6",
          "inherits": "npm:inherits@2.0.3",
          "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
        }
      },
      "npm:stream-browserify@2.0.1": {
        "map": {
          "inherits": "npm:inherits@2.0.3",
          "readable-stream": "npm:readable-stream@2.2.2"
        }
      },
      "npm:hash.js@1.0.3": {
        "map": {
          "inherits": "npm:inherits@2.0.3"
        }
      },
      "npm:jspm-nodelibs-string_decoder@0.2.0": {
        "map": {
          "string_decoder-browserify": "npm:string_decoder@0.10.31"
        }
      },
      "npm:readable-stream@2.2.2": {
        "map": {
          "isarray": "npm:isarray@1.0.0",
          "inherits": "npm:inherits@2.0.3",
          "string_decoder": "npm:string_decoder@0.10.31",
          "buffer-shims": "npm:buffer-shims@1.0.0",
          "core-util-is": "npm:core-util-is@1.0.2",
          "process-nextick-args": "npm:process-nextick-args@1.0.7",
          "util-deprecate": "npm:util-deprecate@1.0.2"
        }
      },
      "npm:isomorphic-fetch@2.2.1": {
        "map": {
          "whatwg-fetch": "npm:whatwg-fetch@2.0.2",
          "node-fetch": "npm:node-fetch@1.6.3"
        }
      },
      "npm:node-fetch@1.6.3": {
        "map": {
          "is-stream": "npm:is-stream@1.1.0",
          "encoding": "npm:encoding@0.1.12"
        }
      },
      "npm:encoding@0.1.12": {
        "map": {
          "iconv-lite": "npm:iconv-lite@0.4.15"
        }
      },
      "npm:jspm-nodelibs-http@0.2.0": {
        "map": {
          "http-browserify": "npm:stream-http@2.6.3"
        }
      },
      "npm:jspm-nodelibs-zlib@0.2.2": {
        "map": {
          "browserify-zlib": "npm:browserify-zlib@0.1.4"
        }
      },
      "npm:jspm-nodelibs-url@0.2.0": {
        "map": {
          "url-browserify": "npm:url@0.11.0"
        }
      },
      "npm:stream-http@2.6.3": {
        "map": {
          "inherits": "npm:inherits@2.0.3",
          "readable-stream": "npm:readable-stream@2.2.2",
          "builtin-status-codes": "npm:builtin-status-codes@3.0.0",
          "to-arraybuffer": "npm:to-arraybuffer@1.0.1",
          "xtend": "npm:xtend@4.0.1"
        }
      },
      "npm:browserify-zlib@0.1.4": {
        "map": {
          "readable-stream": "npm:readable-stream@2.2.2",
          "pako": "npm:pako@0.2.9"
        }
      },
      "npm:url@0.11.0": {
        "map": {
          "querystring": "npm:querystring@0.2.0",
          "punycode": "npm:punycode@1.3.2"
        }
      },
      "npm:mime-types@2.1.14": {
        "map": {
          "mime-db": "npm:mime-db@1.26.0"
        }
      }
    }
  },
  transpiler: "plugin-typescript",
  packages: {
    "platformer": {
      "main": "main.ts",
      "format": "esm",
      "defaultExtension": "ts",
      "meta": {
        "*.ts": {
          "loader": "plugin-typescript"
        }
      }
    }
  },
  meta: {
    "*.mp3": {
      "loader": "platformer/loaders/array-buffer"
    },
    "*.png": {
      "loader": "platformer/loaders/data-uri-image"
    },
    "*.css": {
      "loader": "css"
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "github:*/*.json",
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "darsain/fpsmeter": "github:darsain/fpsmeter@0.3.1",
    "rxjs": "npm:rxjs@5.2.0"
  },
  packages: {
    "npm:rxjs@5.2.0": {
      "map": {
        "symbol-observable": "npm:symbol-observable@1.0.4"
      }
    }
  }
});
