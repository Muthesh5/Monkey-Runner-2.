var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground;
var bg,bgImage;
var monkey,monkey_running;
var obstacleGroup,obstacleImage;
var bananaGroup,bananaImage;
var score;
var score2;
var touches;

function preload(){
  
  bgImage = loadImage("forest2.jpg")
  
  monkey_running =         loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  obstacleImage = loadImage("obstacle.png");
  bananaImage = loadImage("banana.png")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  ground=createSprite(250,windowHeight-250,1000,10);
  ground.velocityX = -4;
  
  bg=createSprite(windowWidth,windowHeight-300,10,10);
  bg.addImage(bgImage)
  bg.velocityX = -5; 
  
  monkey=createSprite(30,240,20,20);
  monkey.addAnimation("monkey",monkey_running)
  monkey.scale = 0.1;
  
  obstacleGroup= new Group();
  bananaGroup = new Group(); 
  
  score = 0
  score2 = 0
}

function draw(){
  background("white")
  textSize (20)
  stroke("white")
  text("Survival Time :"+score,20,50);
  text("Score :"+score2,300,50)
  
  if(gameState===PLAY){
  
    if (ground.x < 0){
        ground.x = ground.width/2;
      }
    
    if (bg.x < 0){
        bg.x = bg.width/2;
      }
    
    bg.velocityX = -(4+score/200)
    
    console .log (gameState)

    monkey.collide(ground);

    if(keyDown("space") || touches.length>0 && monkey.y >= windowHeight-290){
      monkey.velocityY = -12
      touches=[]
    }

    switch(score2){
        case 10:monkey.scale = 0.125
        break;
        case 20:monkey.scale = 0.150
        break;
        case 30:monkey.scale = 0.175
        break;
        case 40:monkey.scale = 0.2
        break;
        case 50:monkey.scale = 0.225
        break;
        case 60:monkey.scale = 0.250
        break;
        case 70:monkey.scale = 0.275
        break;
        case 80:monkey.scale = 0.3
        break;
        default:break;
    }  
    
    monkey.velocityY = monkey.velocityY+0.4
    monkey.setCollider("circle")

    obstacles();
    
    bananas();
    
    score = score + Math.round(getFrameRate()/60);
    
    if(monkey.isTouching(bananaGroup)){
      score2 = score2 + 1;
      bananaGroup.destroyEach();
    }

    if(monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
  }
  
  if(gameState===END){
    ground.velocityX = 0;
    bg.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    if(keyDown("r") && gameState === END){
      reset();
      bg.velocityX = -(4+score/200)
    }
    
  }
  
  drawSprites();
}
  function obstacles(){
      if(frameCount % 120 === 0) {
      var obstacle = createSprite(windowWidth,windowHeight-270,10,40);
      obstacle.velocityX = -(5+score/200);  
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.1
      obstacle.lifetime = 125;
      obstacle.setCollider("circle")
      obstacleGroup.add(obstacle);
    }
}
function bananas(){
      if(frameCount % 120 === 0) {
      var banana = createSprite(windowWidth,Math.round(random(130,180)),10,40);
      banana.velocityX = -(5+score/200);  
      banana.addImage(bananaImage);
      banana.scale = 0.1
      banana.lifetime = (windowWidth/score+5);
      bananaGroup.add(banana);
    }
}
function reset(){
  gameState = PLAY;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  score = 0
  score2 = 0
}