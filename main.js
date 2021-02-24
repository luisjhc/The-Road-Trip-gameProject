//Instance with all the info of the game
const game = new Game();
if (game.playerIsLosing === false) {
  losePage.style.display = "none";
}
if (game.playerIsWining === false) {
  winPage.style.display = "none";
}
if (game.playerLevel2 === false) {
  nextLevelPage.style.display = "none";
}
//connect button with game canvas
startButton.addEventListener("click", function (event) {
  startingPage.style.display = "none";
  selectH1Score.style.display = "block";
  game.isRunning = true;
  reggae.play();
});

//Load images
function preload() {
  winImage = loadImage("./images/win.jpg");
  loseImage = loadImage("./images/lose.jpg");
  presentation = loadImage("./images/presentation.jpg");
  backgroundImage = loadImage("./images/lisbon.jpg");
  backgroundImageLevel2 = loadImage("./images/berlin.jpg");
  van = loadImage("./images/car.png");
  thief = loadImage("./images/thief.png");
  pastel = loadImage("./images/pastel.png");
  heart = loadImage("./images/heart.png");
  ouch = loadSound("./sound/ouch.mp3");
  bite = loadSound("./sound/bite.mp3");
  reggae = loadSound("./sound/reggae.mp3");
}

function draw() {
  if (game.isRunning === false) {
    return;
  }
  game.draw();
}

//set up canvas
function setup() {
  createCanvas(WIDTH, HEIGHT);
  game.setup();
  game.createHearts();
}

//checks if we press a key
function keyPressed() {
  game.keyPressed();
}
