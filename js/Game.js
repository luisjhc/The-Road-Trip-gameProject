//class that control the logic of the game
class Game {
  constructor() {
    this.isRunning = false;
    //calling the background
    this.background = new Background();
    //empty array of thiefs
    this.thiefs = [];
    //calling the player
    this.player = new Player();
    //calling the pastel
    this.pastel = new Pastel();
    this.win = new Win();
    this.lose = new Lose();
    //this "x" is to set the hearts at 10px
    this.x = 10;
    //array of hearts
    this.hearts = [];
    //score
    this.score = 0;
    this.playerIsLosing = false;
  }

  //set the pastel in a random position at the beginning of the game
  setup() {
    this.pastel.setRandomPosition();
  }

  //you can go to player class for more info about this function
  keyPressed() {
    this.player.keyPressed();
  }

  //creates the hearts. Hearts are separated 25px from each other. The "x" position is passed to the Heart constructor.
  createHearts() {
    for (let i = 0; this.hearts.length < 3; i++) {
      this.hearts.push(new Heart(this.x));
      this.x += 25;
    }
  }

  playerLose() {
    this.playerIsLosing = true;
    clear();
    this.lose.draw();
    noLoop();
    loseButton.onclick = () => {
      this.pastel.setRandomPosition();
      this.player.resetPlayer();
      this.thiefs = [];
      this.hearts = [];
      this.x = 10;
      this.createHearts();
      this.score = 0;
      selectspan.innerText = this.score;
      //loseButton.parentNode.removeChild(loseButton);
      losePage.style.display = "none";
      loop();
    };
  }

  playerWin() {
    clear();
    this.win.draw();
    noLoop();
  }

  //draw the game
  draw() {
    // clears out the canvas at the beggining of every loop
    clear();
    // draws the background
    this.background.draw();
    // draws the player
    this.player.draw();
    // draws the pastel
    this.pastel.draw();
    //draws hearts
    this.hearts.forEach((heart) => {
      heart.draw();
    });

    // frameCount is always counting + 1 on every loop of the function draw
    // frame 60/s. 90 -> Every 1,5s push a new thief on the array
    if (frameCount % 90 === 0) {
      this.thiefs.push(new Thief());
    }
    // array of thiefs. for every single thief in the array:
    this.thiefs.forEach((thief, index) => {
      // draw it
      thief.draw();

      //checks if there is a collision with a thief
      if (this.collisionCheckThief(this.player, thief)) {
        ouch.play();
        this.thiefs.splice(index, 1);
        //thief.isColliding = true;
        //remove one heart
        this.hearts.pop();
        //if there are no more hearts left:
        if (this.hearts.length === 0) {
          noLoop();
          this.playerLose();
          //image(lose, 0, 0, WIDTH, HEIGHT);
          //Shows the button
          // button.innerText =
          //   "Ouch! The thief stole your campervan!!, play again?";
          // document.body.appendChild(button);
          //When the button is pressed, restart the game creating the hearts, set score to 0, and remove the button
          button.onclick = () => {
            this.pastel.setRandomPosition();
            this.player.resetPlayer();
            this.thiefs = [];
            this.hearts = [];
            this.x = 10;
            this.createHearts();
            this.score = 0;
            selectspan.innerText = this.score;
            button.parentNode.removeChild(button);
            loop();
          };
        }
      }

      // remove the thief if its totally off canvas
      if (thief.x <= -thief.width) {
        this.thiefs.splice(index, 1);
      }
    });

    //if we catch the pastel -> score +1 and new random position for the pastel
    if (this.collisionCheckPastel(this.player, this.pastel)) {
      bite.play();
      this.pastel.setRandomPosition();
      this.score++;
      selectspan.innerText = this.score;
      //show the score on the screen
      //if score gets to 5:
      if (this.score === 5) {
        noLoop();
        this.playerWin();
        //image(win, 0, 0, WIDTH, HEIGHT);
        //Shows the button
        button.innerText =
          "Well done!! you caught all the custard tarts!!, Play again?";
        document.body.appendChild(button);
        //When the button is pressed, restart the game creating the hearts, set score to 0, and remove the button
        button.onclick = () => {
          this.pastel.setRandomPosition();
          this.player.resetPlayer();
          this.thiefs = [];
          this.hearts = [];
          this.x = 10;
          this.createHearts();
          this.score = 0;
          selectspan.innerText = this.score;
          button.parentNode.removeChild(button);
          loop();
        };
      }
    }
  }

  // checks if there is a collision between the player and thief
  collisionCheckThief(player, thief) {
    //   if (thief.isColliding) {
    //     return false;
    //   }
    //   if (player.x + player.width < thief.x) {
    //     return false;
    //   }

    //   if (thief.x + thief.width < player.x) {
    //     return false;
    //   }

    //   if (player.y > thief.y + thief.height) {
    //     return false;
    //   }

    //   if (thief.y > player.y + player.height) {
    //     return false;
    //   }
    //   return true;
    // }
    const playerTopArea = player.y;
    const playerLeftArea = player.x;
    const playerRightArea = player.x + player.width;
    const playerBottomArea = player.y + player.height;

    const thiefTopArea = thief.y;
    const thiefLeftArea = thief.x;
    const thiefRightArea = thief.x + thief.width;
    const thiefBottomArea = thief.y + thief.height;

    const isTouchingOnLeftpastel = thiefRightArea > playerLeftArea;
    const isTouchingOnBottompastel = thiefTopArea < playerBottomArea;
    const isTouchingOnRightpastel = thiefLeftArea < playerRightArea;
    const isTouchingOnToppastel = thiefBottomArea > playerTopArea;

    return (
      isTouchingOnRightpastel &&
      isTouchingOnToppastel &&
      isTouchingOnBottompastel &&
      isTouchingOnLeftpastel
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
