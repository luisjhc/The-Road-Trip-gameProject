//class that control the logic of the game
class Game {
  constructor() {
    this.isRunning = false;
    //calling the background
    this.background = new Background();
    this.backgroundLvl2 = new BackgroundLvl2();
    //empty array of thiefs
    this.thiefs = [];
    //calling the player
    this.player = new Player();
    //calling the pastel
    this.pastel = new Pastel();
    this.pretzel = new Pretzel();
    this.win = new Win();
    this.lose = new Lose();
    this.nextLevel = new NextLevel();
    //this "x" is to set the hearts at 10px
    this.x = 10;
    //array of hearts
    this.hearts = [];
    //score
    this.score = 0;
    this.totalScore = 0;
    this.playerIsLosing = false;
    this.playerIsWining = false;
    this.playerLevel2 = false;
    this.level = 1;
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
    selectH1Score.style.display = "none";
    selectH1TotalScore.style.display = "block";
    selectSpanTotalScore.innerText = this.totalScore;
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
      this.totalScore = 0;
      this.level = 1;
      losePage.style.display = "none";
      this.playerIsLosing = false;
      selectSpanScore.innerText = this.score;
      selectH1Score.style.display = "block";
      selectH1TotalScore.style.display = "none";
      loop();
    };
  }

  playerWin() {
    clear();
    this.playerIsWining = true;
    selectH1Score.style.display = "none";
    selectH1TotalScore.style.display = "block";
    selectSpanTotalScore.innerText = this.totalScore;
    this.win.draw();
    noLoop();
    winButton.onclick = () => {
      this.pastel.setRandomPosition();
      this.player.resetPlayer();
      this.thiefs = [];
      this.hearts = [];
      this.x = 10;
      this.createHearts();
      this.score = 0;
      this.totalScore = 0;
      this.level = 1;
      winPage.style.display = "none";
      this.playerIsWining = false;
      selectSpanScore.innerText = this.score;
      selectH1Score.style.display = "block";
      selectH1TotalScore.style.display = "none";
      loop();
    };
  }

  playerNextLevel() {
    clear();
    this.playerLevel2 = true;
    selectH1Score.style.display = "block";
    this.nextLevel.draw();
    noLoop();
    nextLevelButton.onclick = () => {
      this.pretzel.setRandomPosition();
      this.player.resetPlayer();
      this.thiefs = [];
      this.hearts = [];
      this.x = 10;
      this.createHearts();
      this.score = 0;
      this.level = 2;
      nextLevelPage.style.display = "none";
      this.playerLevel2 = false;
      selectSpanScore.innerText = this.score;
      selectH1Score.style.display = "block";
      selectH1TotalScore.style.display = "none";
      loop();
    };
  }

  //draw the game
  draw() {
    // clears out the canvas at the beggining of every loop
    clear();
    // draws the background
    this.background.draw();
    if (this.level === 2) {
      clear();
      this.backgroundLvl2.draw();
    }
    // draws the player
    this.player.draw();
    // draws the pastel
    if (this.level === 1) {
      this.pastel.draw();
    }
    if (this.level === 2) {
      this.pretzel.draw();
    }
    //draws hearts
    this.hearts.forEach((heart) => {
      heart.draw();
    });

    // frameCount is always counting + 1 on every loop of the function draw
    // frame 60/s. 90 -> Every 1,5s push a new thief on the array
    if (frameCount % 90 === 0) {
      this.thiefs.push(new Thief());
    }
    if (this.level === 2) {
      if (frameCount % 60 === 0) {
        this.thiefs.push(new Thief());
      }
    }
    // array of thiefs. for every single thief in the array:
    this.thiefs.forEach((thief, index) => {
      // draw it
      thief.draw();

      //checks if there is a collision with a thief
      if (this.collisionCheckThief(this.player, thief)) {
        ouch.play();
        this.thiefs.splice(index, 1);
        //remove one heart
        this.hearts.pop();
        //if there are no more hearts left:
        if (this.hearts.length === 0) {
          noLoop();
          this.playerLose();
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
      this.totalScore++;
      selectSpanScore.innerText = this.score;
      //if score gets to 5:
      if (this.score === 5 && this.level === 2) {
        noLoop();
        this.playerWin();
      }
      if (this.score === 5 && this.level === 1) {
        this.playerNextLevel();
      }
    }

    if (this.collisionCheckPretzel(this.player, this.pretzel)) {
      bite.play();
      this.pretzel.setRandomPosition();
      this.score++;
      this.totalScore++;
      selectSpanScore.innerText = this.score;
      //if score gets to 5:
      if (this.score === 5 && this.level === 2) {
        noLoop();
        this.playerWin();
      }
      if (this.score === 5 && this.level === 1) {
        this.playerNextLevel();
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

    const isTouchingOnLeftThief = thiefRightArea > playerLeftArea;
    const isTouchingOnBottomThief = thiefTopArea < playerBottomArea;
    const isTouchingOnRightThief = thiefLeftArea < playerRightArea;
    const isTouchingOnTopThief = thiefBottomArea > playerTopArea;

    return (
      isTouchingOnRightThief &&
      isTouchingOnTopThief &&
      isTouchingOnBottomThief &&
      isTouchingOnLeftThief
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

  collisionCheckPretzel(player, pretzel) {
    const playerTopArea = player.y;
    const playerLeftArea = player.x;
    const playerRightArea = player.x + player.width;
    const playerBottomArea = player.y + player.height;

    const pretzelTopArea = pretzel.y;
    const pretzelLeftArea = pretzel.x;
    const pretzelRightArea = pretzel.x + pretzel.width;
    const pretzelBottomArea = pretzel.y + pretzel.height;

    const isTouchingOnLeftPretzel = pretzelRightArea > playerLeftArea;
    const isTouchingOnBottomPretzel = pretzelTopArea < playerBottomArea;
    const isTouchingOnRightPretzel = pretzelLeftArea < playerRightArea;
    const isTouchingOnTopPretzel = pretzelBottomArea > playerTopArea;

    return (
      isTouchingOnRightPretzel &&
      isTouchingOnTopPretzel &&
      isTouchingOnBottomPretzel &&
      isTouchingOnLeftPretzel
    );
  }
}
