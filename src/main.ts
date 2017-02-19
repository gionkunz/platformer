import {Engine} from './engine';

const engine = new Engine(
  <HTMLCanvasElement>document.querySelector('.game-canvas'),
  320, 180
);
engine.loadMap('/src/maps/map1.ts');
