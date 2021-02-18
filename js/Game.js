//class that control the logic of the game
class Game {
  constructor() {
    //calling the background
    this.background = new Background();
    //empty array of thiefs
    this.thiefs = [];
    //calling the player
    this.player = new Player();
    //calling the pastel
    this.pastel = new Pastel();
    //score
    this.score = 0;
  }

  //set the pastel in a random position at the beginning of the game
  setup() {
    this.pastel.setRandomPosition();
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

    this.pastel.draw();

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
      if (this.collisionCheckThief(this.player, thief)) {
        console.log("WATCH OUT FOR THE THINGY");
      }

      // remove the thief if its totally off canvas
      if (thief.x <= -thief.width) {
        this.thiefs.splice(index, 1);
      }
    });

    //if we catch the pastel -> score +1 and new random position
    if (this.collisionCheckPastel(this.player, this.pastel)) {
      this.pastel.setRandomPosition();
      this.score++;
    }
  }

  // checks if there is a collision between the player and thief
  collisionCheckThief(player, thief) {
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

  // checks if there is a collision between the player and pastel
  collisionCheckPastel(player, pastel) {
    const playerTopArea = player.y;
    const playerLeftArea = player.x;
    const playerRightArea = player.x + player.width;
    const playerBottomArea = player.y + player.height;

    const pastelTopArea = pastel.y;
    const pastelLeftArea = pastel.x;
    const pastelRightArea = pastel.x + pastel.width;
    const pastelBottomArea = pastel.y + pastel.height;

    const isTouchingOnLeftpastel = pastelRightArea > playerLeftArea;
    const isTouchingOnBottompastel = pastelTopArea < playerBottomArea;
    const isTouchingOnRightpastel = pastelLeftArea < playerRightArea;
    const isTouchingOnToppastel = pastelBottomArea > playerTopArea;

    return (
      isTouchingOnRightpastel &&
      isTouchingOnToppastel &&
      isTouchingOnBottompastel &&
      isTouchingOnLeftpastel
    );
  }

}
