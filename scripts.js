// The cursor position
var cursorX = 0, cursorY = 0;

// The cupid element
var cupid = document.getElementById("cupid");

// The heart that follows the cursor very closely and quickly
var heart = document.getElementById("heart");

// The position of the cupid element - initializing values
var cupidX = 0, cupidY = 0;

// The position of the heart element - initializing values
var heartX = 0, heartY = 0;

// Each letter in the title
var titleLetter = document.querySelectorAll("h1 span");

var touching;

// Variables that we will need later on
var opposite; // this will be the length of the "opposite" side of our imaginary triangle
var adjacent; // this will be the length of the "adjacent" side of our imaginary triangle
var angle; // this will be the angle of the vertex of our imaginary triangle
var imgSrc; // this will be the source of the background image of the cupid


// check if two elements are overlapping
function collision(div1, div2) {
  var x1 = div1.offsetLeft;
  var y1 = div1.offsetTop;
  var h1 = div1.clientHeight;
  var w1 = div1.clientWidth;
  var b1 = y1 + h1;
  var r1 = x1 + w1;
  var x2 = div2.offsetLeft;
  var y2 = div2.offsetTop;
  var h2 = div2.clientHeight;
  var w2 = div2.clientWidth;
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
    touching = false;
    return false
  } else {
    touching = true;
    caughtUp();
  }
}

// add the animation class to the heart
function caughtUp() {

    heart.className = "caughtup";
  
}

// add the hover class to the letters
// and remove it after 400 milliseconds
function handleHover(element) {
  element.className = "up";

  var self = element;

  var timeout = window.setTimeout(function(){
    element.className = "";
  }, 400);

}

// DOCUMENT READY
document.addEventListener("DOMContentLoaded", function(event) { 

  // Adding the event listener for the mousemove
  document.onmousemove = function(e){
    cursorX = e.pageX; // get the coordinate of the cursor on the x axis
    cursorY = e.pageY; // get the coordinate of the cursor on the y axis
  };

  // Make the heart follow the cursor
  var heartLoop = setInterval(function(){
    
    // Determine the new trajectory for the heart
    heartX = heartX + ((cursorX - heartX) / 2 ); // adjust x value by difference between cursor and heart
    heartY = heartY + ((cursorY - heartY) / 2 ); // adjust y value by difference between cursor and heart
    
    heart.style.left = heartX + "px"; // set left css property to new x value
    heart.style.top = heartY + "px"; // set top property to new y value
    
    if (touching == false) {
      heart.className -= " caughtUp";
    }

  }, 5); // run every 5 milliseconds

  // The set interval function that checks where our cupid is and where it should be, based on where the cursor is
  var cupidLoop = setInterval(function(){
    
    // Determine the new trajectory
    cupidX = cupidX + ((cursorX - cupidX) / 25);
    cupidY = cupidY + ((cursorY - cupidY) / 25);

    // Get the coordinates of the center of the cupid
    // so that we can use it to calculate the angle
    var cupidCenterX = cupidX + (cupid.clientWidth / 2);
    var cupidCenterY = cupidY + (cupid.clientHeight / 2);
    
    // Determine the new angle
    opposite = Math.abs(cursorY - cupidCenterY);
    adjacent = Math.abs(cursorX - cupidCenterX);
    angle = Math.atan(opposite/adjacent)/(Math.PI/180);
    
    if (cursorX > cupidCenterX && cursorY < cupidCenterY) {
      if (angle < 20) {
        
        // RIGHT
        imgSrc = "url('./images/cip_cupid_right.png')";
        
      } else if (angle > 70) {
        
        // UP
        imgSrc = "url('./images/cip_cupid_up.png')";

      } else {
        // UP RIGHT
        imgSrc = "url('./images/cip_cupid_up_right.png')";
      }
      
    } else if (cursorX > cupidCenterX && cursorY > cupidCenterY) {
      if (angle < 20) {
        
        // RIGHT
        imgSrc = "url('./images/cip_cupid_right.png')";

      } else if (angle > 70) {
        
        // DOWN
        imgSrc = "url('./images/cip_cupid_down.png')";
      } else {
        
        // DOWN RIGHT
        imgSrc = "url('./images/cip_cupid_down_right.png')";
      }
    } else if (cursorX < cupidCenterX && cursorY > cupidCenterY) {
      if (angle < 20) {
        
        // LEFT
        imgSrc = "url('./images/cip_cupid_left.png')";

      } else if (angle > 70) {
        
        // DOWN
        imgSrc = "url('./images/cip_cupid_down.png')";

      } else {
        
        // DOWN LEFT
        imgSrc = "url('./images/cip_cupid_down_left.png')";
      }
    } else if (cursorX < cupidCenterX && cursorY < cupidCenterY) {
      if (angle < 20) {
        
        // LEFT
        imgSrc = "url('./images/cip_cupid_left.png')";

      } else if (angle > 70) {
        
        // UP
        imgSrc = "url('./images/cip_cupid_up.png')";

      } else {
        
        // UP LEFT
        imgSrc = "url('./images/cip_cupid_up_left.png')";

      }

    }

    // move the cupid
    cupid.style.left = cupidX + "px";
    cupid.style.top = cupidY + "px"; 
    cupid.style.backgroundImage = imgSrc;
    
    // call the collision function
    collision(cupid, heart);
    
  }, 30);

  // add event listeners to letters
  for (var i = 0; i < titleLetter.length; i++) {
    titleLetter[i].addEventListener("mouseenter", function() {
      handleHover(this);
    });
  }

}); // end of document ready
