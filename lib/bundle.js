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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__character_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_js__ = __webpack_require__(3);



class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.circleCount = 10;
    this.platformCount = 5;
    this.circles = [];
    this.baller = new __WEBPACK_IMPORTED_MODULE_0__character_js__["a" /* default */](ctx);
    this.platform = new __WEBPACK_IMPORTED_MODULE_1__platform_js__["a" /* default */](ctx);
    this.platforms = [];

    // this.clear = this.clear.bind(this);
    // this.drawCircles = this.drawCircles.bind(this);
    // this.moveCircles = this.moveCircles.bind(this);
    this.start = this.start.bind(this);
  }

  clear() {
    this.ctx.fillStyle = '#d0e7f9';
  	this.ctx.clearRect(0, 0, 350, 600);
  	this.ctx.beginPath();
  	this.ctx.rect(0, 0, 350, 600);
  	this.ctx.closePath();
  	this.ctx.fill();
  }

  drawCircles() {
    for (var i = 0; i < this.circleCount; i++) {
      this.circles.push(
        {
          x: Math.random() * 350,
          y: Math.random() * 600,
          radius: Math.random() * 100,
          transparency: Math.random() /2
        }
      );
    }

    for (var j = 0; j < this.circleCount; j++) {
      let currCircle = this.circles[j];

      this.ctx.fillStyle = 'rgba(255, 255, 255, ' + currCircle.transparency + ')';
      this.ctx.beginPath();
      this.ctx.arc(currCircle.x, currCircle.y, currCircle.radius, 0, Math.PI * 2, true);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  moveCircles(value) {
    for (var i = 0; i < this.circleCount; i++) {
      var currCircle = this.circles[i];
      if (currCircle.y - currCircle.radius > 600) {
        currCircle.x = Math.random() * 350;
        currCircle.y = 0 - currCircle.radius;
        currCircle.radius = Math.random() * 100;
        currCircle.transparency = Math.random() / 2;
      } else {
        currCircle.y += value;
      }
    }
  }

  drawPlatforms() {
    let yCoord = 460;
    for (var i = 0; i < this.platformCount; i++) {
      this.platforms.push(new __WEBPACK_IMPORTED_MODULE_1__platform_js__["a" /* default */](this.ctx, yCoord));
      yCoord -= 110;
    }

    for (var j = 0; j < this.platformCount; j++) {
      let currPlatform = this.platforms[j];
      let img = new Image();
      img.src = currPlatform.coordinates.src;
      this.ctx.drawImage(img, currPlatform.coordinates.x, currPlatform.coordinates.y);
    }
  }

  drawBaller() {
    this.baller.drawCharacter();
  }

  start() {
    this.clear();
    this.drawCircles();
    this.moveCircles(5);
    this.drawBaller();
    this.drawPlatforms();
    setTimeout(this.start, 1000/500);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(0);



document.addEventListener("DOMContentLoaded", function() {
  const canvasElement = document.getElementsByTagName("canvas")[0];
  canvasElement.width = 350;
  canvasElement.height = 600;

  const ctx = canvasElement.getContext("2d");
  const game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */](ctx);
  game.start();
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Character {
  constructor(ctx) {
    this.ctx = ctx;
    this.character = {
        x: 140,
        y: 400,
        src: "./images/baller.png",
        jumping: true,
        falling: false
    };
  }

  handleJump() {
    if (this.character.jumping) {
      this.character.y -= 2;

      if (this.character.y < 250) {
        this.character.jumping = false;
        this.character.falling = true;
      }
    } else if (this.character.falling) {
      this.character.y += 2;

      if (this.character.y > 400) {
        this.character.jumping = true;
        this.character.falling = false;
      }
    }
  }

  drawCharacter() {
    let img = new Image();
    img.src = this.character.src;
    this.ctx.drawImage(img, this.character.x, this.character.y);
    this.handleJump();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Character);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Platform {
  constructor(ctx, yCoord) {
    this.ctx = ctx;
    this.coordinates = {
      x: Math.random() * 250,
      y: yCoord,
      src: "./images/platform.png"
    };
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Platform);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map