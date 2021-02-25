//class with the pretzel image - level 2
class Pretzel {
  constructor() {
    this.width = 50;
    this.height = 50;
  }

  //the pretzel will appear randomly. This function is called every time we catch the pretzel
  setRandomPosition() {
    this.x = random(0, WIDTH - this.width);
    this.y = random(0, HEIGHT - this.height);
  }

  //draw the pretzel
  draw() {
    image(pretzel, this.x, this.y, this.width, this.height);
  }
}
