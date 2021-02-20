//class for the player
class Player {
  constructor() {
    this.x = 80;
    this.y = 200;
    this.width = 100;
    this.height = 48;
  }

  //called from Game.js. Checks if the player is pressing any arrow key and calls the appropriate function
  keyPressed() {
    if (keyCode === 38) {
      this.moveUp();
    }
    if (keyCode === 37) {
      this.moveLeft();
    }
    if (keyCode === 39) {
      this.moveRight();
    }
    if (keyCode === 40) {
      this.moveDown();
    }
  }

  moveUp() {
    // player moves up 30px
    this.y -= 30;
    //keeps player in the canvas
    if (this.y < 0) {
      this.y = 0;
    }
  }

  moveLeft() {
    // player moves left 30px
    this.x -= 30;
    //keeps player in the canvas
    if (this.x < 0) {
      this.x = 0;
    }
  }

  moveDown() {
    // player moves down 30px
    this.y += 30;
    //keeps player in the canvas
    if (this.y + this.height > HEIGHT) {
      this.y = HEIGHT - this.height;
    }
  }

  moveRight() {
    // player moves right 30px
    this.x += 30;
    //keeps player in the canvas
    if (this.x + this.width > WIDTH) {
      this.x = WIDTH - this.width;
    }
  }

  draw() {
    //draw the player
    image(van, this.x, this.y, this.width, this.height);
  }

  // function to reset the player whe the button is pressed
  resetPlayer() {
    this.x = 80;
    this.y = 200;
  }
}
