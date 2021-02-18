//Each thief will appear at the ende of the canvas but with random "y" and speed 
class Thief {
  constructor() {
    this.x = WIDTH;
    this.width = 50;
    this.height = 50;
    this.y = random(0, 300);
    this.speedX = random(2, 5);
    this.speedY = random(2, 5);
  }

  // every frame it moves the thief to the left "x" and "y"
  draw() {
    this.x -= this.speedX;
    this.y -= this.speedY;

    //keeps the thiefs in the canvas on the "y" axis
    if (this.y > HEIGHT - this.height || this.y < 0) {
      this.speedY = -this.speedY;
    }
    //image of the thief
    image(thief, this.x, this.y, this.width, this.height);
  }
}
