/*
JavaScript functions file for TPX1

Functions labeled with ** in the comments are copied or adapted from one of the answers at 
https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
*/



// ** convert individual color value from base 10 to base 16 value, 
// inserting a 0 before it if it is only one digit
function componentToHex(colorVal) {
  var hex = colorVal.toString(16);
	if (hex.length == 1) hex = "0" + hex; 
  return hex;
}


// ** uses above function to convert red, green, and blue values into one long hex color string
function rgbToHex(r, g, b) {
	hexColor = componentToHex(r) + componentToHex(g) + componentToHex(b);
  return hexColor; // does NOT include the # hash symbol
}


// ** converts a hex color to RGB values; returns an object with .r, .g, and .b properties
// not going to explain this here; it uses regex encoding and parseInt()
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) };
}


// return a random number from 0 to 255 for use as an R, G, or B color
function randomColorVal() {
	c = Math.floor(Math.random() * 256);
	return c;
}

