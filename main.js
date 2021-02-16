//Instance with all the info of the game
const game = new Game();

//Load images
function preload() {
  backgroundImage = loadImage("images/lisbon.jpg");
  van = loadImage("/images/car.png");
}

function draw() {
  game.draw();
}

//set up canvas
function setup() {
  createCanvas(WIDTH, HEIGHT);
}

//checks if space bar is pressed
function keyPressed() {
  game.keyPressed();
}
