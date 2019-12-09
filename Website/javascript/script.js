/******************************************************
Project 3
Hazel Thexton, Janet Sun, Joseph Power & Amanda Clement
******************************************************/

///////////// MAP

// Plane position, size, velocity, direction and image
let plane = {
  x : 0,
  y : 0,
  size : 20,
  speed : 8,
  // initial lag
  lag : 2.5,
  // Plane image
  image : 0,
  // Plane rotation
  rotate : 0
}

// area array with relative position, size, and images
let area = [6];

// Asia-Pacific area
area[0] = {
  // relative x, y and size values that will be multiplied by canvas size
  x : 0.656,
  y : 0.39,
  width: 0.247,
  height: 0.517,
  // relative size values for the area label
  labelWidth: 0.23,
  labelHeight: 0.21,
  // visibility of the area images
  visible: false,
  // area-specific lag
  lag: 12,
  // relatives x, y and size values for the area's collision box
  collisionX : 0.656,
  collisionY : 0.45,
  collisionWidth: 0.248,
  collisionHeight: 0.517,
  // area image
  image : 0,
  // area label image
  label : 0
}

// Eurasia area
area[1] = {
  // relative x, y and size values that will be multiplied by canvas size
  x : 0.532,
  y : 0.072,
  width: 0.468,
  height: 0.452,
  // relative size values for the area label
  labelWidth: 0.23,
  labelHeight: 0.21,
  // visibility of the area images
  visible: false,
  // area-specific lag
  lag: 14,
  // relatives x, y and size values for the area's collision box
  collisionX : 0.562,
  collisionY : 0.07,
  collisionWidth: 0.465,
  collisionHeight: 0.35,
  // area image
  image : 0,
  // area label image
  label : 0
}

// Europe area
area[2] = {
  // relative x, y and size values that will be multiplied by canvas size
  x : 0.405,
  y : 0.195,
  width: 0.1472,
  height: 0.303,
  // relative size values for the area label
  labelWidth: 0.23,
  labelHeight: 0.21,
  // visibility of the area images
  visible: false,
  // area-specific lag
  lag: 1,
  // relatives x, y and size values for the area's collision box
  collisionX : 0.402,
  collisionY : 0.195,
  collisionWidth: 0.15,
  collisionHeight: 0.303,
  // area image
  image : 0,
  // area label image
  label : 0
}

// North Africa & Middle East area
area[3] = {
  // relative x, y and size values that will be multiplied by canvas size
  x : 0.444,
  y : 0.49,
  width: 0.223,
  height: 0.138,
  // relative size values for the area label
  labelWidth: 0.23,
  labelHeight: 0.21,
  // visibility of the area images
  visible: false,
  // area-specific lag
  lag: 16,
  // relatives x, y and size values for the area's collision box
  collisionX : 0.442,
  collisionY : 0.49,
  collisionWidth: 0.225,
  collisionHeight: 0.138,
  // area image
  image : 0,
  // area label image
  label : 0
}

// Sub-Saharan Africa area
area[4] = {
  // relative x, y and size values that will be multiplied by canvas size
  x : 0.419,
  y : 0.5,
  width: 0.19,
  height: 0.38,
  // relative size values for the area label
  labelWidth: 0.23,
  labelHeight: 0.21,
  // visibility of the area images
  visible: false,
  // area-specific lag
  lag: 10,
  // relatives x, y and size values for the area's collision box
  collisionX : 0.42,
  collisionY : 0.63,
  collisionWidth: 0.13,
  collisionHeight: 0.3,
  // area image
  image : 0,
  // area label image
  label : 0
}

// Americas area
area[5] = {
  // relative x, y and size values that will be multiplied by canvas size
  x : 0.002,
  y : 0.001,
  width: 0.415,
  height: 0.99,
  // relative size values for the area label
  labelWidth: 0.23,
  labelHeight: 0.21,
  // visibility of the area images
  visible: false,
  // area-specific lag
  lag: 4,
  // relatives x, y and size values for the area's collision box
  collisionX : 0,
  collisionY : 0,
  collisionWidth: 0.4,
  collisionHeight: 0.99,
  // area image
  image : 0,
  // area label image
  label : 0
}

// preload()
//
// Preloads our images
function preload() {
  backgroundImage = loadImage("images/background.png");
  plane.image = loadImage("images/plane.png");
  for (let i = 0; i < 6; i++) {
    area[i].image = loadImage("images/area" + [i] + ".png");
    area[i].label = loadImage("images/label" + [i] + ".png");
  }
}

// centerCanvas()
//
// Centers the canvas on the screen
function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

// setup()
//
// Sets up the basic elements of the map
function setup() {
  var x = (windowWidth) * 0.95;
  var y = x * 0.5587;

  createCanvas(x, y);

  cnv = createCanvas(x - 100, y - 100);
  cnv.style('z-index', '-10');
  centerCanvas();

  setupPlane();
}

// setupPlane()
//
// Initialises plane position at mouse position
function setupPlane() {
  plane.x = mouseX;
  plane.y = mouseY;
}

// draw()
//
// Checks input, updates positions of areas and plane,
// displays the areas, plane and labels.
function draw() {
  background(backgroundImage);

  planeRotation();

  checkOverlap();

  movePlane();

// Displays the areas when it is made visible (by having the mouse over it)
  for (let i = 0; i < 6; i++) {
    if (area[i].visible){
      drawArea(i);
    }
  }

  drawPlane();
}

// planeRotation()
//
// Rotate the plane to the mouse position
function planeRotation() {
  plane.rotate = atan2(mouseY - plane.y, mouseX - plane.x) + 90;
}

// movePlane()
//
// Updates plane position based on mouse position and lag
function movePlane() {
  // Calculate the distance between mouse and plane in X and in Y
  let xDistance = mouseX - plane.x;
  let yDistance = mouseY - plane.y;
  // Add a percentage of the x and y distance to the plane's current (x,y) location
  // based on current lag
  plane.x = plane.x + xDistance/(plane.lag*4);
  plane.y = plane.y + yDistance/(plane.lag*4);
}

// checkOverlap()
//
// Check if the plane overlaps each area to see if it should be "active"
function checkOverlap() {
// Reset visibility to false before each loop
  for (let i = 0; i < 6; i++) {
    area[i].visible = false;
  }
// Check for collision between each area and the plane
  for (let i = 0; i < 6; i++) {
    if(((width*area[i].collisionX < plane.x + plane.size) && (width*area[i].collisionX + width*area[i].collisionWidth > plane.x) &&
    (height*area[i].collisionY + height*area[i].collisionHeight> plane.y) && (height*area[i].collisionY < plane.y + plane.size))){
// If there is an overlap, set the area to visible and set the plane lag to the area's specific lag
      area[i].visible = true;
      plane.lag = area[i].lag;
    }
  }
}

// drawArea()
//
// Draw the area with corresponding label
function drawArea(i) {
  image(area[i].image,width*area[i].x,height*area[i].y, width*area[i].width, height*area[i].height);
  image(area[i].label,mouseX - ((width*area[i].labelWidth)/2),mouseY, width*area[i].labelWidth, height*area[i].labelHeight);
}

// drawPlane()
//
// Draw the plane
function drawPlane() {
  push();
  // Moves the origin to the plane location
  translate(plane.x, plane.y);
  // Rotates the plane around the new origin (so, it rotates on itself)
  rotate(plane.rotate);
  imageMode(CORNER);
  // Displays the plane
  image(plane.image,0,0,plane.size,plane.size * 1.5);
  pop();
}
