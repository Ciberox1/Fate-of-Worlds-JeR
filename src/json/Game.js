var config={
    width:800,
    height:600,
    type: Phaser.AUTO,
    
   physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
   },
       
    scene:{
        preload:preload,
        create:create,
        update:update
    },

}

var game= new Phaser.Game(config);

function preload(){
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dudeWalk', 
        'assets/run/run.png',{
        frameWidth: 50,frameHeight:42 }
    );
    this.load.spritesheet('dudeShoot', 
        'assets/shoot/shoot.png',{
        frameWidth: 50,frameHeight:42 }
    );
    this.load.spritesheet('dudeidle', 
        'assets/idle/idle.png',{
        frameWidth: 50,frameHeight:42 }
    );
     this.load.spritesheet('dudeCrouch', 
        'assets/crouch/crouch.png',{
        frameWidth: 50,frameHeight:42 }
    );
    /*this.load.spritesheet(){ frameWidth: 32, frameHeight:48 }
    Esto carga un conjunto de sprites en un array, por lo que el nombre clave del array que pongamos seguido de un [x] nos mostrará distintos sprites de un mismo personaje. Así se usarán para animar.
*/
}
var platforms;
function create(){
    this.add.image(400,300,'sky');
    platforms=this.physics.add.staticGroup();
    platforms.create(400,568,'ground').setScale(2).refreshBody();
    platforms.create(600,400,'ground');
    platforms.create(50,250,'ground');
    platforms.create(750,220,'ground');
    
    
    player = this.physics.add.sprite(100, 450, 'dudeidle');
    this.physics.add.collider(player, platforms);
    player.body.setSize(6,42);
    
    keyW=this.input.keyboard.addKey('W');
    cursors = this.input.keyboard.createCursorKeys();
    
    
    player.setCollideWorldBounds(true);

    CountShoot=0;
    bajado=false;
/*this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 13 }),
    frameRate: 10,
    repeat: -1
});*/

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
    
     if (cursors.left.isDown&&CountShoot==0&&bajado==false)
{
    player.setVelocityX(-160);

    player.anims.play('left', true);
}
if (cursors.right.isDown&&CountShoot==0&&bajado==false)
{
    console.log("right");
    player.setVelocityX(160);
    if(player.body.touching.down){
     player.anims.play('right', true);
    }
    else{
        player.anims.play('right', false);
    }
}
      
if (cursors.up.isDown && player.body.touching.down&&CountShoot==0&&bajado==false)
{
    bajado=false;
    player.setVelocityY(-330);
}
    

 
if(keyW.isDown||CountShoot!=0&&bajado==false){
        player.anims.play('attack',true);
        CountShoot++;
     if(player.anims.currentFrame.index==5)
       CountShoot=0;
    }
    


if(player.body.touching.down&&!cursors.right.isDown&&!cursors.left.isDown&&!cursors.up.isDown&&CountShoot==0&& bajado==false){
     player.anims.play('idle',true);
     player.setVelocityX(0);
    }
    
    
    //hacer que se levante el muñeco
    if(cursors.down.isDown&&bajado==true){
        console.log(player.anims.currentFrame.index);
        if(player.anims.currentFrame.index==6){
            console.log("GetUp");
        player.anims.play("GetUp",true);
               player.anims.play(player.anims.play("idle"));
             bajado=false;
        }
            
    }
   if (cursors.down.isDown && player.body.touching.down&&CountShoot==0)
     {
         console.log("Down");
        bajado=true;
    if(player.anims.currentFrame.index<5){
            
         player.anims.play('Crouch',true);
    }

}

    
    
    
}