/*
JavaScript main file for TPX1
- Relies on the file tpx1-functions.js for some functions.
*/


/* generic color swatch object constructor
   receives 4 arguments:
	 - sid = string of the HTML/CSS ID of the associated swatch element
	 - r = number from 0-255 for the color's red value; defaults to null
	 - g = number from 0-255 for the color's green value; defaults to null
	 - b = number from 0-255 for the color's blue value; defaults to null
*/
function ColorSwatch(sid, r, g, b) {

  // the HTML/CSS ID of this swatch element, as a string
  this.swatchID = sid;

  // set this object's r/g/b values to the passed or randomized values
  this.red = r;
  this.green = g;
  this.blue = b;

  // object method to display this object's color in the associated swatch ID
  this.displaySwatch = function() {

    // find the HTML element
    swatchObj = document.getElementById(this.swatchID);

    // convert the three R/G/B values of 0-255 into a hex value using the functions above
    swatchHex = rgbToHex(this.red, this.green, this.blue);

    // update the background color of this swatch
    swatchObj.style.backgroundColor = "#" + swatchHex;

    // find the inner <p> tag and update it to contain the hex code
    swatchText = document.querySelector("#" + this.swatchID + " p");
    swatchText.innerHTML = "#" + swatchHex;

    // add the hex code to the URL as the location hash, thus replacing previous one
    //console.log("test: " + swatchHex);
    //location.hash = swatchHex;

    // if the average of the three R/G/B values is under 128, make the hex text white instead of black
    colorAvg = (this.red + this.green + this.blue) / 3;
    if (colorAvg < 128) swatchText.classList.add("lite");
    else swatchText.classList.remove("lite");

  } // end this.displaySwatch method

  // object method to randomize the R, G, and B values, then re-display
  this.randomColor = function() {
    this.red = randomColorVal();
    this.green = randomColorVal();
    this.blue = randomColorVal();
    this.displaySwatch();
    //console.log(this.red);
    return this;
  }

  // object method to lighten the color
  this.lightenColor = function() {
    // TPX1: insert code to lighten the color by increasing the R, G, and B values and then re-displaying
    if (this.red <= 235) {
      this.red += 20;
    } else {
      this.red = 255;
    }
    if (this.green <= 235) {
      this.green += 20;
    } else {
      this.green = 255;
    }
    if (this.blue <= 235) {
      this.blue += 20;
    } else {
      this.blue = 255;
    }
    this.displaySwatch();
    //console.log(this.red);
    return this;
  }

  // object method to darken the color
  this.darkenColor = function() {
    // TPX1: insert code to darken the color by decreasing the R, G, and B values and then re-displaying
    if (this.red >= 20) {
      this.red -= 20;
    } else {
      this.red = 0;
    }
    if (this.green >= 20) {
      this.green -= 20;
    } else {
      this.green = 0;
    }
    if (this.blue >= 20) {
      this.blue -= 20;
    } else {
      this.blue = 0;
    }
    this.displaySwatch();
    return this;
  }

} // end Colorswatch object constructor






// set up the page when the window loads
window.onload = function() {

  // get the URL # hash value, if there is one
  urlHash = location.hash;

  //split string with the dash
  urlHex = urlHash.split("-");
  console.log("Passed hash: " + urlHex[0] + "-" + urlHex[1]);

  // if the hash is not empty, convert it to R, G, and B values,
  // otherwise set the colors randomly
  //swatch 1
  if (urlHex[0] != "" && urlHex != "") {
    urlHexConverted = hexToRgb(urlHex[0]); // function returns an object
    passedRed1 = urlHexConverted.r;
    passedGreen1 = urlHexConverted.g;
    passedBlue1 = urlHexConverted.b;
  } else {
    passedRed1 = randomColorVal();
    passedGreen1 = randomColorVal();
    passedBlue1 = randomColorVal();
  }
  //swatch 2
  if (urlHex[1] != "" && urlHex != "") {
    urlHexConverted = hexToRgb(urlHex[1]); // function returns an object
    passedRed2 = urlHexConverted.r;
    passedGreen2 = urlHexConverted.g;
    passedBlue2 = urlHexConverted.b;
  } else {
    passedRed2 = randomColorVal();
    passedGreen2 = randomColorVal();
    passedBlue2 = randomColorVal();
  }

  //function to set anchor or URL to swatchHex
  function updateURL(swatchInput1, swatchInput2) {

    // convert the three R/G/B values of 0-255 into a hex value using the functions above
    swatch1 = rgbToHex(swatchInput1.red, swatchInput1.green, swatchInput1.blue);
    swatch2 = rgbToHex(swatchInput2.red, swatchInput2.green, swatchInput2.blue);

    // add the hex code to the URL as the location hash, thus replacing previous one
    console.log("test: " + swatchHex);
    location.hash = swatch1 + "-" + swatch2;
    console.log("location hash: " + location.hash);
  }//end updateURL function

  // make new Colorswatch with a specific ID and R, G, B values, then display it
  Swatch1 = new ColorSwatch("colorSwatch1", passedRed1, passedGreen1, passedBlue1);
  Swatch1.displaySwatch();

  Swatch2 = new ColorSwatch("colorSwatch2", passedRed2, passedGreen2, passedBlue2);
  Swatch2.displaySwatch();

  //initial update url after 
  updateURL(Swatch1, Swatch2);

  // attach an onclick event listener to randomize colors
  document.getElementById("colorSwatch1").onclick = function() {
    Swatch1.randomColor();
    updateURL(Swatch1, Swatch2);
  }
  document.getElementById("colorSwatch2").onclick = function() {
    Swatch2.randomColor();
    updateURL(Swatch1, Swatch2);
  }

  // attach a function to the keydown event trigger for the whole window
  // https://keycode.info is a useful reference for keyCode values
  document.onkeydown = function(event) {
    k = event.keyCode; // check the ASCII value of the keypress
    if (k == 32) {
      console.log("key: space");
      //console.log("key: space" + Swatch1 + "-" + Swatch2);
      Swatch1 = Swatch1.randomColor();
      Swatch2 = Swatch2.randomColor();
    } else if (k == 38) {
      console.log("key: up arrow"); // TPX1: fill in that method
      Swatch1 = Swatch1.lightenColor();
      Swatch2 = Swatch2.lightenColor(); 
      updateURL(Swatch1, Swatch2);
    } else if (k == 40) {
      console.log("key: down arrow"); // TPX1: fill in that method
      Swatch1 = Swatch1.darkenColor();
      Swatch2 = Swatch2.darkenColor(); 
      updateURL(Swatch1, Swatch2);
    }
    
  } // end document.onkeydown function

} // end window.onload
