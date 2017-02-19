import FPSMeter from 'darsain/fpsmeter/dist/fpsmeter';
import {Vector, BBox} from './vector';
import {GameMap} from './game-map';
import map1 from './maps/map1';
import {Camera} from './camera';
import {Clock, IClockTime} from './clock';
import {Player} from './entities/player';
import {Coin} from './entities/coin';
import {AudioEnvironment} from './audio/audio-environment';
import {
  drawTile,
  GraphicsTile,
  MapKeyGraphicsTileProvider,
  NineSliceGraphicsTileProvider,
  ThreeSliceGraphicsTileProvider,
  LiquidGraphicsTileProvider
} from './graphics/graphics-tile';

export interface IDrawable {
  draw(engine: Engine, data: IClockTime);
}

export class Engine {
  camera: Camera;
  viewport: BBox;
  clipBox: BBox;
  map: GameMap;
  tileSize: number;
  renderingContext: CanvasRenderingContext2D;
  clock: Clock;
  gravity: Vector;
  friction: Vector;
  maxVelocity: Vector;
  entities: any[];
  player: Player;
  audioEnvironment: AudioEnvironment;
  mapTileProvider: MapKeyGraphicsTileProvider;
  debug: boolean = false;

  constructor(public canvas: HTMLCanvasElement, viewportWidth: number, viewportHeight: number) {
    this.canvas.width = viewportWidth;
    this.canvas.height = viewportHeight;
    this.renderingContext = this.canvas.getContext('2d');
    this.renderingContext.imageSmoothingEnabled = false;
    this.viewport = new BBox(
      new Vector(0, 0),
      new Vector(viewportWidth, viewportHeight)
    );
    this.clock = new Clock(1);
    this.audioEnvironment = new AudioEnvironment(new AudioContext());

    if (this.debug) {
      const fpsMeter = new FPSMeter();
      this.clock.fullTick.subscribe(() => fpsMeter.tick());
    }

    this.map = new GameMap(map1);
    this.initialize(this.map);
  }

  meters(v) {
    return this.tileSize / 2 * v;
  }

  initialize(map: GameMap) {
    this.tileSize = map.mapData.tileSize;
    this.gravity = new Vector(0, 150).transform((v) => this.meters(v));
    this.maxVelocity = new Vector(80, 100).transform((v) => this.meters(v));
    this.friction = new Vector(0.95, 0.95);
    this.clipBox = new BBox(
      new Vector(-this.tileSize, -this.tileSize),
      new Vector(this.viewport.bottomRight.x, this.viewport.bottomRight.y)
    );
    this.clock.accumulatorTick.subscribe((data: IClockTime) => {
      this.entities.forEach((entity) => entity.update(data));

      this.entities
        .filter((entity) => entity instanceof Coin)
        .forEach((coin) => {
          if (this.player.position.subtract(coin.position).magnitude() < this.tileSize) {
            this.audioEnvironment.play('coin');
            this.entities.splice(this.entities.indexOf(coin), 1);
          }
        });

      this.camera.update(data);
    });
    this.clock.fullTick.subscribe((data: IClockTime) => {
      this.audioEnvironment.update(data);
      this.renderingContext.clearRect(0, 0, this.viewport.width(), this.viewport.height());
      this.drawMap();
      this.entities.forEach((entity) => entity.draw(this, data));
      this.drawMap(true);
    });

    this.entities = map.mapData.entities.map((entityData) => {
      if (entityData.type === 'player') {
        return new Player(
          Vector.from(entityData.location).scale(this.tileSize),
          this);
      } else if (entityData.type === 'coin') {
        return new Coin(
          Vector.from(entityData.location).scale(this.tileSize),
          this);
      }
    });

    this.player = this.entities.find((entity) => entity instanceof Player);

    this.camera = new Camera(
      new Vector(0, 0),
      this.player,
      this
    );

    this.renderingContext.clearRect(0, 0, this.viewport.width(), this.viewport.height());

    this.mapTileProvider = new MapKeyGraphicsTileProvider();
    this.mapTileProvider.set('ground', new NineSliceGraphicsTileProvider(this.map, 2, 7));
    this.mapTileProvider.set('ice', new NineSliceGraphicsTileProvider(this.map, 13, 6));
    this.mapTileProvider.set('dirt', new NineSliceGraphicsTileProvider(this.map, 5, 14));
    this.mapTileProvider.set('platform', new ThreeSliceGraphicsTileProvider(this.map, 10, 16));
    this.mapTileProvider.set('water', new LiquidGraphicsTileProvider(this.map, this.clock, 'water', 0, 4));
    this.mapTileProvider.set('slime', new LiquidGraphicsTileProvider(this.map, this.clock, 'slime', 0, 2));
  }

  drawMap(foreground?: boolean) {
    for (let y = 0; y < this.map.size.y; y++) {
      for (let x = 0; x < this.map.size.x; x++) {
        const projectedPosition: Vector = new Vector(
          x * this.tileSize,
          y * this.tileSize
        ).subtract(this.camera.position);

        const tile = this.map.getTile(x, y);

        if (this.clipBox.isCoordinatesInside(projectedPosition) && tile.data.foreground === foreground) {
          const graphicsTile: GraphicsTile =
            this.mapTileProvider.provideGraphicsTile({key: tile.data.name, x, y});

          if (graphicsTile) {
            drawTile(graphicsTile, this.renderingContext, projectedPosition.x, projectedPosition.y, this.tileSize, this.tileSize, tile.data.alpha);
          } else {
            this.renderingContext.globalAlpha = tile.data.alpha || 1;
            this.renderingContext.fillStyle = tile.data.colour;
            this.renderingContext.fillRect(
              projectedPosition.x,
              projectedPosition.y,
              this.tileSize,
              this.tileSize
            );
          }

          if (this.debug) {
            this.renderingContext.fillStyle = '#ff00ff';
            this.renderingContext.font = '8px sans-serif';
            this.renderingContext.fillText(`${x},${y}`, projectedPosition.x + this.tileSize / 2 - 4, projectedPosition.y + this.tileSize / 2, 12);
          }
        }
      }
    }
  }
}
