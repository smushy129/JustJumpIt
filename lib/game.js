import Character from './character.js';
import Platform from './platform.js';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.baller = new Character(ctx);
    this.numPlatforms = 7;
    this.platforms = [];
    this.createCircles();
    this.generatePlatforms();
    this.score = 0;

    this.gameOver = false;
    this.gameLoop = requestAnimationFrame(this.start);
    this.start = this.start.bind(this);
  }

  generatePlatforms() {
    let yValue = 0;

    for (var i = 0; i < this.numPlatforms; i++) {
      this.platforms[i] = new Platform(this.ctx, Math.random() * 250, yValue, this.baller);
      if (yValue < 600 - 20) {
        yValue += ~~(600 / this.numPlatforms);
      }
    }
  }

  generateSinglePlatform() {
    this.platforms.forEach( (platform) => {
      platform.y += this.baller.jumpSpeed;

      if (platform.y > 600) {
        this.score++;
        this.platforms.pop();
        this.platforms.unshift(new Platform(this.ctx, Math.random() * 250, platform.y - 600, this.baller));
      }
    });
  }

  checkCollision() {
    this.platforms.forEach( (platform) => {
      if (this.baller.isFalling &&
        this.baller.x + 50 > platform.x &&
        this.baller.x + 40 < platform.x + platform.width &&
          this.baller.y + 74 > platform.y &&
        this.baller.y + 74 < platform.y + platform.height
      ) {
        platform.handleCollision();
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

  createCircles() {
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
  }

  isGameOver() {
    cancelAnimationFrame(this.gameLoop);

    this.ctx.fillStyle = "Black";
		this.ctx.font = "20px Futura-CondensedExtraBold, sans-serif";
		this.ctx.fillText("GAME OVER", 120, 270);
    this.ctx.fillText("PRESS SPACE TO PLAY AGAIN", 50, 350);
  }

  start() {
    this.clear();

    this.generateSinglePlatform();
    if (this.baller.isJumping) {
      this.baller.checkJump();
    }

    if (this.baller.isFalling) {
      this.baller.checkFall();
    }

    this.baller.drawCharacter();

    this.platforms.forEach( (platform) => {
      platform.drawPlatform();
    });

    this.checkCollision();

    this.gameLoop = requestAnimationFrame(this.start);

    if (this.baller.y > 526 && this.score !== 0) {
      this.clear();
      this.gameOver = true;
      this.isGameOver();
    }
  }

}

export default Game;
