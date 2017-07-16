import Game from './game.js';

window.keyLeft = false;
window.keyRight = false;

window.difficulty = "normal";
window.addEventListener("keydown", checkKeyPressed, false);
window.addEventListener("keyup", checkKeyUp, false);

function checkKeyPressed() {
  switch(event.keyCode) {
    case 37:
      window.keyLeft = true;
      break;
    case 39:
      window.keyRight = true;
      break;
    }
}

function checkKeyUp() {
  window.keyLeft = false;
  window.keyRight = false;
}

document.addEventListener("DOMContentLoaded", function() {
  const canvasElement = document.getElementById("canvas");
  const scoreElement = document.getElementById("score");
  const ctx = canvasElement.getContext("2d");
  const scoreCtx = scoreElement.getContext("2d");

  canvasElement.width = 350;
  canvasElement.height = 600;

  ctx.fillStyle = 'white';
  ctx.clearRect(0, 0, 350, 600);
  ctx.beginPath();
  ctx.rect(0, 0, 350, 600);
  ctx.closePath();
  ctx.fill();

  let game = new Game(ctx);

  ctx.fillStyle = "black";
  ctx.font = "20px Futura-CondensedExtraBold, sans-serif";
  ctx.fillText("Press Enter to Start", 90, 300);


  function drawScore() {
    scoreCtx.fillStyle = "black";
    scoreCtx.font = "50px Futura-CondensedExtraBold, sans-serif";
    scoreCtx.fillText(game.score, 40, 55);
    scoreCtx.globalCompositeOperation = "copy";
    requestAnimationFrame(drawScore);
  }

  document.addEventListener("keydown", (e) => {
    let ballerPos = game.baller.x;
  	 switch (e.keyCode) {
  	   case 37:
          window.keyLeft = true;
  	     break;
  	   case 39:
          window.keyRight = true;
  	     break;
      case 13:
        if (game.gameOver === true) {
          game = new Game(ctx);

          if (window.difficulty === "normal") {
            game.platformWidth = 70;
          } else {
            game.platformWidth = 100;
          }

          game.baller.jump();
          game.start();
        } else if (game.gameOver === false && game.godMode === true) {

          if (window.difficulty === "normal") {
            game.platformWidth = 70;
          } else {
            game.platformWidth = 100;
          }

          game.start();
        }
        break;
	    default:
  	    return null;
  	 }
  });

  const submitForm = document.getElementById("score-form");
  submitForm.onsubmit = (e) => game.pushScore(e);

  drawScore();
  game.baller.jump();
});
