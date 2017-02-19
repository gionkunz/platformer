import tilesImage from '../../assets/tiles/tiles.png!/src/loaders/data-uri-image';
import {GameMap} from '../game-map';
import {Clock} from '../clock';

export interface GraphicsTile {
  x: number;
  y: number;
}

export const graphicTiles: Map<string, GraphicsTile> = new Map<string, GraphicsTile>();
graphicTiles.set('ground', {x: 2, y: 7});

export function drawTile(
  tile: GraphicsTile,
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  tileSize: number = 16,
  gap: number = 1) {

  ctx.drawImage(
    tilesImage,
    tile.x * tileSize + tile.x * gap,
    tile.y * tileSize + tile.y * gap,
    tileSize, tileSize,
    x, y, w, h
  );
}

export interface GraphicsTileProvider {
  provideGraphicsTile(data?: any): GraphicsTile;
}

export class AnimatedGraphicsTileProvider implements GraphicsTileProvider {
  constructor(private clock: Clock, private speed: number, private tiles: GraphicsTile[]) {

  }

  provideGraphicsTile() {
    const index = Math.floor(
      (this.clock.time % (this.speed * this.tiles.length)) / this.speed
    );

    return this.tiles[index];
  }
}

export class CompoundGraphicsTileProvider implements GraphicsTileProvider {
  private providers: GraphicsTileProvider[] =  [];

  add(provider: GraphicsTileProvider) {
    this.providers.push(provider);
  }

  provideGraphicsTile(data: any) {
    for(let provider of this.providers) {
      const graphicsTile = provider.provideGraphicsTile(data);
      if (graphicsTile) {
        return graphicsTile;
      }
    }
  }
}

export class MapGroundGraphicsTileProvider implements GraphicsTileProvider {
  constructor(private map: GameMap) {

  }

  provideGraphicsTile(data: any) {
    if (this.map.getTile(data.x, data.y).data.name !== 'ground') {
      return null;
    }

    const north = this.map.getTile(data.x, data.y - 1).data;
    const east = this.map.getTile(data.x + 1, data.y).data;
    const west = this.map.getTile(data.x - 1, data.y).data;

    if (!north.solid && east.solid && west.solid) {
      return {x: 2, y: 6};
    } else if (!north.solid && !east.solid && west.solid) {
      return {x: 4, y: 6};
    } else if (!north.solid && east.solid && !west.solid) {
      return {x: 0, y: 6};
    } else if (north.solid && !east.solid) {
      return {x: 4, y: 7};
    } else if (north.solid && !west.solid) {
      return {x: 0, y: 7};
    } else {
      return {x: 2, y: 7};
    }
  }
}

export class MapIceGraphicsTileProvider implements GraphicsTileProvider {
  constructor(private map: GameMap) {

  }

  provideGraphicsTile(data: any) {
    if (this.map.getTile(data.x, data.y).data.name !== 'ice') {
      return null;
    }

    const north = this.map.getTile(data.x, data.y - 1).data;
    const east = this.map.getTile(data.x + 1, data.y).data;
    const west = this.map.getTile(data.x - 1, data.y).data;

    if (!north.solid && east.solid && west.solid) {
      return {x: 13, y: 5};
    } else if (!north.solid && !east.solid && west.solid) {
      return {x: 14, y: 5};
    } else if (!north.solid && east.solid && !west.solid) {
      return {x: 12, y: 5};
    } else if (north.solid && !east.solid) {
      return {x: 14, y: 6};
    } else if (north.solid && !west.solid) {
      return {x: 12, y: 6};
    } else {
      return {x: 13, y: 6};
    }
  }
}
