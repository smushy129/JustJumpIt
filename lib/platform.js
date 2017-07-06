class Platform {
  constructor(ctx, yCoord) {
    this.ctx = ctx;
    this.coordinates = {
      x: Math.random() * 250,
      y: yCoord,
      src: "./images/platform.png"
    };
  }
}

export default Platform;
