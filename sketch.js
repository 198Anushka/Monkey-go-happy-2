var monkey,monkey_running,j;
var ground, invisibleGround, groundImage;
var PLAY=1;
var END=0;
var gameState=PLAY;


var bannanaGroup, bannanaImage;
var obstacleGroup, obstacleImage;

var score;


function preload(){
  
  bannanaImage = loadImage("banana.png");
  obstacleImage=loadImage("stone.png")
 monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

   

  
  
  j=loadImage("jungle.jpg");
  groundImage=loadImage("ground2.png");
}

function setup() {
  createCanvas(800, 400);
  
 monkey=createSprite(200,200);
  monkey.addAnimation("running", monkey_running);
    monkey.scale = 0.2;
 
        
      


  
  ground = createSprite(200,350,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
   ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
 
  invisibleGround.visible = false;
  
  bannanaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
 //jungle=createSprite(800,400);
  //jungle.addImage(j)
}

function draw() {
  background(j);
if (gameState===PLAY){
  
  if(keyDown("space")) {
    monkey.velocityY = -10;
    //s3.play();
  }
  

  
  if (ground.x < 0){
    ground.x = ground.width/2;
    
  }
   monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground); 
  
  spawnBannanas();
  spawnObstacles();
  if (obstacleGroup.isTouching(monkey)){
   gameState=END;
 } 
    }  
 else if(gameState===END){
 //ound.velocityX=0;
   monkey.velocityY=0;
 //monkey.changeAnimation("c", trex_collided );
   obstacleGroup.setVelocityXEach(0);
   bannanaGroup.setVelocityXEach(0);
      
             
         } 
  
  
  
 drawSprites(); 
  
  score = score + Math.round(getFrameRate()/60);
  text("Score: "+ score, 500,50);
 
  
}

function spawnBannanas() {
  
  if (frameCount % 60 === 0) {
    var bannana= createSprite(600,120,40,10);
    bannana.y = Math.round(random(80,120));
    bannana.addImage(bannanaImage);
    bannana.scale = 0.1;
    bannana.velocityX = -3;
    
     
    bannana.lifetime = 200;
    
  
    bannana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    
    bannanaGroup.add(bannana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,350,10,40);
    obstacle.velocityX = -4;
    
    
    var rand = Math.round(random(1));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      default: break;
    }
    
           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }
}