import tilesImage from '../../assets/tiles/tiles.png';
import {GameMap} from '../game-map';
import {Clock} from '../clock';
import {Player} from '../entities/player';

export interface GraphicsTile {
  x: number;
  y: number;
}

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

export class SimpleGraphicsTileProvider implements GraphicsTileProvider {
  constructor(private graphicsTile: GraphicsTile) {

  }

  provideGraphicsTile() {
    return this.graphicsTile;
  }
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

export class MapKeyGraphicsTileProvider implements GraphicsTileProvider {
  private providers: Map<string, GraphicsTileProvider> = new Map<string, GraphicsTileProvider>();

  set(key: string, provider: GraphicsTileProvider) {
    this.providers.set(key, provider);
  }

  provideGraphicsTile(data: any) {
    const provider: GraphicsTileProvider = this.providers.get(data.key);
    if (provider) {
      return provider.provideGraphicsTile(data);
    }
  }
}

export class ThreeSliceGraphicsTileProvider implements GraphicsTileProvider {
  constructor(private map: GameMap, private centerX: number, private centerY: number) {

  }

  provideGraphicsTile(data: any) {
    const east = this.map.getTile(data.x + 1, data.y).data;
    const west = this.map.getTile(data.x - 1, data.y).data;

    if (!west.solid) {
      return {x: this.centerX - 1, y: this.centerY};
    } else if (!east.solid) {
      return {x: this.centerX + 1, y: this.centerY};
    } else {
      return {x: this.centerX, y: this.centerY};
    }
  }
}


export class NineSliceGraphicsTileProvider implements GraphicsTileProvider {
  constructor(private map: GameMap, private centerX: number, private centerY: number) {

  }

  provideGraphicsTile(data: any) {
    const north = this.map.getTile(data.x, data.y - 1).data;
    const east = this.map.getTile(data.x + 1, data.y).data;
    const south = this.map.getTile(data.x, data.y + 1).data;
    const west = this.map.getTile(data.x - 1, data.y).data;

    if (!north.solid && east.solid && south.solid && west.solid) {
      return {x: this.centerX, y: this.centerY - 1};
    } else if (!north.solid && !east.solid && south.solid && west.solid) {
      return {x: this.centerX + 1, y: this.centerY - 1};
    } else if (north.solid && !east.solid && south.solid && west.solid) {
      return {x: this.centerX + 1, y: this.centerY};
    } else if (north.solid && !east.solid && !south.solid && west.solid) {
      return {x: this.centerX + 1, y: this.centerY + 1};
    } else if (north.solid && east.solid && !south.solid && west.solid) {
      return {x: this.centerX, y: this.centerY + 1};
    } else if (north.solid && east.solid && !south.solid && !west.solid) {
      return {x: this.centerX - 1, y: this.centerY + 1};
    } else if (north.solid && east.solid && south.solid && !west.solid) {
      return {x: this.centerX - 1, y: this.centerY};
    } else if (!north.solid && east.solid && south.solid && !west.solid) {
      return {x: this.centerX - 1, y: this.centerY - 1};
    } else {
      return {x: this.centerX, y: this.centerY};
    }
  }
}

export class LiquidGraphicsTileProvider implements GraphicsTileProvider {
  surfaceAnimationProvider: AnimatedGraphicsTileProvider;

  constructor(private map: GameMap, private clock: Clock, private liquidName: string, private startX: number, private startY: number) {
    this.surfaceAnimationProvider = new AnimatedGraphicsTileProvider(clock, 0.4, [{
      x: startX,
      y: startY
    }, {
      x: startX + 1,
      y: startY
    }, {
      x: startX + 2,
      y: startY
    }, {
      x: startX + 3,
      y: startY
    }]);
  }

  provideGraphicsTile(data: any) {
    const north = this.map.getTile(data.x, data.y - 1).data;

    if (!north.solid && north.name !== this.liquidName) {
      return this.surfaceAnimationProvider.provideGraphicsTile();
    } else {
      return {x: this.startX, y: this.startY + 1};
    }
  }
}

export class PlayerGraphicsTileProvider implements GraphicsTileProvider {
  playerStandingEast: SimpleGraphicsTileProvider = new SimpleGraphicsTileProvider({
    x: 6,
    y: 16
  });
  playerStandingWest: SimpleGraphicsTileProvider = new SimpleGraphicsTileProvider({
    x: 3,
    y: 16
  });
  playerRunningEast: AnimatedGraphicsTileProvider = new AnimatedGraphicsTileProvider(this.clock, 0.1, [
    {x: 6, y: 16},
    {x: 0, y: 17},
    {x: 1, y: 17},
    {x: 0, y: 17}
  ]);
  playerRunningWest: AnimatedGraphicsTileProvider = new AnimatedGraphicsTileProvider(this.clock, 0.1, [
    {x: 3, y: 16},
    {x: 2, y: 16},
    {x: 1, y: 16},
    {x: 2, y: 16}
  ]);
  playerDirection: number = 1;

  constructor(private player: Player, private clock: Clock) {

  }

  provideGraphicsTile() {
    if (this.player.acceleration.x > 0.2) {
      this.playerDirection = 1;
      return this.playerRunningEast.provideGraphicsTile();
    } else if (this.player.acceleration.x < -0.2) {
      this.playerDirection = -1;
      return this.playerRunningWest.provideGraphicsTile();
    } else {
      if (this.playerDirection === 1) {
        return this.playerStandingEast.provideGraphicsTile();
      } else {
        return this.playerStandingWest.provideGraphicsTile();
      }
    }
  }
}
