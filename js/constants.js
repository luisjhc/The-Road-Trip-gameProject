//Width of the canvas
const WIDTH = 1000;

//Heigth of the canvas
const HEIGHT = 350;

//This is used to display the score
const scoreNumber = document.querySelector("h1 span");
const yourScore = document.querySelector("h1");

const startingPage = document.querySelector(".startingPage");
const startButton = document.querySelector(".startButton");

const button = document.createElement("button");

//variables for images. You can check them in main.js, function preload().
let backgroundImage;
let van;
let ladron;
let pastel;
let heart;
