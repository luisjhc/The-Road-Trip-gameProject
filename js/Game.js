//class that control the logic of the game
class Game {
  constructor() {
    //calling the background
    this.background = new Background();
    //empty array of thiefs
    this.thiefs = [];
    //calling the player
    this.player = new Player();
  }

  

  //you can go to player class for more info about this function
  keyPressed() {
    this.player.keyPressed();
  }

  //draw the game
  draw() {
    // clears out the canvas at the beggining of every loop
    clear();

    // draws the background
    this.background.draw();

    // draws the player
    this.player.draw();

    // frameCount is always counting + 1 on every loop of the function draw
    // frame 60/s. 90 -> Every 1,5s push / create a new thief on the array
    if (frameCount % 90 === 0) {
      this.thiefs.push(new Thief());
    }

    // array of thiefs. for every single thief in the array we will:
    this.thiefs.forEach((thief, index) => {
      // draw it
      thief.draw();

      // check if it is coliding with the player
      if (this.collisionCheck(this.player, thief)) {
        console.log("WATCH OUT FOR THE THINGY");
      }

      // remove the thief if its totally off canvas
      if (thief.x <= -thief.width) {
        this.thiefs.splice(index, 1);
      }
    });
  }

  // checks if there is a collision between a player and a thief
  collisionCheck(player, thief) {
    const playerTopArea = player.y;
    const playerLeftArea = player.x;
    const playerRightArea = player.x + player.width;
    const playerBottomArea = player.y + player.height;

    const thiefTopArea = thief.y;
    const thiefLeftArea = thief.x;
    const thiefRightArea = thief.x + thief.width;
    const thiefBottomArea = thief.y + thief.height;
    const isTouchingOnLeft = thiefRightArea > playerLeftArea;
    const isTouchingOnBottom = thiefTopArea < playerBottomArea;
    const isTouchingOnRight = thiefLeftArea < playerRightArea;
    const isTouchingOnTop = thiefBottomArea > playerTopArea;

    return (
      isTouchingOnRight &&
      isTouchingOnTop &&
      isTouchingOnBottom &&
      isTouchingOnLeft
    );
  }
}
