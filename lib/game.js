import Character from './character.js';
import Platform from './platform.js';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.circleCount = 10;
    this.platformCount = 5;
    this.circles = [];
    this.baller = new Character(ctx);
    this.platform = new Platform(ctx);
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
      this.platforms.push(new Platform(this.ctx, yCoord));
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

export default Game;
