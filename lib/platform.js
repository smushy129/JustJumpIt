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
    let img = new Image();
    img.src = "./images/mud.png";
    this.ctx.drawImage(img, this.x, this.y);
  }

}

export default Platform;
