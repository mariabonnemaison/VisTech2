'use strict';

var shapes;
var img;

function preload() {
  img = loadImage('./data/swift.png');
  
   shapes = [];
  shapes.push(loadImage('./data/01.svg'));
  shapes.push(loadImage('./data/02.svg'));
  shapes.push(loadImage('./data/03.svg'));
  shapes.push(loadImage('./data/04.svg'));
  shapes.push(loadImage('./data/05.svg'));
  shapes.push(loadImage('./data/06.svg'));
  shapes.push(loadImage('./data/07.svg'));
  shapes.push(loadImage('./data/08.svg'));
  shapes.push(loadImage('./data/09.svg'));
  shapes.push(loadImage('./data/10.svg'));
  shapes.push(loadImage('./data/11.svg'));
  shapes.push(loadImage('./data/12.svg'));
  shapes.push(loadImage('./data/13.svg'));
}
  
function setup() {
  createCanvas(600, 900);
  image(img);
}

function draw() {
  background(255);
  
  
  for (var gridX = 0; gridX < img.width; gridX++) {
    for (var gridY = 0; gridY < img.height; gridY++) {
      // grid position + title size
      var titleWidth = 603 / img.width;
      var titleHeight = 873 / img.height;
      var posX = titleWidth * gridX;
      var posY = titleHeight * gridY;
      
       // get current color
      img.loadPixels();
      var c = img.get(min(gridX, img.width - 1), gridY);
      // greyscale conversion
      var greyscale = round(red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071);
      var gradientToIndex = round(map(greyscale, 0, 255, 0, shapes.length - 1));
      image(shapes[gradientToIndex], posX, posY, titleWidth, titleHeight);
    }
  }
}
function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}

