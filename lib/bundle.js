/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__character_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pokeball_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__item_js__ = __webpack_require__(2);





class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.baller = new __WEBPACK_IMPORTED_MODULE_0__character_js__["a" /* default */](ctx);
    this.numPlatforms = 7;
    this.platforms = [];
    this.platformWidth = 70;
    this.generatePlatforms();
    this.score = 0;
    this.godMode = true;
    this.facing = "right";
    this.pokeball = new __WEBPACK_IMPORTED_MODULE_2__pokeball_js__["a" /* default */](ctx);
    this.item = new __WEBPACK_IMPORTED_MODULE_3__item_js__["a" /* default */](ctx);
    this.gameOverSound = new Audio('./sounds/gameover.wav');
    this.obtainItemSound = new Audio('./sounds/bubblepop.wav');
    this.obtainItemSound.volume = 0.5;
    this.gameOver = false;
    this.start = this.start.bind(this);
    this.showHighScores();
  }

  generatePlatforms() {
    let yValue = 0;

    for (var i = 0; i < this.numPlatforms; i++) {
      this.platforms[i] = new __WEBPACK_IMPORTED_MODULE_1__platform_js__["a" /* default */](
        this.ctx, Math.random() * 250,
        yValue,
        this.baller,
        this.platformWidth,
        "normiePlat"
      );

      if (yValue < 600 - 20) {
        yValue += ~~(600 / this.numPlatforms+4);
      }
    }
    this.baller.x = 140;
    this.baller.y = 470;
  }

  generateSinglePlatform() {
    this.platforms.forEach( (platform) => {

      if (platform.y > 600) {
        this.score ++;
        this.platforms.pop();

        let type = Math.random() <= 0.2 ? "superPlat" : "normiePlat";
        this.platforms.unshift(
          new __WEBPACK_IMPORTED_MODULE_1__platform_js__["a" /* default */](this.ctx, Math.random() * 250,
           platform.y - 620,
           this.baller,
           this.platformWidth,
           type
         ));
      }
    });
  }

  movePlatforms() {
    this.platforms.forEach( (platform) => {
      platform.y += this.baller.jumpSpeed + 4;
    });
    this.pokeball.y += this.baller.jumpSpeed + 4;
    this.pokeball.centerY += this.baller.jumpSpeed + 4;
    this.item.y += this.baller.jumpSpeed + 4;
  }

  checkCollision() {
    this.platforms.forEach( (platform, idx) => {
      if (this.facing === "right") {

        if (this.baller.isFalling &&
          (this.baller.x + 65 > platform.x || this.baller.x + 20 > platform.x) &&
          (this.baller.x + 20 < platform.x + platform.width ||
          this.baller.x + 65 < platform.x + platform.width) &&
          this.baller.y + 70 > platform.y &&
          this.baller.y + 70 < platform.y + platform.height
        ) {
          this.godMode = false;

          platform.handleCollision();
        }
      }

      if (this.facing === "left") {
        if (this.baller.isFalling &&
          (this.baller.x + 65 > platform.x || this.baller.x + 20 > platform.x) &&
          (this.baller.x + 20 < platform.x + platform.width ||
          this.baller.x + 65 < platform.x + platform.width) &&
          this.baller.y + 70 > platform.y &&
          this.baller.y + 70 < platform.y + platform.height
        ) {
          this.godMode = false;
          platform.handleCollision();
        }
      }
    });
  }

  clear() {
  	this.ctx.clearRect(0, 0, 350, 600);
  }

  pushScore(e) {
    e.preventDefault();

    let newScore = firebase.database().ref("scores").push();
    window.newScore = newScore;
    let username = $(".username-input").val();

    if (username) {
      newScore.set({username: `${username}`, score: parseInt(this.score)});
    }
  }

  showHighScores() {
    var scoresTable = firebase.database().ref("scores");
     scoresTable.orderByChild("score").limitToLast(10).on('value', (snapshot, highscores) => {
       $("ol li").remove();
       highscores = [];
       snapshot.forEach(childSnapshot => {
         highscores.push((childSnapshot.val()));
       });
         highscores.reverse();
       for (let i = 0; i < highscores.length; i++) {
         let $li = $('<li>');
         $("ol").append($li.text(`${highscores[i].username}: ${highscores[i].score}`));
       }
     });
   }

  checkPokeballCollision() {
    if (this.facing === "right") {
      if (this.pokeball.centerX >= this.baller.x + 15 &&
        this.pokeball.centerX <= this.baller.x + 64 &&
        this.pokeball.centerY >= this.baller.y + 10 &&
        this.pokeball.centerY <= this.baller.y + 70
      ) {
        return true;
      }
      return false;
    }

    if (this.facing === "left") {
      if (this.pokeball.centerX >= this.baller.x + 15 &&
        this.pokeball.centerX <= this.baller.x + 64 &&
        this.pokeball.centerY >= this.baller.y + 10 &&
        this.pokeball.centerY <= this.baller.y + 70
      ) {
        return true;
      }
      return false;
    }
  }

  checkItemCollision() {
    if (this.item.x >= this.baller.x &&
      this.item.x <= this.baller.x + 80 &&
      this.item.y >= this.baller.y &&
      this.item.y <= this.baller.y + 80
    ) {
      this.obtainItemSound.play();

      if (this.item.type === "berry") {
        this.score += 10;
      } else {
        this.score += 50;
      }
      this.item = new __WEBPACK_IMPORTED_MODULE_3__item_js__["a" /* default */](this.ctx);
    }
  }

  isGameOver() {
    this.gameOverSound.play();
    cancelAnimationFrame(this.gameLoop);

    this.ctx.fillStyle = "yellow";
		this.ctx.font = "40px Futura-CondensedExtraBold, Futura";
		this.ctx.fillText("GAME OVER", 70, 200);
    this.ctx.font = "20px Futura-CondensedExtraBold, Futura";
    this.ctx.fillText("PRESS ENTER TO PLAY AGAIN", 50, 420);
  }

  checkLeftRight() {
    if (window.keyLeft) {
      this.baller.moveLeft();
      this.baller.img.src = "./images/baller2.png";
      this.facing = "left";
    } else if (window.keyRight) {
      this.baller.moveRight();
      this.baller.img.src = "./images/baller.png";
      this.facing = "right";
    }
  }

  playScoreSounds() {
    if (this.score === 100 ||
      this.score === 300 ||
      this.score === 1000
    ) {
      let scoreSound = new Audio('./sounds/hiscore.wav');
      scoreSound.play();
    }
  }

  start() {
    this.clear();
    this.playScoreSounds();
    this.checkLeftRight();
    this.generateSinglePlatform();

    if (this.baller.isJumping) {
      this.baller.checkJump();
    }

    if (this.baller.isFalling) {
      this.baller.checkFall();
    }

    if (this.godMode === false && this.baller.y < 180) {
      this.movePlatforms();
    }

    this.baller.drawCharacter();

    this.platforms.forEach( (platform) => {
      platform.drawPlatform();
    });

    if (this.score > 50) {
      this.pokeball.movePokeball();
      this.pokeball.drawPokeball();
    }

    this.item.drawItem();

    this.checkCollision();
    this.checkPokeballCollision();
    this.checkItemCollision();

    this.gameLoop = requestAnimationFrame(this.start);

    if ((this.baller.y + 80 >= 608 && this.godMode === false) ||
      this.checkPokeballCollision()
    ) {
      this.isGameOver();
      this.gameOver = true;
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Character {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = null;
    this.y = null;
    this.img = new Image();
    this.img.src = "./images/baller.png";
    this.isJumping = false;
    this.isFalling = false;
    this.jumpSpeed = 0;
    this.fallSpeed = 0;
    this.jumpSound = new Audio("./sounds/jump.wav");
    this.jumpSound.volume = 0.5;
    this.hiJumpSound = new Audio("./sounds/hijump.wav");
    this.hiJumpSound.volume = 1;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  jump() {
    if (!this.isJumping && !this.isFalling) {
      this.fallSpeed = 0;
      this.isJumping = true;
      this.jumpSpeed = 17;
    }
    this.jumpSound.play();
  }

  superJump() {
    this.isFalling = false;
    this.fallSpeed = 0;

    if (!this.isJumping && !this.isFalling) {
      this.fallSpeed = 0;
      this.isJumping = true;
      this.jumpSpeed = 40;
    }
    this.hiJumpSound.play();
  }

  checkJump() {
    if (this.y > 170) {
      this.setPosition(this.x, this.y - this.jumpSpeed);
    }

    this.jumpSpeed--;

    if (this.jumpSpeed === 0) {
      this.isJumping = false;
      this.isFalling = true;
      this.fallSpeed = 1;
    }
  }

  checkFall() {
    if (this.y < 600 - 70) {
      this.setPosition(this.x, this.y + this.fallSpeed);
        if (this.fallSpeed <=18) {
          this.fallSpeed++;
        }
    } else {
      this.fallStop();
    }
  }

  fallStop() {
    this.isFalling = false;
    this.fallSpeed = 0;
    this.jump();
  }

  moveLeft() {
    if (this.x > 0) {
      this.setPosition(this.x -= 8, this.y);
    }
  }

  moveRight() {
    if (this.x < 300) {
      this.setPosition(this.x += 8, this.y);
    }
  }

  drawCharacter() {
    this.ctx.drawImage(this.img, this.x, this.y);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Character);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Item {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = (Math.random() * 310) >>> 0;
    this.y = ~((Math.random() * 3000) + 600);
    this.type = "berry";
  }

  drawItem() {
    if (this.y > 700) {
      this.y = ~(Math.random() * 3000);
      this.x = (Math.random() * 310) >>> 0;

      let rand = (Math.random() * 2) >>> 0;
      this.type = ["berry", "rarecandy"][rand];
    }

    let img = new Image();
    if (this.type === "berry") {
      img.src = "./images/berry.png";
    } else {
      img.src = "./images/rarecandy.png";
    }

    this.ctx.drawImage(img, this.x, this.y);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Item);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(0);


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

  let game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */](ctx);

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
        if (game.baller.jumpSound.volume) {
          game.baller.jumpSound.volume = 0;
          game.baller.hiJumpSound.volume = 0;
        } else {
          game.baller.jumpSoundsound.volume = 1;
          game.baller.hiJumpSound.volume = 1;
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
          game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */](ctx);

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


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Platform {
  constructor(ctx, x, y, baller, width, type) {
    this.ctx = ctx;
    this.baller = baller;
    this.width = width;
    this.height = 20;
    this.x = x;
    this.y = y;
    this.type = type;
  }

  handleCollision() {
    if (this.type === "normiePlat") {
      this.baller.fallStop();
    } else {
      this.baller.superJump();
    }

  }

  drawPlatform() {
    if (this.type === "normiePlat") {
      let img = new Image();
      img.src = "./images/mud.png";
      this.ctx.drawImage(img, this.x, this.y);
    } else {
      let img = new Image();
      img.src = "./images/grass.png";
      this.ctx.drawImage(img, this.x, this.y);
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Platform);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Pokeball {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = -50;
    this.y = ((Math.random() * 250) >>> 0);
    this.centerX = this.x + 12;
    this.centerY = this.y + 12;
    this.direction = "right";
  }

  movePokeball() {
    if (this.direction === "left") {
      this.x -= 3;
      this.centerX = this.x + 12;
    }

    if (this.direction === "right") {
      this.x += 3;
      this.centerX = this.x + 12;
    }

    if (this.x > 550 || this.x < -200) {
      let rand = (Math.random() * 2) >>> 0;
      this.direction = ["left", "right"][rand];

      if (this.direction === "left") {
        this.x = 400;
        this.y = this.y = ((Math.random() * 250) >>> 0);
        this.centerY = this.y + 12;
      } else {
        this.x = -50;
        this.y = this.y = ((Math.random() * 250) >>> 0);
        this.centerY = this.y + 12;
      }
    }

  }

  drawPokeball() {
    let img = new Image();
    img.src = "./images/pokeball.png";
    this.ctx.drawImage(img, this.x, this.y);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Pokeball);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map