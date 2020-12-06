var config={
    width: 800,
    height: 600,
    type: Phaser.AUTO,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 490 },
            debug: false
        }
    },

    scene: {
        preload:preload,
        create:create,
        update:update
    }
}

var game = new Phaser.Game(config);

var objects = {
  platforms: '', bullets: ''
};
var controls = {
  cursors: '', gunKey: '', interactKey: '', dropKey: ''
};

var playerState = 'idle';
var playerStateList = {
  "idle": 'idle',
  "movingLeft": 'left',
  "movingRight": 'right',
  "canJump" : 'canJump',
  "jumping": 'jumping',
  "shooting" : 'shooting',
  "crouching": 'crouching',
  "crouched": 'crouched',
  "gettingUp": 'getUp'
}

function Left(){
  //Move left
        console.log(player.body.position.x);
        player.setVelocityX(-160);
        player.anims.play('Mario1Walk', true);
        player.flipX = true;
    

  if(controls.cursors.left.isUp && playerState === playerStateList["movingLeft"]){
    console.log("Stop moving left");
    playerState = playerStateList["idle"];
  }

  //Jump
  if(controls.cursors.up.isDown){
    playerState = playerStateList["canJump"];
  }

  //Shooting
  if(controls.gunKey.isDown){
    playerState = playerStateList["shooting"];
  }
}

function Right(){
  //Move right
    
        player.setVelocityX(160);
        player.flipX = false;
        if(player.body.touching.down){
          player.anims.play('Mario1Walk', true);
        }

    

  if(controls.cursors.right.isUp && playerState === playerStateList["movingRight"]){
    console.log("Stop moving right");
    playerState = playerStateList["idle"];
  }

  //Jump
  if(controls.cursors.up.isDown){
    playerState = playerStateList["canJump"];
  }

  //Shooting
  if(controls.gunKey.isDown){
    playerState = playerStateList["shooting"];
  }
}

function CanJump() {
  if(controls.cursors.up.isDown && player.body.touching.down){
        player.anims.play('Mario1Jump',true);              
        playerState = playerStateList["jumping"];
        player.setVelocityY(-330);
  }
}

function Jump(){
    
    
  /*  if(player.anims.currentFrame.index==5)
        player.setVelocityY(-330);

    else if(player.anims.currentFrame.index==6){
        player.anims.pause(player.anims.currentAnim.frames[5]);
    }
    
    if(player.body.touching.down&&player.anims.currentFrame.index>6)
       player.anims.play('Mario1Jump',true);*/
  //Left
  if (controls.cursors.left.isDown) { 
      console.log(player.body.position.x);
      player.setVelocityX(-160);
      player.flipX = true;
      //player.anims.play('left', true);
  }

  //Right
  if (controls.cursors.right.isDown) {
      console.log(player.body.position.x);
      player.setVelocityX(160);
      player.flipX = false;
      //player.anims.play('left', true);
  }

    if(player.body.touching.down && !controls.cursors.up.isDown){
            playerState = playerStateList["idle"];
        }

  if(player.body.touching.down && controls.gunKey.isDown){
            playerState = playerStateList["shooting"];
        }
    
    
/*
     player.once('animationcomplete', ()=>{
        console.log('animationcomplete')
         if(player.body.touching.down && !controls.cursors.up.isDown){
            playerState = playerStateList["idle"];
        }

  if(player.body.touching.down && controls.gunKey.isDown){
            playerState = playerStateList["shooting"];
        }
    });
    
  */
}

function Shooting(){
    
   if(canShoot==true){
        if(player.flipX==false){
            ShootDirection="right";
            console.log("dispara derecha");
    }
        else if(player.flipX == true){
            ShootDirection="left";
            console.log("dispara derecha");
    }
        player.anims.play('Mario1Shoot',true);
        player.once('animationcomplete', ()=>{ 
        console.log('animationcomplete');
        balaDisparada=true;
            
        if(controls.gunKey.isUp){
            playerState = playerStateList["idle"];
        }
    });
     player.setVelocityX(0);
   }
}

