import {Vector, BBox} from './vector';
import {GameMap, IMapData} from './game-map';
import {Camera} from './camera';
import {Clock, IClockTime} from './clock';
import {Player} from './entities/player';
import {Coin} from './entities/coin';
import {Debug} from './debug';
import {AudioEnvironment} from './audio/audio-environment';
import {drawTile, graphicTiles, GraphicsTile} from './graphics/tiles';

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
  debug: Debug;
  entities: any[];
  player: Player;
  audioEnvironment: AudioEnvironment;

  constructor(public canvas: HTMLCanvasElement, viewportWidth: number, viewportHeight: number, debugElement?: HTMLElement) {
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
    this.audioEnvironment.audioBufferLoader.load('jump', '/assets/sounds/jump_11.wav');
    this.audioEnvironment.audioBufferLoader.load('coin', '/assets/sounds/coin.wav');
    this.debug = new Debug(this, debugElement);
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
          if (this.player.position.subtract(coin.position).magnitude() < 16) {
            this.audioEnvironment.play('coin');
            this.entities.splice(this.entities.indexOf(coin), 1);
          }
        });

      this.camera.update(data);
    });
    this.clock.fullTick.subscribe((data: IClockTime) => {
      this.renderingContext.clearRect(0, 0, this.viewport.width(), this.viewport.height());
      this.drawMap();
      this.entities.forEach((entity) => entity.draw(this, data));
      this.drawMap(true);
      this.debug.draw();
    });

    this.entities = map.mapData.entities.map((entityData) => {
      if (entityData.type === 'player') {
        return new Player(
          Vector.from(entityData.location).scale(this.tileSize),
          Vector.from(entityData.pivot),
          this);
      } else if (entityData.type === 'coin') {
        return new Coin(
          Vector.from(entityData.location).scale(this.tileSize),
          Vector.from(entityData.pivot),
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
  }

  loadMap(url) {
    System.import(url).then((module) => {
      this.map = new GameMap(<IMapData>module.default);
      this.initialize(this.map);
    });
  }

  drawMap(foreground?: boolean) {
    for(let y = 0; y < this.map.size.y; y++) {
      for(let x = 0; x < this.map.size.x; x++) {
        const projectedPosition: Vector = new Vector(
          x * this.tileSize,
          y * this.tileSize
        ).subtract(this.camera.position);

        const tile = this.map.getTile(x, y);

        if (this.clipBox.isCoordinatesInside(projectedPosition) && tile.data.foreground === foreground) {
          const graphicTile: GraphicsTile = graphicTiles.get(tile.data.name);
          if (graphicTile) {
            drawTile(graphicTile, this.renderingContext, projectedPosition.x, projectedPosition.y, this.tileSize, this.tileSize);
          } else {
            this.renderingContext.fillStyle = tile.data.colour;
            this.renderingContext.fillRect(
              projectedPosition.x,
              projectedPosition.y,
              this.tileSize,
              this.tileSize
            );
          }
        }
      }
    }
  }
}
