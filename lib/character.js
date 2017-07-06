class Character {
  constructor(ctx) {
    this.ctx = ctx;
    this.ctx.fillStyle = 'green';
    this.x = 250;
    this.y = 400;
    this.ctx.fillRect(this.x, this.y, 30, 30);
  }

  handleLeftRight() {
    this.ctx.clearRect(0, 0, 500, 500);
    this.ctx.fillRect(this.x, this.y, 30, 30);
  }

  handleJump() {

  }
}

export default Character;