/*function Crouching(){
  if (controls.cursors.down.isDown && player.body.touching.down && CountShoot==0 && bajadoComplete==false){
    if(bajando == false){
      bajando = true;
      subido = false;
      console.log("Down");
      player.anims.play("Crouch",true);
    }
    player.once('animationcomplete', ()=>{
        console.log('animationcomplete')
        bajando = false;
        bajadoComplete = true;
    });
  }
}*/

/*function GettingUp() {
  //hacer que se levante el muñeco
  if(controls.cursors.down.isDown && bajadoComplete==true){
      console.log("Getting up");
      player.anims.play("GetUp",true);
      console.log("AnimationDone");
      player.once('animationcomplete', ()=>{
          subido = true;
          bajadoComplete = false;
      });
  }
}
*/



function Idle(){
  player.anims.play('idleMario1',true);
  player.setVelocityX(0);

  //Move left
  if(controls.cursors.left.isDown){
    playerState = playerStateList["movingLeft"];
  }

  //Move right
  if(controls.cursors.right.isDown){
    playerState = playerStateList["movingRight"];
  }

  //Jump
  if(controls.cursors.up.isDown){
    playerState = playerStateList["canJump"];
  }

  //Shooting
  if(controls.gunKey.isDown){
    playerState = playerStateList["shooting"];
  }
}





function preload(){
    this.load.image('bala','../../assets/images/bala/bala.png');
    this.load.image('sky', '../../assets/images/scene/sky.png');
    this.load.image('ground', '../../assets/images/scene/platform.png');
    this.load.spritesheet('Mario1Walk',
        '../../assets/Protagonista/Mario1/Run/Run_R/RunR.png',{
        frameWidth: 66,frameHeight: 40 }
    );
      this.load.spritesheet('Mario1Aim',
        '../../assets/Protagonista/Mario1/Aim/Aim_R/AimR.png',{
        frameWidth: 66,frameHeight: 40 }
    );
    this.load.spritesheet('Mario1idle',
        '../../assets/Protagonista/Mario1/Idle/Idle_R/IdleR.png',{
        frameWidth: 66,frameHeight: 40}
    );
    this.load.spritesheet('Mario1Shoot',
        '../../assets/images/shoot/shoot.png',{
        frameWidth: 50,frameHeight: 40}
    ); 
    this.load.spritesheet('Mario1Jump',
        '../../assets/images/jump/jump.png',{
        frameWidth: 50,frameHeight: 40}
    ); 

    /*this.load.spritesheet(){ frameWidth: 32, frameHeight:48 }
    Esto carga un conjunto de sprites en un array, por lo que el nombre clave del array que pongamos seguido de un [x] nos mostrará distintos sprites de un mismo personaje. Así se usarán para animar.
*/
    var moabKeys = true;
    if(moabKeys==true){
      //These are moab controls
      this.input.keyboard.removeAllKeys();
      controls.interactKey = this.input.keyboard.addKey('E');
      controls.gunKey = this.input.keyboard.addKey('W');
      controls.dropKey = this.input.keyboard.addKey('Q');
      controls.cursors = this.input.keyboard.createCursorKeys();
    }
    else{
      //These are WASD controls
      this.input.keyboard.removeAllKeys();
      controls.interactKey = this.input.keyboard.addKey('K');
      controls.gunKey = this.input.keyboard.addKey('J');
      controls.dropKey = this.input.keyboard.addKey('L');
      controls.cursors = this.input.keyboard.addKeys({
        'up': Phaser.Input.Keyboard.KeyCodes.W, 'down': Phaser.Input.Keyboard.KeyCodes.S,
        'left': Phaser.Input.Keyboard.KeyCodes.A, 'right': Phaser.Input.Keyboard.KeyCodes.D});
    }
    console.log(moabKeys);
}



