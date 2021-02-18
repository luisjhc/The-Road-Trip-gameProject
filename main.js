//Instance with all the info of the game
const game = new Game();

//Load images
function preload() {
  backgroundImage = loadImage("images/lisbon.jpg");
  van = loadImage("/images/car.png");
  ladron = loadImage("/images/thief.jpg");
}

function draw() {
  game.draw();
}

//set up canvas
function setup() {
  createCanvas(WIDTH, HEIGHT);
}

//checks if we press a key
function keyPressed() {
  game.keyPressed();
}
