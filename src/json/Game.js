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

var objects = {
  platforms: '', bullets: ''
};
var controls = {
  cursors: '', gunKey: '', interactKey: '', dropKey: ''
};
var playerState = 'idle';
var playerStateList = {
  idle: 'idle',
  movingLeft: 'left',
  movingRight: 'right',
  canJump: 'canJump',
  jumping: 'jumping',
  shooting: 'shooting',
  crouching: 'crouching',
  crouched: 'crouched',
  gettingUp: 'getUp'
}

var game = new Phaser.Game(config);

function preload(){
    this.load.image('sky', '../../assets/images/test/sky.png');
    this.load.image('ground', '../../assets/images/test/platform.png');
    this.load.spritesheet('dudeWalk',
        '../../assets/images/test/run.png',{
        frameWidth: 50,frameHeight: 42 }
    );
    this.load.spritesheet('dudeShoot',
        '../../assets/images/test/shoot.png',{
        frameWidth: 50,frameHeight: 42 }
    );
    this.load.spritesheet('dudeidle',
        '../../assets/images/test/idle.png',{
        frameWidth: 50,frameHeight: 42 }
    );
    this.load.spritesheet('dudeCrouch',
        '../../assets/images/test/crouch.png',{
        frameWidth: 50,frameHeight: 42 }
    );
    /*this.load.spritesheet(){ frameWidth: 32, frameHeight:48 }
    Esto carga un conjunto de sprites en un array, por lo que el nombre clave del array que pongamos seguido de un [x] nos mostrará distintos sprites de un mismo personaje. Así se usarán para animar.
*/
}
function create(){
    this.add.image(400,300,'sky');
    objects.platforms = this.physics.add.staticGroup();
    objects.platforms.create(400,568,'ground').setScale(2).refreshBody();
    objects.platforms.create(600,470,'ground');
    objects.platforms.create(90,370,'ground');
    objects.platforms.create(580,310,'ground');


    player = this.physics.add.sprite(100, 450, 'dudeidle');
    this.physics.add.collider(player, objects.platforms);
    player.body.setSize(6, 42);

    var moabKeys = false;
    if(moabKeys){
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

    player.setCollideWorldBounds(true);

    CountShoot = 0;
    bajando = false;
    bajadoComplete = false;
    subido = true;

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dudeWalk', { start: 0, end: 13 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('dudeidle', { start: 0, end: 4 }),
        frameRate: 6
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dudeWalk', { start: 1, end: 13 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'attack',
        frames: this.anims.generateFrameNumbers('dudeShoot', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'Crouch',
        frames: this.anims.generateFrameNumbers('dudeCrouch', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'GetUp',
        frames: this.anims.generateFrameNumbers('dudeCrouch', { start: 5, end: 0 }),
        frameRate: 10,
        repeat: 0
    });
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

}

function Idle(){
  player.anims.play('idle',true);
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

function Left(){
  //Move left
  if (CountShoot==0 && subido==true) {
      console.log(player.body.position.x);
      player.setVelocityX(-160);
      player.flipX = true;
      player.anims.play('left', true);
  }

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
  if (CountShoot==0 && subido==true)
  {
      console.log(player.body.position.x);
      player.setVelocityX(160);
      player.flipX = false;
      player.anims.play('left', true);
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
    player.setVelocityY(-330);
    playerState = playerStateList["jumping"];
  }
}

function Jump(){
  //Left
  if (controls.cursors.left.isDown && CountShoot==0 && subido==true) {
      console.log(player.body.position.x);
      player.setVelocityX(-160);
      player.flipX = true;
      //player.anims.play('left', true);
  }

  //Right
  if (controls.cursors.right.isDown && CountShoot==0 && subido==true) {
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
}

function Shooting(){

  player.setVelocityX(0);
  player.anims.play('attack',true);
  CountShoot++;
  if(player.anims.currentFrame.index == 5)
    CountShoot = 0;


  if(controls.gunKey.isUp && CountShoot == 0){
    playerState = playerStateList["idle"];
  }
}

function Crouching(){
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
}

function GettingUp() {
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
