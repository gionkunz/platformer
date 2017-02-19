import {Vector} from './vector';
import {ConvolutionSettings} from './audio/audio-environment';

export interface IMapCoordinates {
  x: number;
  y: number;
}

export interface IMapTileData {
  name: string;
  colour?: string;
  solid?: boolean;
  jump?: boolean;
  foreground?: boolean;
  gravity?: IMapCoordinates;
  friction?: IMapCoordinates;
  acceleration?: IMapCoordinates;
  forcePriority?: boolean;
  farConvolution?: ConvolutionSettings;
  nearConvolution?: ConvolutionSettings;
  alpha?: number;
}

export interface IMapData {
  tiles: {[i: number]: IMapTileData};
  data: number[][];
  tileSize: number;
  gravity: IMapCoordinates;
  entities: {
    type: string,
    location: IMapCoordinates,
    data?: any
  }[];
}

export class MapTile {
  data: IMapTileData;
  gravity: Vector;
  friction: Vector;
  acceleration: Vector;

  static fromTileData(tileData: IMapTileData): MapTile {
    const tile = new MapTile();
    tile.data = tileData;
    if (tileData.gravity) {
      tile.gravity = Vector.from(tileData.gravity);
    }
    if (tileData.friction) {
      tile.friction = Vector.from(tileData.friction);
    }
    if (tileData.acceleration) {
      tile.acceleration = Vector.from(tileData.acceleration);
    }
    return tile;
  }

  toString() {
    return `Tile({solid: ${this.data.solid}, friction: ${this.friction}, colour: ${this.data.colour})`;
  }
}

export const TILE_DATA_UNKNOWN: IMapTileData = <IMapTileData>{
  name: 'unknown',
  solid: false,
  colour: 'transparent'
};

export const TILE_DATA_END: IMapTileData = <IMapTileData>{
  name: 'end',
  solid: false,
  colour: 'transparent'
};

export class GameMap {
  tiles: MapTile[][];
  size: Vector;

  constructor(public mapData: IMapData) {
    this.size = new Vector(
      mapData.data.reduce((size, row) => Math.max(size, row.length), 0),
      mapData.data.length
    );

    this.tiles = [];
    for(let y = 0; y < this.size.y; y++) {
      for(let x = 0; x < this.size.x; x++) {
        const tileData = mapData.tiles[mapData.data[y][x]] || TILE_DATA_UNKNOWN;
        this.tiles[y] = this.tiles[y] || [];
        this.tiles[y][x] = MapTile.fromTileData(tileData);
      }
    }
  }

  getTile(x: number, y: number): MapTile {
    if (y in this.tiles && x in this.tiles[y]) {
      return this.tiles[y][x];
    } else {
      return MapTile.fromTileData(TILE_DATA_END);
    }
  }
}
