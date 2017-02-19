import {Engine} from './engine';
import FPSMeter from 'darsain/fpsmeter/dist/fpsmeter';

const fpsMeter = new FPSMeter();

const engine = new Engine(
  <HTMLCanvasElement>document.querySelector('.game-canvas'),
  400, 400, <HTMLElement>document.querySelector('.debug-element')
);
engine.loadMap('/src/maps/map1.ts');
engine.clock.fullTick.subscribe(() => fpsMeter.tick());
