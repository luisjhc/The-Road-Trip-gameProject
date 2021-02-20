//Instance with all the info of the game
const game = new Game();

//connect button with game canvas
startButton.addEventListener("click", function (event) {
  startingPage.style.display = "none";
  yourScore.innerHTML = "Your Score: ";
  scoreNumber.innerHTML = "0";
  game.isRunning = true;
  //gameMusic.play();
});

//Load images
function preload() {
  presentation = loadImage("./images/presentation.jpg")
  backgroundImage = loadImage("./images/lisbon.jpg");
  van = loadImage("./images/car.png");
  thief = loadImage("./images/thief.png");
  pastel = loadImage("./images/pastel.png");
  heart = loadImage("./images/heart.png");
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
