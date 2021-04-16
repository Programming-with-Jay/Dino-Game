
var gameState='PLAY'

function preload()
{
    dinoAnim=loadAnimation("dino1.png","dino2.png","dino3.png","dino4.png","dino5.png")
    dinoJump=loadImage('dino1.png')
    dinodunkAnim=loadAnimation("dinodunk1.png","dinodunk2.png")
    groundImg=loadImage("ground.png")
    cactusSmall1=loadImage("cacti_small1.png")
    cactusSmall2=loadImage("cacti_small2.png")
    cactusSmall3=loadImage("cacti_small3.png")
    cactusBig1=loadImage('cacti_big1.png')
    cactusBig2=loadImage('cacti_big2.png')
    cactusBig3=loadImage('cacti_big3.png')
    cactusBig4=loadImage('cacti_big4.png')
    cactusBig5=loadImage('cacti_big5.png')
    jumpSound=loadSound('jump.wav')
    dieSound=loadSound('die.wav')
    restartImg=loadImage('replay_button.png')
}
function setup()
{
    createCanvas(1000, 600);
    cactusSmallGroup= new Group;
    dino = createSprite(200,505,20,50);
    dino.addAnimation("running", dinoAnim);
    dino.scale =0.5;
    dino.addAnimation("dunk",dinodunkAnim)
    dino.addAnimation('stop',dinoJump)

    ground = createSprite(200,510,400,10);
    ground.addImage(groundImg)
    ground.velocityX=-7

    restart=createSprite(500,300)
    restart.addImage(restartImg)
    restart.scale=0.7
    restart.visible=false

    cactusSmallGroup= new Group;
    cactusBigGroup= new Group;
}
function draw()
{
    background("white")
    if(gameState==="PLAY")
    {
    if(ground.x<250)
    {
      ground.x=ground.width/4;
    }
    if(dino.x<200){
        dino.x=200
      }
  
      //moving dino
  
      if(dino.y<50)
      {
        dino.y=50
      }
  
      if(keyDown("space") ) {
        dino.velocityY = -16;
        jumpSound.play()
      }
      if(keyDown("down"))
      {
          dino.changeAnimation("dunk",dinodunkAnim)
      }
      if(keyDown("up"))
      {
          dino.changeAnimation("running",dinoAnim)
      }
      
  
      //adding gravity
      dino.velocityY = dino.velocityY + 1;
      dino.collide(ground)
      cactusSmall();
      for(var i=0;i<(cactusSmallGroup).length;i++)
      {
        temp=(cactusSmallGroup).get(i)
        if(temp.isTouching(dino))
        {
          dino.collide(temp);
          dieSound.play()
          gameState="OVER"
        }
      }
    }
    else
    {
      dino.velocityX=0
      ground.velocityX=0
      cactusSmallGroup.setVelocityXEach(0)
      dino.changeAnimation('stop',dinoJump)
      dino.velocityY=0
      cactusSmallGroup.setLifetimeEach(-1)
      restart.visible=true
      if(mousePressedOver(restart))
      {
        restartgame()
      }
  
    }
      drawSprites()
      
    }
    
function cactusSmall()
{
  if(frameCount%100===0)
  {
     //creating sprite and all other things
    var cactusSmall=createSprite(800,490,40,10)
    cactusSmall.velocityX=-4
    cactusSmall.scale=0.5
    var x = Math.round(random(1,3))
    if( x===1)
    {
      cactusSmall.addImage(cactusSmall1)
    }
    else if(x===2)
    {
      cactusSmall.addImage(cactusSmall2)
    }
    else
    {
      cactusSmall.addImage(cactusSmall3)
    }


    cactusSmallGroup.add(cactusSmall)
  }
}
function restartgame()
{
  restart.visible=false
  gameState="PLAY"
  score=0
  dino.changeAnimation("running",dinoAnim)
  dino.velocityY=dino.velocityY+1
  dino.collide(ground)
  cactusSmallGroup.destroyEach()
  ground.velocityX=-7
 dino.scale=0.5
}
