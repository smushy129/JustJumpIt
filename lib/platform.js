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

export default Platform;
