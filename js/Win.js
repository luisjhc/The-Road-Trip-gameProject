class Win {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = WIDTH;
    this.height = HEIGHT;
  }

  draw() {
    image(winImage, this.x, this.y, WIDTH, HEIGHT);
  }
}
