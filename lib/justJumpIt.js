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

  let game = new Game(ctx);

  ctx.fillStyle = "yellow";
  ctx.font = "20px Futura-CondensedExtraBold, Futura";
  ctx.fillText("Mission", 140, 50);
  ctx.fillText("Help Hitmonlee avoid Pokeballs", 40, 100);
  ctx.fillText("and get the highest score", 60, 130);

  ctx.fillStyle = "red";
  ctx.fillText("Press T to toggle sound", 70, 500);
  ctx.fillText("Press Enter to Start", 90, 450);


  function drawScore() {
    if (game.score < 100) {
      scoreCtx.fillStyle = "yellow";
    } else if (game.score >= 100 && game.score < 300){
      let gradient = scoreCtx.createLinearGradient(0, 0, 150, 0);
      gradient.addColorStop(0.000, 'rgba(255, 110, 2, 1.000)');
      gradient.addColorStop(0.500, 'rgba(255, 255, 0, 1.000)');
      gradient.addColorStop(1.000, 'rgba(255, 109, 0, 1.000)');
      scoreCtx.fillStyle = gradient;
  } else if (game.score >= 300 && game.score < 999){
      let gradient = scoreCtx.createLinearGradient(0, 0, 200, 0);
      gradient.addColorStop(0.000, 'rgba(255, 110, 2, 1.000)');
      gradient.addColorStop(0.000, 'rgba(255, 255, 0, 1.000)');
      gradient.addColorStop(1.000, 'rgba(255, 0, 0, 1.000)');
      scoreCtx.fillStyle = gradient;
    } else {
      let gradient = scoreCtx.createLinearGradient(0, 0, scoreElement.width, 0);
      gradient.addColorStop("0","magenta");
      gradient.addColorStop("0.5","blue");
      gradient.addColorStop("1.0","red");
      scoreCtx.fillStyle = gradient;
    }

    scoreCtx.font = "75px Futura-CondensedExtraBold, Futura";
    scoreCtx.fillText(game.score, 70, 70);
    scoreCtx.globalCompositeOperation = "copy";
    requestAnimationFrame(drawScore);
  }

  document.addEventListener("keydown", (e) => {
    let ballerPos = game.baller.x;
  	 switch (e.keyCode) {
       case 84:
        if (game.sound.volume) {
          game.sound.volume = 0;
        } else {
          game.sound.volume = 1;
        }
         break;
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
