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
    if (this.y < 600 - 50) {
      this.setPosition(this.x, this.y + this.fallSpeed);
        if (this.fallSpeed <= 17) {
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

export default Character;
