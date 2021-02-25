//class to display the page between levels
class NextLevel {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = WIDTH;
    this.height = HEIGHT;
  }

  draw() {
    nextLevelPage.style.display = "flex";
  }
}
