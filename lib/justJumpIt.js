import Game from './game.js';

document.addEventListener("DOMContentLoaded", function() {
  const canvasElement = document.getElementById("canvas");
  const scoreElement = document.getElementById("score");
  const ctx = canvasElement.getContext("2d");
  const scoreCtx = scoreElement.getContext("2d");

  canvasElement.width = 350;
  canvasElement.height = 600;

  const game = new Game(ctx);

  ctx.fillStyle = "White";
  ctx.font = "20px Futura-CondensedExtraBold, sans-serif";
  ctx.fillText("Press Space to Start", 90, 300);


  function drawScore() {
    scoreCtx.fillStyle = "White";
    scoreCtx.font = "28px Futura-CondensedExtraBold, sans-serif";
    scoreCtx.fillText(game.score, 140, 28);
    scoreCtx.globalCompositeOperation = "copy";
    requestAnimationFrame(drawScore);
  }

  document.addEventListener("keydown", (e) => {
    let ballerPos = game.baller.x;
  	 switch (e.keyCode) {
  	   case 37:
          game.baller.moveLeft();
  	     break;
  	   case 39:
          game.baller.moveRight();
  	     break;
      case 32:
        if (game.gameOver === true) {
          game.score = 0;
          game.start();
          game.gameOver = false;
        } else if (game.gameOver === false && game.score === 0) {
          game.start();
        }
        break;
  	   default:
  	     return null;
  	 }
  });

  document.onmousemove = (e) => {
    if (game.baller.x + canvasElement.offsetLeft > e.pageX) {
      game.baller.moveLeft();
    } else if (game.baller.x + canvasElement.offsetLeft < e.pageX) {
      game.baller.moveRight();
    }
  };

  drawScore();
  game.baller.jump();

});
