//class for the hearts
class Heart {
  //constructor recives the x from the Game file, line 53. I had to set the x dynamically to be able to display 3 hearts in a row
  constructor(x) {
    this.x = x;
    this.y = 10;
    this.width = 20;
    this.height = 20;
  }

  draw() {
    image(heart, this.x, this.y, this.width, this.height);
  }
}
