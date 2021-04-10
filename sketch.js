var bg,bgImage,alien,alienImage,box,boxImage,basket,basketImage;
var edges;
var score;
var basketGroup,boxGroup;
var gameState;
var count;
gameState = "play";
count = 20;
function preload(){
  bgImage = loadImage("BG.jpg");
  alienImage = loadImage ("AlienShip.png");
  boxImage = loadImage ("Box.png");
  basketImage = loadImage ("Basket.png");
  gameOverImage = loadImage ("GameOver.png");
}
function setup() {
  createCanvas(1000,550);
  bg = createSprite(500, 275, 1000, 550);
  bg.addImage(bgImage);
  bg.scale = 1.4;
  alien = createSprite(500,90);
  alien.addImage(alienImage);
  alien.scale = 0.3;
  edges = createEdgeSprites()
  score = 0;
  basketGroup = new Group()
  boxGroup = new Group()
}

function draw() {
  background(0);  
 if (gameState ==="play"){

  alien.x = mouseX;
  alien.collide(edges[0])
  alien.collide(edges[1])
  spawnBasket();
  if (keyWentDown("space")){
    count = count-1;
    dropPackage();
  }
  if (boxGroup.isTouching(basketGroup)){
    boxGroup.destroyEach();
    score = score + 10
  }
  if (count===0 && score < 100){
    gameState = "end";
  }
}
else if (gameState === "end"){
gameover = createSprite(500,400,20,20);
gameover.addImage (gameOverImage)
}
  drawSprites();
  fill("black");
  textSize(15);
  text('SCORE: ' + score,50,20);
  text('BASKET COUNT: ' + count,800,20);
}
function spawnBasket(){
  if (frameCount%200===0){
    basket = createSprite(1000,450);
    basket.addImage(basketImage);
    basket.velocityX = -4;
    basket.y = random(350,500);
basket.scale = 0.4;
basketGroup.add(basket);
basket.lifetime = 260;
basket.debug = true;
basket.setCollider("rectangle", 0,50,160,100);
  }
}
function dropPackage(){
  box = createSprite(alien.x,alien.y,10,10);
  box.addImage(boxImage);
  box.velocityY = 4;
  box.scale = 0.1;
alien.depth = box.depth+1;
box.lifetime = 140;
boxGroup.add(box);
box.debug = true;
}