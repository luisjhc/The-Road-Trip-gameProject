//class to display the page in case the player lose
class Lose {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = WIDTH;
    this.height = HEIGHT;
  }

  draw() {
    losePage.style.display = "flex";
  }
}
