/**
 * Lab Goal: This lab was designed to teach you
 * how to find collisions with many objects
 * 
 * Lab Description: Detect Collision
 */

// Initialize variables
var bg1 = {x:0, y:0, w:320, h:450, s:6, img:"bg1"};
var bg2 = {x:-320, y:0, w:320, h:450, s:6, img:"bg2"};
var rocket = {x:0, y:0, w:50, h:100, s:10, img:"rocket"};
var A1 = {x:randomNumber(-10, 300), y:randomNumber(-50,-100), w:50, h:50, s:10, img:"A1"};
var A2 = {x:randomNumber(-10,300), y:randomNumber(-50,-100), w:50, h:50, s:10, img:"A2"};
var A3 = {x:randomNumber(-10,300), y:randomNumber(-50,-100), w:50, h:50, s:10, img:"A3"};
var score = 0;
var time = 0;
var sec = 0;
var min = 0;
var maxScore = 30;


//start game
onEvent("playButton", "click", function(){
  hideElement("playButton");
  drawBackground();
  makeAsteroid();
  makeRocket();
  timedLoop(200,moveAsteriods);
});


function drawBackground(){
  image(bg1.img, "assets/6062b.png");
  image(bg2.img, "assets/6062a.png");
  textLabel("score", "SCORE: " + score);
  textLabel("time", "TIME: " + time);
  setPosition("time", 200, 10, 100, 25);
  setPosition("score", 10, 10, 100, 25);
  setProperty(bg1.img, "fit", "cover");
  setProperty(bg2.img, "fit", "cover");
  

}
function scrollBg(){
  bg1.x += bg1.s;
  bg2.x += bg2.s;
  if (bg1.x>=320){
  bg1.x=-bg1.w;
  bg2.x=0;
  
  }
  setPosition(bg1.img, bg1.x, bg1.y, bg1.w, bg1.h);
  setPosition(bg2.img, bg2.x, bg2.y, bg2.w, bg2.h);
}

function makeAsteroid(){
  image(A1.img, "assets/rock.png");
  image(A2.img, "assets/meteor.png");
  image(A3.img, "assets/meteor2.png");
  setPosition("A1", A1.x, A1.y, A1.w, A1.h);
  setPosition("A2", A2.x, A2.y, A2.w, A2.h);
  setPosition("A3", A3.x, A3.y, A3.w, A3.h);
}

function makeRocket(){
  image(rocket.img, "assets/rocket.gif");
  setPosition(rocket.img, rocket.x, rocket.y, rocket.w, rocket.h);
}

//rocket movement
onEvent("screen1","keydown", function(event) {
  if(event.key == "Left"){
      rocket.x -= rocket.s; 
    }
  if(event.key === "Right"){
      rocket.x += rocket.s; 
  }
  if(event.key === "Up"){
      rocket.y -= rocket.s;
  }
  if(event.key === "Down"){
      rocket.y += rocket.s;
    }
    setPosition(rocket.img, rocket.x, rocket.y, rocket.w, rocket.h);
    }  
    
  );
  
   //set position of asteriods
  function asteriodPosition(){
    setPosition("A1", A1.x, A1.y, 50, 50);
    setPosition("A2", A2.x, A2.y, 50, 50);
    setPosition("A3", A3.x, A3.y, 50, 50);
  }
  
  function moveAsteriods(){
    A1.y+=A1.s;
    A2.y+=A2.s;
    A3.y+=A3.s;
    asteriodPosition();
    scrollBg();
    
    
  //check for collision
  checkCollision(A1, rocket);
  checkCollision(A2, rocket);
  checkCollision(A3, rocket);
  
  //wrap asteriods
  if(A1.y>450){
    A1.x = randomNumber(0,280);
    A1.y = randomNumber(-50,-100);
  }
  if(A2.y>450){
    A2.x = randomNumber(0,280);
    A2.y = randomNumber(-50,-100);
  }
  if(A3.y>450){
    A3.x = randomNumber(0,280);
    A3.y = randomNumber(-50,-100);
  }
    

  
  
  //update time
  sec = Math.floor(time/10)%60;
  min = Math.floor(time/600)%60;
  time+=1;
  setText("time", "TIME: ", (min < 10 ? "0":"") + min + ":" + (sec < 10 ? "0" : "") + sec);
  
  }
  
  function startOver(obj1){
    obj1.y = randomNumber(-50,-20);
    obj1.x = randomNumber(10,300);
    obj1.s = randomNumber(3,8);
    setPosition(obj1.img, obj1.x, obj1.y, obj1.w, obj1.h);
  }
  
  function checkCollision(obj1, obj2){
    var xOv=Math.max(0, Math.min(obj1.x+obj1.w, obj2.x+obj2.w)-Math.max(obj1.x, obj2.x)+1);
    var yOv=Math.max(0, Math.min(obj1.y+obj1.h, obj2.y+obj2.h)-Math.max(obj1.y, obj2.y)+1);
    if( xOv>0 && yOv>0 && typeof(obj1)!=typeof(obj2)){
      startOver(obj1);
      score+=2;
      setText("score", "SCORE: " + score);
      asteriodPosition();
      if (score>=maxScore){
      stopTimedLoop();
    }
  }
  }
  
  
  
  



//end game