function createAnims(){
        
        game.anims.create({
        key: 'Mario1Walk',
        frames: game.anims.generateFrameNumbers('Mario1Walk', { start: 1, end: 13 }),
        frameRate: 10,
        repeat: -1
    });

        game.anims.create({
        key: 'idleMario1',
        frames: game.anims.generateFrameNumbers('Mario1idle', { start: 0, end: 4 }),
        frameRate: 6
    });

        game.anims.create({
        key: 'Mario1Shoot',
        frames: game.anims.generateFrameNumbers('Mario1Shoot', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 0
    });
       game.anims.create({
        key: 'Mario1Jump',
        frames: game.anims.generateFrameNumbers('Mario1Jump',{ frames:[0,1,2,3,4,3,4,3,2,1,0]}),
        frameRate: 10,
        repeat:0
    });
    
}

var platforms;
function create(){
    this.add.image(400,300,'sky');
    platforms = this.physics.add.staticGroup();
    platforms.create(400,568,'ground').setScale(2).refreshBody();
    platforms.create(600,470,'ground').refreshBody();
    platforms.create(90,370,'ground').refreshBody();
    platforms.create(580,310,'ground').refreshBody();

    //adding physics
    player = this.physics.add.sprite(50, 450, 'Mario1idle');
    this.physics.add.collider(player, platforms);
    widthPlayer=30;
    heightPlayer=48;
    //size player
    player.body.setSize(widthPlayer, heightPlayer);
    player.setCollideWorldBounds(true);
    //shooting booleans
    balaActiva=false;
    balaDisparada=false;
    ShootDirection="";
    canShoot=true;
    //jumping booleans
    salto=false;
    
    createAnims();
  
}

function update(){
    
    
    
    
    
      switch (playerState) {
    case playerStateList["idle"]:
      Idle();
      break;
    case playerStateList["movingLeft"]:
      Left();
      break;
    case playerStateList["movingRight"]:
      Right();
      break;
    case playerStateList["canJump"]:
      CanJump();
      break;
    case playerStateList["jumping"]:
      Jump();
      break;
    case playerStateList["shooting"]:
      Shooting();
      break;
    case playerStateList["crouching"]:
      Crouching();
      break;
    case playerStateList["gettingUp"]:
      GettingUp();
      break;
    default:

  }
    
    
    
    
    
    
    
    
    // sirve para originar la bala dependiendo de hacia donde mire el personaje
    if(balaDisparada==true){
        if(ShootDirection=="right")
            bala=this.physics.add.sprite(player.body.position.x + 30,player.body.position.y + heightPlayer/2-5,'bala');
        
        else if(ShootDirection=="left")
            bala=this.physics.add.sprite(player.body.position.x-30,player.body.position.y + heightPlayer/2-5,'bala')
        
        bala.setGravityY(-490);
        balaDisparada = false;
        balaActiva = true;
        bala.setScale(0.5);
    }
    //sirve para dar velocidad una vez se crea la bala
    if(balaActiva == true){
        if(ShootDirection == "right")
            bala.setVelocityX(300);
        else if(ShootDirection == "left"){
            bala.setVelocityX(-300);
        } 
        console.log(bala.body.position.x);
    }
    // sirve para ejecutar una animación de salto más completa
   /* if(player.body.velocity.y>245 && player.body.velocity.y<280){  
        console.log('animationcomplete');
        player.setFrame(4);     
        salto = true;   
                                                               
     }
    //sirve para dar una animación de salto más completa
    if(salto == true && player.body.touching.down){
          player.anims.playReverse('Mario1Jump','true');
          player.once('animationcomplete', ()=>{ 
            salto = false;        
        });
        
      }
    */
    if(balaActiva==true && bala.body.position.x <700 && bala.body.position.x > 0){
        canShoot=false;
    }
    else if(balaActiva==true && (bala.body.position.x > 700 || bala.body.position.x < 0)){
         bala.destroy();
         balaActiva=false;
         canShoot=true;
    }
       
}
