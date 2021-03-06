//class for the level 2 background
class BackgroundLvl2 {
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
    image(backgroundImageLevel2, this.x, this.y, this.width, this.height);
    //second image. Starts at the end of the first one
    image(
      backgroundImageLevel2,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
    //reset the canvas. Images ar in a never ending loop
    if (this.x <= -this.width) {
      this.x = 0;
    }

    //to show the level in the canvas
    textSize(30);
    fill(30, 225, 58);
    textFont("Comic Sans MS");
    text("LEVEL 2", 550, 30);
  }
}
