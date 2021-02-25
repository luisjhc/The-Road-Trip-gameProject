class Pretzel {
  constructor() {
    this.width = 50;
    this.height = 50;
  }

  //the pastel will appear randomly. This function is called every time we catch the pastel
  setRandomPosition() {
    this.x = random(0, WIDTH - this.width);
    this.y = random(0, HEIGHT - this.height);
  }

  //draw the pastel
  draw() {
    image(pretzel, this.x, this.y, this.width, this.height);
  }
}
