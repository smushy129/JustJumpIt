class Platform {
  constructor(ctx, x, y, baller, width, type) {
    this.ctx = ctx;
    this.baller = baller;
    this.width = width;
    this.height = 20;
    this.x = x;
    this.y = y;
    this.type = type;
  }

  handleCollision() {
    if (this.type === "normiePlat") {
      this.baller.fallStop();
    } else {
      this.baller.superJump();
    }

  }

  drawPlatform() {
    if (this.type === "normiePlat") {
      let img = new Image();
      img.src = "./images/mud.png";
      this.ctx.drawImage(img, this.x, this.y);
    } else {
      let img = new Image();
      img.src = "./images/grass.png";
      this.ctx.drawImage(img, this.x, this.y);
    }
  }

}

export default Platform;
