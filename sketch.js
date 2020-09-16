
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime=0;
var ground;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  
}



function setup() {
  
 createCanvas(400,400);
  
   monkey= createSprite(50,170,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
  
  
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
 ground.x=ground.width/2;
  
   obstacleGroup = new Group();
  FoodGroup = new Group();
  
}


function draw() {
  
 background("white");
  
  if(gameState===PLAY){
    
     
  
    survivalTime =survivalTime+Math.ceil(getFrameRate()/60);
    
  if(monkey.isTouching(FoodGroup)){
    
    FoodGroup.destroyEach();
       
     }
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  spawnobstacle();
   spawnBanana();
  
  monkey.collide(ground);
   
    if((keyDown("space"))&& monkey.y >= 0) {
      
        monkey.velocityY = -12;
     
    
      
  }

       monkey.velocityY = monkey.velocityY + 0.8;
    
      if(obstacleGroup.isTouching(monkey)){
        gameState = END;
        
       
        
      }
     }
  
  if(gameState===END){
    
       
    //monkey.visible=false;
    //ground.visible=false;
    
    
    monkey.collide(ground);
    
     ground.velocityX = 0;
    monkey.velocityY = 0;
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
    
     }
  
    textSize(20);
  fill("black");
  text("SurvivalTime: "+ survivalTime, 100,50);
    drawSprites();
  
}

function spawnobstacle(){
   if (frameCount % 300 === 0) {
     
    obstacle= createSprite(400,350,30,40);
     obstacle.x = Math.round(random(1,2));  
  obstacle.addImage( obstacleImage);
  obstacle.scale=0.09;
    obstacle.velocityX = -(6+ survivalTime/100);
     obstacle.lifeTime=200;
     obstacleGroup.collide(ground);
      obstacleGroup.add(obstacle);
     obstacle.y=330;
     obstacle.x=600;
   } 
}

function spawnBanana(){
   if (frameCount % 80 === 0) {
  banana = createSprite(600,100,20,50);
 banana.y = Math.round(random(120,200));
  banana.addImage( bananaImage);
 banana.scale=0.07;
      banana.velocityX = -3;
     banana.lifeTime=600/3;
      FoodGroup.add(banana);
   }
}

