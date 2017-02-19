import tilesImage from '../../assets/tiles/tiles.png!/src/loaders/data-uri-image';

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
