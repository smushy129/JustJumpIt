import Game from './game.js';


document.addEventListener("DOMContentLoaded", function() {
  const canvasElement = document.getElementsByTagName("canvas")[0];
  canvasElement.width = 500;
  canvasElement.height = 500;

  const ctx = canvasElement.getContext("2d");
  ctx.fillStyle = 'green';
  ctx.fillRect(10, 10, 100, 100);

  const game = new Game(ctx);
});
