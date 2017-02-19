import {Engine} from './engine';
/*import FPSMeter from 'darsain/fpsmeter/dist/fpsmeter';

const fpsMeter = new FPSMeter();*/

const engine = new Engine(
  <HTMLCanvasElement>document.querySelector('.game-canvas'),
  1024, 768
);
engine.loadMap('/src/maps/map1.ts');
//engine.clock.fullTick.subscribe(() => fpsMeter.tick());
