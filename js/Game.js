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
    //this "x" is to set the hearts at 10px
    this.x = 10;
    //array of hearts
    this.hearts = [];
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

  //creates the hearts. Hearts are separated 25px from each other. The "x" position is passed to the Heart constructor.
  createHearts(){
    for (let i = 0; this.hearts.length < 3; i++) {
      this.hearts.push(new Heart(this.x));
      this.x += 25;
    }
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
        //remove the thief
        this.thiefs.splice(index, 1);
        //remove one heart
        this.hearts.pop();
        //if there are no more hearts left:
        if (this.hearts.length === 0) {
          noLoop();
          //Shows the button
          button.innerText = "Ouch! The thief stole your campervan!!, play again?";
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
            scoreNumber.innerText = this.score;
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
      this.pastel.setRandomPosition();
      this.score++;
      //show the score on the screen
      scoreNumber.innerText = this.score;
      //if score gets to 5:
      if (this.score === 5) {
        noLoop();
        //Shows the button
        button.innerText = "Well done!! you caught all the custard tarts!!, Play again?";
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
          scoreNumber.innerText = this.score;
          button.parentNode.removeChild(button);
          loop();
        };
      }
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
