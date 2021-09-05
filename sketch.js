var PLAY = 1;
var END = 0;
var gameState = PLAY;

var invisibleGround
var boy_collided
var boy, path, pathImg, boyImg,backgroundImg, background1
var obstacleGroup, obstacle1, obstacle2
var crate2, crate3
var cloudsGroup, cloudImage;
var score=0;

var jumpSound, collideSound

var boy1, boy2, boy3, boy4, boy5, boy6, boy7, boy8, boy9, boy10, boy11

var boy, boy_running
var collidedSound
var gameoverImg, restartImg, gameover, restart

function preload(){
  
    pathImg=loadImage("ground.png") 

boy_running= loadAnimation("runner1.png","runner2.png","runner3.png","runner4.png","runner5.png","runner6.png","runner7.png","runner8.png","runner9.png","runner10.png","runner11.png")

boy_collided = loadImage("runnercollided.png");


backgroundImg= loadImage("background.jpg")

obstacle1= loadImage("ob2.jpg")

obstacle2= loadImage("ob3.jpg")

cloudImage = loadImage("cloud.png")

jumpSound = loadSound("jump.wav")

collideSound = loadSound("collided.wav")

gameoverImg = loadImage("gameover.png")

restartImg = loadImage ("restart.jpg")

collideSound = loadSound("collided.wav")

}

function setup() {
    createCanvas(displayWidth, displayHeight)     
  path=createSprite(width/2,height-100, windowWidth, 5)
    path.addImage(pathImg);
   
   
    
background1=createSprite(width/2,height/2.3 , width, height-10)

background1.addImage(backgroundImg)

background1.scale=1.2
   

path=createSprite(width/2,height-100, displayWidth, 5)
    path.addImage(pathImg);
  
     boy=createSprite(210,height-150,20,50)
   boy.scale= 0.2
   boy.addAnimation("boy_running",boy_running)
   boy.addAnimation("collided", boy_collided);
   boy.setCollider('circle',0,0,350)
// boy.debug=true
   gameover = createSprite(width/2,height/2- 50);
   gameover.addImage(gameoverImg);
   
   
   restart = createSprite(width/2,height/2);
   restart.addImage(restartImg);
   
   gameover.scale = 0.5;
   restart.scale = 0.1;
 
   gameover.visible = false;
   restart.visible = false;
   
   boy_collided = loadImage("runnercollided.png");
path.velocityX=-5


cloudsGroup = new Group();
obstacleGroup = new Group();

invisibleGround = createSprite(width/2,height-105,width,125);  
 invisibleGround.shapeColor = "#f4cbaa";

score = 0;


  
}

function draw() {
  background(backgroundImg)
  
    background(0);
    
       
       if (gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
        path.velocityX = -(6 + 3*score/100);
        
        if((touches.length > 1 || keyDown("SPACE")) && boy.y  >= height-280) {
          jumpSound.play( )
         boy.velocityY = -15;
           touches = [];
        }
        
        boy.velocityY = boy.velocityY + 0.8
    
    

        if (path.x < 500){
          path.x = path.width/2;
          
         }
  
   

if(obstacleGroup.isTouching(boy)){
  collideSound.play()
  gameState = END
}
spawnClouds();
spawnObstacles();

}
else if (gameState === END) {
  gameover.visible = true;
    restart.visible = true;

    path.velocityX = 0;
    boy.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

    boy.changeAnimation("collided",boy_collided);

    
}
 drawSprites();
     
 if(touches.length>0 || keyDown("ENTER")) {      
  reset();
  touches = []
  
}
textSize(30);
  fill("black")
  text("Score: "+ score,700,120);
  boy.collide(invisibleGround);
}

function spawnClouds(){
  if(frameCount %60 === 0){
    var cloud = createSprite(width+20,height-300,40,10)
    cloud.y = Math.round(random(100,220));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    cloud.lifetime = 300;

    cloud.depth = boy.depth;
    boy.depth = boy.depth+1;

    cloudsGroup.add(cloud);
  }
}

function spawnObstacles(){
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,height-195,20,30);
    obstacle.setCollider('circle',0,0,45)

 //obstacle.debug = true

 obstacle.velocityX = -(6 + 3*score/100);

 var rand = Math.round(random(1,2));
 switch(rand) {
   case 1: obstacle.addImage(obstacle1);
           break;
   case 2: obstacle.addImage(obstacle2);
           break;
   default: break;
 }

 obstacle.scale = 0.3;
 obstacle.lifetime = 300;
 obstacle.depth = boy.depth;
 boy.depth +=1;

 obstacleGroup.add(obstacle);
}
}

function reset(){
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  boy.changeAnimation("boy_running");
  
  score = 0;
  
}
