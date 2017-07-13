import Character from './character.js';
import Platform from './platform.js';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.baller = new Character(ctx);
    this.numPlatforms = 5;
    this.platforms = [];
    this.platformWidth = 70;
    this.generatePlatforms();
    this.score = 0;
    this.godMode = true;


    this.gameOver = false;
    this.start = this.start.bind(this);
    this.showHighScores();
  }

  generatePlatforms() {
    let yValue = 0;

    for (var i = 0; i < this.numPlatforms; i++) {
      this.platforms[i] = new Platform(this.ctx, Math.random() * 250, yValue, this.baller, this.platformWidth);
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
        this.platforms.unshift(new Platform(this.ctx, Math.random() * 250, platform.y - 620, this.baller, this.platformWidth));
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
      if (this.baller.isFalling &&
        this.baller.x + 70 > platform.x &&
        this.baller.x + 59 < platform.x + platform.width &&
        this.baller.y + 119 > platform.y &&
        this.baller.y + 119 < platform.y + platform.height
      ) {
        this.godMode = false;
        this.currentPlatform = idx;
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
    } else if (window.keyRight) {
      this.baller.moveRight();
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

    if (this.baller.y + 119 >= 615 && this.godMode === false) {
      this.clear();
      this.gameOver = true;
      this.isGameOver();
    }
  }

}

export default Game;
