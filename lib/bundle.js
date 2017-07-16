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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__character_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_js__ = __webpack_require__(3);



class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.baller = new __WEBPACK_IMPORTED_MODULE_0__character_js__["a" /* default */](ctx);
    this.numPlatforms = 5;
    this.platforms = [];
    this.platformWidth = 70;
    this.generatePlatforms();
    this.score = 0;
    this.godMode = true;
    this.facing = "right";


    this.gameOver = false;
    this.start = this.start.bind(this);
    this.showHighScores();
  }

  generatePlatforms() {
    let yValue = 0;

    for (var i = 0; i < this.numPlatforms; i++) {
      this.platforms[i] = new __WEBPACK_IMPORTED_MODULE_1__platform_js__["a" /* default */](this.ctx, Math.random() * 250, yValue, this.baller, this.platformWidth);
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
        this.platforms.unshift(new __WEBPACK_IMPORTED_MODULE_1__platform_js__["a" /* default */](this.ctx, Math.random() * 250, platform.y - 620, this.baller, this.platformWidth));
      }
    });
  }

  movePlatforms() {
    this.platforms.forEach( (platform) => {
      platform.y += this.baller.jumpSpeed + 4;
    });
  }

  checkCollision() {
    this.platforms.forEach( (platform, idx) => {
      if (this.facing === "right") {

        if (this.baller.isFalling &&
          (this.baller.x + 65 > platform.x || this.baller.x + 20 > platform.x) &&
          (this.baller.x + 20 < platform.x + platform.width ||
          this.baller.x + 65 < platform.x + platform.width) &&
          this.baller.y + 80 > platform.y &&
          this.baller.y + 80 < platform.y + platform.height
        ) {
          this.godMode = false;
          this.currentPlatform = idx;
          platform.handleCollision();
        }
      }

      if (this.facing === "left") {
        if (this.baller.isFalling &&
          (this.baller.x + 65 > platform.x || this.baller.x + 20 > platform.x) &&
          (this.baller.x + 20 < platform.x + platform.width ||
          this.baller.x + 65 < platform.x + platform.width) &&
          this.baller.y + 80 > platform.y &&
          this.baller.y + 80 < platform.y + platform.height
        ) {
          this.godMode = false;
          this.currentPlatform = idx;
          platform.handleCollision();
        }
      }
    });
  }

  clear() {
    this.ctx.fillStyle = 'white';
  	this.ctx.clearRect(0, 0, 350, 600);
  	this.ctx.beginPath();
  	this.ctx.rect(0, 0, 350, 600);
  	this.ctx.closePath();
  	this.ctx.fill();
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


  isGameOver() {
    cancelAnimationFrame(this.gameLoop);

    this.ctx.fillStyle = "Black";
		this.ctx.font = "20px Futura-CondensedExtraBold, sans-serif";
		this.ctx.fillText("GAME OVER", 120, 250);
    this.ctx.fillText("PRESS ENTER TO PLAY AGAIN", 50, 350);

    this.showHighScores();
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

  start() {
    this.clear();

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
    this.checkCollision();

    this.gameLoop = requestAnimationFrame(this.start);

    if (this.baller.y + 80 >= 608 && this.godMode === false) {
      this.clear();
      this.gameOver = true;
      this.isGameOver();
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

  ctx.fillStyle = 'white';
  ctx.clearRect(0, 0, 350, 600);
  ctx.beginPath();
  ctx.rect(0, 0, 350, 600);
  ctx.closePath();
  ctx.fill();

  let game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */](ctx);

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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Platform {
  constructor(ctx, x, y, baller, width) {
    this.ctx = ctx;
    this.baller = baller;
    this.width = width;
    this.height = 20;
    this.x = x;
    this.y = y;
  }

  handleCollision() {
    this.baller.fallStop();
  }

  drawPlatform() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Platform);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map