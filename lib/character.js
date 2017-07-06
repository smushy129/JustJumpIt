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
      this.character.y -= 5;

      if (this.character.y < 250) {
        this.character.jumping = false;
        this.character.falling = true;
      }
    } else if (this.character.falling) {
      this.character.y += 5;

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

export default Character;
