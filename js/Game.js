//class that control the logic of the game
class Game {
  constructor() {
    //calling the background
    this.background = new Background();
    //calling the player
    this.player = new Player();
  }

  setup() {}

  //you can go to player class for more info about this function
  keyPressed() {
      this.player.keyPressed();
  }

  //draw the game
  draw() {
    //clear canvas
    clear();
    //draw the background
    this.background.draw();
    //draw the player
    this.player.draw();
  }
}
