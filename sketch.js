var flappy;
var backgroundFlappyImage;
var backgroundFlappy;
var invisibleGround;
var pipesImage1;
var pipesImage2;
var flappyImg1;
var flappyImg2;
var pipesgroup;

var PLAY=1;
var END=0;
var gameState=PLAY;

var pipes1;
var pipes2;
var ground,groundImage;
var score=0;
var scoreImage;
var gameover;
var gameoverImage;
var reset;
var resetImage;

function preload()
{  
backgroundFlappyImage=loadImage("backgroundImage4.png");
pipesImage1=loadImage("pipe12-removebg-preview.png")
pipesImage2=loadImage("pipe132-removebg-preview.png")
groundImage=loadImage("groundImage-removebg-preview.png");
  
flappyImg1=loadAnimation("pixil-frame-0 (2).png");
flappyImg2=loadAnimation("pixil-frame-0 (3).png");

gameoverImage= loadImage("gameOver1.png")
resetImage=loadImage("Play again Image.png")

}

function setup()
{  
createCanvas(700,750);    
  
backgroundFlappy=createSprite(350,50,1000,300);
backgroundFlappy.addImage(backgroundFlappyImage);
backgroundFlappy.scale=1.5;
  
flappy=createSprite(300,300,20,20);
flappy.addAnimation("flappyUp",flappyImg1);
flappy.addAnimation("flappyDown",flappyImg2);
flappy.scale=2;
flappy.debug=false; 
flappy.setCollider("rectangle",-5,-5,flappy.height-60,flappy.width-129)
  
invisibleGround=createSprite(325,600,650,10);
invisibleGround.visible=false;
invisibleGround.debug=false;
  
ground=createSprite(350,765,20,20);
ground.addImage(groundImage);
ground.depth=backgroundFlappy.depth;
ground.depth=flappy.depth;
ground.depth=ground.depth+1;
ground.scale=1.5;
ground.debug=false;
ground.setCollider("rectangle",0,0,ground.width,ground.height-70)

gameover=createSprite(350,215,20,20);
gameover.addImage(gameoverImage);

reset=createSprite(350,300,20,20);
reset.addImage(resetImage)
reset.scale=0.5

pipesgroup=createGroup();
    
}

function draw()
{  
background(0);
//console.log(flappy.velocityY);

flappy.collide(invisibleGround);
invisibleGround.velocityY=0;

if(gameState===PLAY)
{
        console.log(flappy.rotation)
        gameover.visible=false;
        reset.visible=false;
if(keyDown("Q")&&gameState===PLAY){
    flappy.velocityY=-12
    flappy.rotation=320
   } 

   flappy.velocityY=flappy.velocityY+1.5

   if(flappy.rotation!=null){
        flappy.rotation=flappy.rotation+4
   }   
   if(flappy.rotation===90||flappy.rotation>450){
        flappy.rotation=flappy.rotation-3;
        console.log("pizza")
   }

   if(backgroundFlappy.x<100){
        backgroundFlappy.x=360
      }
    backgroundFlappy.velocityX=-4 

    if(ground.x<200){
        ground.x=360
      }  
     ground.velocityX=-10

     if(pipesgroup.isTouching(flappy)||ground.isTouching(flappy)){
             console.log("is touching is working")
             flappy.rotation=90
             gameState=END;
     }
      
     spawnPipes();

} 
 if(gameState===END)
{
        console.log("game over")
        gameover.visible=true; 
        reset.visible=true;         
        flappy.velocityY=10    
if(flappy.isTouching(ground)){
        flappy.velocityY=0
        flappy.velocityX=0
}
flappy.collide(ground);
flappy.changeAnimation("flappyDown",flappyImg2)

backgroundFlappy.velocityX=0;
ground.velocityX=0;
backgroundFlappy.velocityY=0;
pipesgroup.setVelocityEach(0,0);

pipesgroup.setLifetimeEach(-1);

if(gameState===END&&mousePressedOver(reset)){
        reset1();
        console.log("chesse")
}

}

drawSprites();
}

function spawnPipes()
{
  if(frameCount%100===0){
  pipes1= createSprite(500,592,20,20)
  pipes1.addImage(pipesImage1)
  pipes1.depth=backgroundFlappy.depth
  pipes1.depth=pipes1.depth+1
  pipes1.scale=4
  pipes1.velocityX=-3
  pipes1.lifetime=300;
  pipes1.debug=false;
  pipes1.setCollider("rectangle",1.5,0,pipes1.height-95,pipes1.width-160)
  pipes1.depth=flappy.depth;
  pipes1.depth=pipes1.depth-1;
  pipes2=createSprite(500,400,20,20)
  pipes2.addImage(pipesImage2)
  pipes2.depth=backgroundFlappy.depth
  pipes2.depth=pipes2.depth+1
  pipes2.scale=4
  pipes2.velocityX=-3
  pipes2.lifetime=300
  pipes2.debug=false;
  pipes2.setCollider("rectangle",0.5,-30,pipes2.height-105,pipes2.width-43)

  pipesgroup.add(pipes1);
  pipesgroup.add(pipes2);
  
var rand=Math.round(random(1,10))
 switch(rand){
   case 1: pipes1.y=500;
           pipes2.y=160;
   break;
   case 2: pipes1.y=550;
           pipes2.y=210;
   break;
   case 3: pipes1.y=510;
           pipes2.y=170;
   break;
   case 4: pipes1.y=520;
           pipes2.y=180;
   break;
   case 5: pipes1.y=530;
           pipes2.y=190;
   break;
   case 6: pipes1.y=540;
           pipes2.y=200;
   break;
   case 7: pipes1.y=560;
           pipes2.y=220;
   break;
   case 8: pipes1.y=570;
           pipes2.y=230;
   break;
   case 9: pipes1.y=580;
           pipes2.y=240;
   break;
   case 10:pipes1.y=590;
           pipes2.y=250;
  }
 }
}

function reset1(){
gameState=PLAY;
flappy.x=300
flappy.y=200
flappy.changeAnimation("flappyUp",flappyImg1)
flappy.rotation=340

pipesgroup.destroyEach()

}