var path,main, numz, dist2, pinks, yellows, reds, gamo;
var pathImg,main1,main_collided, pink1, pink_collided, yellow1, yellow_collided, pin, yello, re, red1, red_collided, p, y, r, obwan, obn, ob1, ob2, ob3, numb, obs;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  bell = loadSound("sound/bell.mp3")
  pathImg = loadImage("Road.png");
  main1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  main_collided= loadAnimation("mainPlayer3.png");
  pink1= loadAnimation("opponent1.png", "opponent2.png")
  pink_collided= loadAnimation("opponent3.png")
  yellow1= loadAnimation("opponent4.png", "opponent5.png")
  yellow_collided= loadAnimation("opponent6.png")
  red1= loadAnimation("opponent7.png", "opponent8.png")
  red_collided= loadAnimation("opponent9.png")
  game= loadImage("gameOver.png")
}

function setup(){
createCanvas(500,300);
obn = 0
p=0
y=0
r=0
dist2 = 0
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
gamo = createSprite(250, 115, 10, 10)
gamo.addImage(game)
gamo.scale = 0.6
//creating boy running
main=createSprite(70,150,20,20);
main.addAnimation("SahilRunning", main1);
main.addAnimation("SahilCollided", main_collided)
main.scale=0.06;
pin=createGroup()
yello=createGroup()
re=createGroup()
obs=createGroup()
}

function draw() {
  numz = Math.round(random(0.5,3.49))
  background(0)
  if (path.velocityX < 101){
    path.velocityX = -(6 + 2 * dist2/150);
  }
  else{
    path.velocityX=100
  }
  drawSprites();
  textSize(20);
  fill("lime");
  stroke("cyan");
  strokeWeight(2);
  text("Distance: "+ distance,350,30);
  dist2 = dist2 + Math.round(getFrameRate()/50)
  if(gameState===PLAY){
   gamo.visible = false
   if (keyWentDown("space")){
    bell.play()
   }
   main.y = World.mouseY;
   edges=createEdgeSprites();
   main.collide(edges);
   //code to reset the background
   if(path.x < 0){
   path.x = 225;
   }
   distance = Math.round(distance + -(0.1*(path.velocityX)))
     pin.setLifetimeEach = 200
     yello.setLifetimeEach = 200
     re.setLifetimeEach = 200
    if (pin.isTouching(main)){
        gameState = END
        p = p + 1
     }
    if (yello.isTouching(main)){
        gameState = END
        y = y + 1
     }
    if (re.isTouching(main)){
        gameState = END
        r = r + 1
     }
    if (obs.isTouching(main)){
        gameState = END
        obn = obn + 1
     }
    ob()
   }
  if (gameState === END){
    gamo.visible = true
    main.changeAnimation("SahilCollided", main_collided)
    if (p > 0){
     pinks.changeAnimation("PinkCollided", pink_collided)
     pinks.lifetime = -1
     pin.setVelocityXEach(0)
    }
    if (y > 0){
     yellows.changeAnimation("YellowCollided", yellow_collided) 
     yellows.lifetime = -1
     yello.setVelocityXEach(0)
    }
    if (r > 0){
     reds.changeAnimation("RedCollided", red_collided)
     reds.lifetime = -1
     re.setVelocityXEach(0)
    }
    if (obn > 0){
     obwan.lifetime = -1
     obwan.velocityX = 0
    }
    path.velocityX=0
    fill("cyan")
    stroke("lime")
    textSize(15)
    text("Press UP To Restart", 175, 150)
    if (keyWentDown("up")){
      reset()
    }
  }
  if (frameCount%150===0&&gameState === PLAY){
       if (numz===1){
         pinkz()
       }
       else if (numz===2){
         yellowz()
       }
       else if (numz===3){
         redz()
       }
     }
}
function pinkz(){
  pinks = createSprite(600, Math.round(random(50, 250)), 10, 10)
  pinks.addAnimation("PinkRunning", pink1)
  pinks.addAnimation("PinkCollided", pink_collided)
  pinks.velocityX = -(5 + 5 * distance/500)
  pinks.scale = 0.055
  pin.add(pinks)
}
function yellowz(){
  yellows = createSprite(600, Math.round(random(50, 250)), 10, 10)
  yellows.addAnimation("YellowRunning", yellow1)
  yellows.addAnimation("YellowCollided", yellow_collided)
  yellows.velocityX = -(5 + 5 * distance/500)
  yellows.scale = 0.055
  yello.add(yellows)
}
function redz(){
  reds = createSprite(600, Math.round(random(50, 250)), 10, 10)
  reds.addAnimation("RedRunning", red1)
  reds.addAnimation("RedCollided", red_collided)
  reds.velocityX = -(5 + 5 * distance/500)
  reds.scale = 0.055
  re.add(reds)
}
function reset(){
  gameState=PLAY
  obs.destroyEach()
  pin.destroyEach()
  yello.destroyEach()
  re.destroyEach()
  distance = 0
  dist2 = 0
  main.changeAnimation("SahilRunning", main1)
  r = 0
  p = 0
  y = 0
}
function ob(){
  numb = Math.round(random(0.5, 3.49))
  if (frameCount%220===0){
    obwan = createSprite(600, Math.round(random(20, 280)), 10, 10)
    if (numb===1){
      obwan.addImage(ob1)
      obwan.scale = 0.1
    }
    if (numb===2){
      obwan.addImage(ob2)
      obwan.scale = 0.1
    }
    if (numb===3){
      obwan.addImage(ob3)
      obwan.scale = 0.1
    }
    obwan.velocityX = path.velocityX
    obwan.lifetime = 200
    obs.add(obwan)
  }
}