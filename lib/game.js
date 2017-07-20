import Character from './character.js';
import Platform from './platform.js';
import Pokeball from './pokeball.js';
import Item from './item.js';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.baller = new Character(ctx);
    this.numPlatforms = 7;
    this.platforms = [];
    this.platformWidth = 70;
    this.generatePlatforms();
    this.score = 0;
    this.godMode = true;
    this.facing = "right";
    this.pokeball = new Pokeball(ctx);
    this.item = new Item(ctx);
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
      this.platforms[i] = new Platform(
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
          new Platform(this.ctx, Math.random() * 250,
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
      this.item = new Item(this.ctx);
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

export default Game;
