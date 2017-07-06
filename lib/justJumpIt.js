import Game from './game.js';


document.addEventListener("DOMContentLoaded", function() {
  const canvasElement = document.getElementsByTagName("canvas")[0];
  canvasElement.width = 350;
  canvasElement.height = 600;

  const ctx = canvasElement.getContext("2d");
  const game = new Game(ctx);
  game.start();
});
