var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup,obstacleGroup;
var survivalTime=0;
var score;
var ground;
var jungle,jungleImage;
var gameOver,gameOverImage;
var PLAY=1;
var END=0;
var gameState=PLAY;
function preload(){
  
jungleImage=loadImage("jungle.jpg")
monkey_running =loadAnimation("Monkey_01.png, Monkey_02.png ,Monkey_03.png,Monkey_04.png ,Monkey_05.png ,Monkey_06.png ,Monkey_07.png ,Monkey_08.png ,Monkey_09.png,Monkey_10.png")
  
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("stone.png");
gameOverImage=loadImage("gameOver.png")
}



function setup() {
createCanvas(600,300);
//creating the jungle
jungle=createSprite(150,20,600,10);
jungle.addImage(jungleImage);
jungle.x = jungle.width/2;
jungle.velocityX=-2;

  
//creating monkey
monkey=createSprite(50,165,20,20) ;
monkey.addAnimation("running",monkey_running);
monkey.scale=0.1;
//creating ground
ground=createSprite(50,200,600,10);
  
 ground.x = ground.width/2;
 ground.velocityX=-2;
ground.visible=false;
 
//game over image
  gameOver=createSprite(300,100,20,100);
  gameOver.addImage(gameOverImage);6
  gameOver.scale=0.7;
score=0;
  //creating groups
  bananaGroup=new Group();
  obstacleGroup=new Group();
}xxxxxxxxxxxxxxxxxxxxxxxxx
function draw() {
background("white");
//displaying score
stroke("black"); 
textSize(20);
fill("black");
text("score : "+ score,400,50);
//displaying the survival time 
stroke("black") ; 
textSize(20);
fill("black"); 
survivalTime=Math.ceil(frameCount/frameRate())
text("survivalTime :"+ survivalTime,100,50)
  
if(gameState==PLAY){ 
//spawning obstacles
obstacles();
//spawning banana 
food();
   
gameOver.visible=false;
  
console.log(monkey.y);
  if (ground.x < 300){
      ground.x = ground.width/2;
  }
     if (jungle.x < 100){
      jungle.x = jungle.width/2;
  }
   
    //making the score+1 when touches the banana
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score=score+1;
  }
    
 //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 161) {
        monkey.velocityY = -12;
     
    }
    //chainging the gamstate to end when the monkey touches the obstacle
    if(monkey.isTouching(obstacleGroup)){
    gameState=END;
   
 }
  }
 else if(gameState==END){
   gameOver.visible=true;
  ground.velocityX=0;
 }

  
  
  //add gravity
  monkey.velocityY=monkey.velocityY+0.8;
 
//monkey colliding with the ground
  monkey.collide(ground);
 
 
    drawSprites();
}
//creating obstacles
function obstacles(){
  if (frameCount % 300 === 0){
   var obstacle = createSprite(600,180,20,20);
   obstacle.velocityX =-3;
   obstacle.addImage(obstacleImage);

    
    
    //adding liftime to prevent from memory leakage
  obstacle.lifetime = 300;
    obstacle.scale=0.1;
    obstacleGroup.add(obstacle);
  }
}
//creating the banana
function food(){
if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(50,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3 ;
    
    //adding liftime to prevent from memory leakage
  banana.lifetime=200;
  bananaGroup.add(banana);

}
}