class Item {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = (Math.random() * 310) >>> 0;
    this.y = ~((Math.random() * 3000) + 600);
    this.type = "berry";
  }

  drawItem() {
    if (this.y > 700) {
      this.y = ~(Math.random() * 3000);
      this.x = (Math.random() * 310) >>> 0;

      let rand = (Math.random() * 2) >>> 0;
      this.type = ["berry", "rarecandy"][rand];
    }

    let img = new Image();
    if (this.type === "berry") {
      img.src = "./images/berry.png";
    } else {
      img.src = "./images/rarecandy.png";
    }

    this.ctx.drawImage(img, this.x, this.y);
  }
}

export default Item;
