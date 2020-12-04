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

var objects;
var controls = {
  cursors: '', gunKey: '', interactKey: '', dropKey: ''
};
var game = new Phaser.Game(config);

function preload(){
    this.load.image('sky', '../../assets/images/scene/sky.png');
    this.load.image('ground', '../../assets/images/scene/platform.png');
    this.load.spritesheet('dudeWalk',
        '../../assets/images/run/run.png',{
        frameWidth: 50,frameHeight: 42 }
    );
    this.load.spritesheet('dudeShoot',
        '../../assets/images/shoot/shoot.png',{
        frameWidth: 50,frameHeight: 42 }
    );
    this.load.spritesheet('dudeidle',
        '../../assets/images/idle/idle.png',{
        frameWidth: 50,frameHeight: 42 }
    );
    this.load.spritesheet('dudeCrouch',
        '../../assets/images/crouch/crouch.png',{
        frameWidth: 50,frameHeight: 42 }
    );
    /*this.load.spritesheet(){ frameWidth: 32, frameHeight:48 }
    Esto carga un conjunto de sprites en un array, por lo que el nombre clave del array que pongamos seguido de un [x] nos mostrará distintos sprites de un mismo personaje. Así se usarán para animar.
*/
}
var platforms;
function create(){
    this.add.image(400,300,'sky');
    platforms = this.physics.add.staticGroup();
    platforms.create(400,568,'ground').setScale(2).refreshBody();
    platforms.create(600,470,'ground');
    platforms.create(90,370,'ground');
    platforms.create(580,310,'ground');


    player = this.physics.add.sprite(100, 450, 'dudeidle');
    this.physics.add.collider(player, platforms);
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
    count = 0;

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

    //Move left
    if (controls.cursors.left.isDown && CountShoot==0 && subido==true) {
        console.log(player.body.position.x);
        player.setVelocityX(-160);
        player.flipX = true;
        player.anims.play('left', true);
    }

    //Move right
    if (controls.cursors.right.isDown && CountShoot==0 && subido==true)
    {
        console.log(player.body.position.x);
        player.setVelocityX(160);
        player.flipX = false;
        if(player.body.touching.down){
          player.anims.play('right', true);
        }
        else{
          player.anims.play('right', false);
        }
    }

    if (controls.cursors.up.isDown && player.body.touching.down && CountShoot==0 && subido==true)
    {
        bajado=false;
        player.setVelocityY(-330);
    }



    if((controls.gunKey.isDown || CountShoot!=0) && subido==true){
        player.anims.play('attack',true);
        CountShoot++;
        if(player.anims.currentFrame.index == 5)
          CountShoot = 0;
        console.log(player.anims.currentFrame.index);
        player.setVelocityX(0);
    }

    if(player.body.touching.down && !controls.cursors.right.isDown && !controls.cursors.left.isDown && !controls.cursors.up.isDown && CountShoot==0 && subido==true){
        player.anims.play('idle',true);
        player.setVelocityX(0);
    }


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
