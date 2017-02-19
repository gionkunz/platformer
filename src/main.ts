import './styles/styles.css';
import {Engine} from './engine';

document.body.innerHTML = `
  <div class="stretch">
    <canvas class="game-canvas"></canvas>
  </div>
`;

const engine = new Engine(
  <HTMLCanvasElement>document.querySelector('.game-canvas'),
  320, 180
);
