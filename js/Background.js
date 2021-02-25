//class for the background
class Background {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = WIDTH;
    this.height = HEIGHT;
  }

  draw() {
    //move the image to the left 3 px
    this.x -= 3;
    //first image
    image(backgroundImage, this.x, this.y, this.width, this.height);
    //second image. Starts at the end of the first one
    image(
      backgroundImage,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );

    //reset the canvas. Images ar in a never ending loop
    if (this.x <= -this.width) {
      this.x = 0;
    }

    textSize(30);
    fill(255, 217, 51);
    textFont("Comic Sans MS");
    text("LEVEL 1", 550, 30);
  }
}
