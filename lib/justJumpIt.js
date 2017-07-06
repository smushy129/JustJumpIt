import Game from './game.js';


document.addEventListener("DOMContentLoaded", function() {
  const canvasElement = document.getElementById("canvas");
  canvasElement.width = 350;
  canvasElement.height = 600;

  const ctx = canvasElement.getContext("2d");
  const game = new Game(ctx);

  document.addEventListener("keydown", (e) => {
    let ballerPos = game.baller.character.x;
  	 switch (e.keyCode) {
  	   case 37:
        if (ballerPos > 0 ) {
          game.baller.character.x -= 10;
        }
  	     break;
  	   case 39:
        if (ballerPos < 300) {
          game.baller.character.x += 10;
        }
  	     break;
  	   default:
  	     return null;
  	 }
  });

  game.start();
});
