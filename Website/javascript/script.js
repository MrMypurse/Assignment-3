/******************************************************
Project 3
Hazel Thexton, Janet Sun, Joseph Power & Amanda Clement
******************************************************/

///////////// MAP
let lag = 2.5;

// Player position, size, velocity, and direction
let player = {
  x : 0,
  y : 0,
  size : 20,
  speed : 8,
  // Player image
  image : 0,
  // Player rotation
  rotate : 0
}

let country = [6];
// country position, size, and image lets
country[0] = {
  x : 0.656,
  y : 0.39,
  width: 0.247,
  height: 0.517,
  labelWidth: 0.2,
  labelHeight: 0.15,
  visible: false,
  lag: 12,
  collisionX : 0.656,
  collisionY : 0.45,
  collisionWidth: 0.248,
  collisionHeight: 0.517,
  // country image
  image : 0,
  label : 0
}

country[1] = {
  x : 0.532,
  y : 0.072,
  width: 0.468,
  height: 0.452,
  labelWidth: 0.2,
  labelHeight: 0.15,
  visible: false,
  lag: 14,
  collisionX : 0.562,
  collisionY : 0.07,
  collisionWidth: 0.465,
  collisionHeight: 0.35,
  // country image
  image : 0,
  label : 0
}

country[2] = {
  x : 0.405,
  y : 0.195,
  width: 0.1472,
  height: 0.303,
  labelWidth: 0.2,
  labelHeight: 0.15,
  visible: false,
  lag: 1,
  collisionX : 0.402,
  collisionY : 0.195,
  collisionWidth: 0.15,
  collisionHeight: 0.303,
  // country image
  image : 0,
  label : 0
}

country[3] = {
  x : 0.444,
  y : 0.49,
  width: 0.223,
  height: 0.138,
  labelWidth: 0.2,
  labelHeight: 0.15,
  visible: false,
  lag: 16,
  collisionX : 0.442,
  collisionY : 0.49,
  collisionWidth: 0.225,
  collisionHeight: 0.138,
  // country image
  image : 0,
  label : 0
}

country[4] = {
  x : 0.419,
  y : 0.5,
  width: 0.19,
  height: 0.38,
  labelWidth: 0.2,
  labelHeight: 0.15,
  visible: false,
  lag: 10,
  collisionX : 0.42,
  collisionY : 0.63,
  collisionWidth: 0.13,
  collisionHeight: 0.3,
  // country image
  image : 0,
  label : 0
}

country[5] = {
  x : 0.002,
  y : 0.001,
  width: 0.415,
  height: 0.99,
  labelWidth: 0.2,
  labelHeight: 0.15,
  visible: false,
  lag: 4,
  collisionX : 0,
  collisionY : 0,
  collisionWidth: 0.4,
  collisionHeight: 0.99,
  // country image
  image : 0,
  label : 0
}

// preload()
//
// Preloads our sound and images
function preload() {
  backgroundImage = loadImage("images/background.png");
  player.image = loadImage("images/player.png");
  for (let i = 0; i < 6; i++) {
    country[i].image = loadImage("images/country" + [i] + ".png");
    country[i].label = loadImage("images/label" + [i] + ".png");
  }
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  var x = (windowWidth) * 0.95;
  var y = x * 0.5587;

  createCanvas(x, y);

  cnv = createCanvas(x - 100, y - 100);
  cnv.style('z-index', '-10');
  centerCanvas();

  setupPlayer();
}

// setupPlayer()
//
// Initialises player position
function setupPlayer() {
  player.x = mouseX;
  player.y = mouseY;
}

// draw()
//
// While the game is active, checks input
// updates positions of country and player,
// displays the two agents.
function draw() {

  background(backgroundImage);

  playerRotation();

  checkOverlap();

  movePlayer();

  for (let i = 0; i < 6; i++) {
    if (country[i].visible){
      drawcountry(i);
    }
  }

  drawPlayer();

  //  gameText();
}

// textFormat()
//
// Text size, color, etc.
function textFormat() {
  textSize(40);
  fill(255);
  stroke(50,100,255);
  strokeWeight(4);
}

// playerRotation()
//
// Rotate the airplane to the mouse position
function playerRotation() {
  player.rotate = atan2(mouseY - player.y, mouseX - player.x) + 90;
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {

  // Calculate the distance in X and in Y
  let xDistance = mouseX - player.x;
  let yDistance = mouseY - player.y;
  // Add 1/50th of the x and y distance to the peanut image's current (x,y) location
  player.x = player.x + xDistance/(lag*4);
  player.y = player.y + yDistance/(lag*4);

  console.log(lag);

}

// checkOverlap()
//
// Check if the player overlaps the country and updates health of both
function checkOverlap() {

  for (let i = 0; i < 6; i++) {
    country[i].visible = false;
  }

  for (let i = 0; i < 6; i++) {
    // Check if it's an overlap
    if(((width*country[i].collisionX < player.x + player.size) && (width*country[i].collisionX + width*country[i].collisionWidth > player.x) &&
    (height*country[i].collisionY + height*country[i].collisionHeight> player.y) && (height*country[i].collisionY < player.y + player.size))){
      country[i].visible = true;
      lag = country[i].lag;
    }

  }

}

// drawcountry()
//
// Draw the country
function drawcountry(i) {

  image(country[i].image,width*country[i].x,height*country[i].y, width*country[i].width, height*country[i].height);
  image(country[i].label,mouseX - ((width*country[i].labelWidth)/2),mouseY, width*country[i].labelWidth, height*country[i].labelHeight);
}

// drawPlayer()
//
// Draw the player with alpha based on health
function drawPlayer() {
  push();
  // Moves the origin to the target image location
  translate(player.x, player.y);
  // Rotates the image around the new origin (so, it rotates on itself)
  rotate(player.rotate);
  imageMode(CORNER);
  image(player.image,0,0,player.size,player.size * 1.5);
  pop();
}
