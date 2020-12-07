
var config = {
    width: 16000,
    height: 800,
    type: Phaser.AUTO,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 490
            },
            debug: false
        }
    },

    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var objects = {
    platforms: '',
    bullets: ''
};
var controls = {
    cursors: '',
    gunKey: '',
    interactKey: '',
    dropKey: ''
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
var warp = false;
var game = new Phaser.Game(config);

function preload() {
    this.load.image('lab', '../../assets/images/enviroment/labtileset/backgrounds/1038-0.png');
    this.load.image('platform', '../../assets/images/test/platform.png');
    
    /*Imágenes necesarias para los sprites del mundo*/
    this.load.image('whiteLabGround', '../../assets/Images/Enviroment/LabTileset/Lab Items/Suelo laboratorio.png');/*Suelo del laboratorio 1*/
    this.load.image('blackBeamV', '../../assets/Images/Enviroment/Space runner/Viga Vertical Larga.png');/*Viga vert. negra 1 (bordes del mapa)*/
    this.load.image('blackBeamH', '../../assets/Images/Enviroment/Subway/Viga horizontal negra.png');/*Techo*/
    this.load.image('fan', '../../assets/Images/Enviroment/Warped city/Ventilación 1.png');/*Ventilador*/
    this.load.image('box', '../../assets/Images/Enviroment/Subway/Box.png');/*Cajas*/
    /*Fin imágenes necesarias para los sprites del mundo*/
    
    
    this.load.spritesheet('dudeWalk',
        '../../assets/images/test/run.png', {
            frameWidth: 50,
            frameHeight: 42
        }
    );
    this.load.spritesheet('dudeShoot',
        '../../assets/images/test/shoot.png', {
            frameWidth: 50,
            frameHeight: 42
        }
    );
    this.load.spritesheet('dudeidle',
        '../../assets/images/test/idle.png', {
            frameWidth: 50,
            frameHeight: 42
        }
    );
    this.load.spritesheet('dudeCrouch',
        '../../assets/images/test/crouch.png', {
            frameWidth: 50,
            frameHeight: 42
        }
    );
    /*this.load.spritesheet(){ frameWidth: 32, frameHeight:48 }
    Esto carga un conjunto de sprites en un array, por lo que el nombre clave del array que pongamos seguido de un [x] nos mostrará distintos sprites de un mismo personaje. Así se usarán para animar.
    */
    
}

function create() {

    lab = this.add.tileSprite(400, 200, 24000, 400, 'lab');
    lab2 = this.add.tileSprite(12400, 200, 8000, 400, 'lab');
    tween = this.tweens.addCounter({
        from: 1,
        to: 2,
        duration: 5000,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
    });
    
    /*Plataformas invisibles*/
    objects.platforms = this.physics.add.staticGroup();
    objects.platforms.create(0, 384, 'platform').setScale(12.5, 0.88).refreshBody();
    objects.platforms.create(0, 200, 'platform').setScale(0.1, 12).refreshBody();
    objects.platforms.create(380, 100, 'platform').setScale(0.1, 9).refreshBody();
    objects.platforms.create(175, 10, 'platform');
    objects.platforms.create(400, 255, 'platform').setScale(0.2, 1.1).refreshBody();
    objects.platforms.create(675, 350, 'platform').setScale(0.7, 2).refreshBody();
    objects.platforms.create(645, 280, 'platform').setScale(0.3, 5).refreshBody();
    objects.platforms.create(710, 290, 'platform').setScale(0.25, 2).refreshBody();
    objects.platforms.create(925, 200, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(1200, 250, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(1450, 225, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(1720, 300, 'platform').setScale(0.2, 6).refreshBody();
    objects.platforms.create(1780, 320, 'platform').setScale(0.2, 4).refreshBody();
    objects.platforms.create(1840, 340, 'platform').setScale(0.2, 2).refreshBody();
    objects.platforms.create(2100, 100, 'platform').setScale(0.2, 9).refreshBody();
    objects.platforms.create(2700, 300, 'platform').setScale(0.2, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(2900, 200, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(3100, 275, 'platform').setScale(0.2, 9).refreshBody();
    objects.platforms.create(3350, 200, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(3650, 250, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(3750, 150, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(3950, 150, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(5250, 384, 'platform').setScale(5, 1).refreshBody();
    objects.platforms.create(4290, 125, 'platform').setScale(0.2, 9).refreshBody();
    objects.platforms.create(4350, 275, 'platform').setScale(0.5, 1.5).refreshBody();
    objects.platforms.create(4700, 225, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(5000, 250, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(5300, 250, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(5500, 150, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(5800, 100, 'platform').setScale(0.2, 9).refreshBody();
    objects.platforms.create(6200, 350, 'platform').setScale(1, 4).refreshBody();
    objects.platforms.create(6250, 250, 'platform').setScale(0.75, 3).refreshBody();
    objects.platforms.create(6625, 150, 'platform').setScale(0.4, 1).refreshBody();
    objects.platforms.create(6850, 355, 'platform').setScale(0.4, 1).refreshBody();
    objects.platforms.create(7200, 250, 'platform').setScale(0.4, 1).refreshBody();
    objects.platforms.create(7200, 384, 'platform').setScale(0.4, 1).refreshBody();
    objects.platforms.create(7450, 325, 'platform').setScale(0.25, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(7450, 150, 'platform').setScale(0.4, 1).refreshBody();
    objects.platforms.create(7600, 355, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(7750, 150, 'platform').setScale(0.3, 1).refreshBody();
    objects.platforms.create(7950, 355, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(8050, 150, 'platform').setScale(0.4, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(8200, 355, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(8450, 355, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(8325, 200, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(8675, 300, 'platform').setScale(0.4, 1).refreshBody();
    objects.platforms.create(8925, 200, 'platform').setScale(0.3, 1).refreshBody();
    objects.platforms.create(8950, 355, 'platform').setScale(0.4, 1).refreshBody();
    objects.platforms.create(9200, 200, 'platform').setScale(0.3, 1).refreshBody();
    objects.platforms.create(9325, 355, 'platform').setScale(0.7, 1).refreshBody();
    objects.platforms.create(9500, 150, 'platform').setScale(0.4, 1).refreshBody();
    objects.platforms.create(9600, 300, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(9800, 250, 'platform').setScale(0.4, 1).refreshBody();
    objects.platforms.create(10100, 175, 'platform').setScale(0.3, 1).refreshBody();
    objects.platforms.create(10470, 325, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(10750, 325, 'platform').setScale(0.4, 1).refreshBody();
    objects.platforms.create(11000, 275, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(11300, 384, 'platform').setScale(0.4, 2).refreshBody(); //esta aparece colapsando
    objects.platforms.create(11550, 300, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(11800, 250, 'platform').setScale(0.3, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(12100, 300, 'platform').setScale(0.4, 7).refreshBody();
    objects.platforms.create(12425, 200, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(14000, 384, 'platform').setScale(6.3, 1).refreshBody();
    objects.platforms.create(13000, 100, 'platform').setScale(0.2, 9).refreshBody();
    objects.platforms.create(13400, 350, 'platform').setScale(0.2, 4).refreshBody();
    objects.platforms.create(13800, 275, 'platform').setScale(0.1, 1).refreshBody();
    objects.platforms.create(14300, 275, 'platform').setScale(0.1, 1).refreshBody();
    objects.platforms.create(14800, 275, 'platform').setScale(0.1, 1).refreshBody();
    objects.platforms.create(15200, 350, 'platform').setScale(0.2, 4).refreshBody();
    objects.platforms.create(15275, 310, 'platform').setScale(0.2, 6).refreshBody();
    objects.platforms.create(15500, 300, 'platform').setScale(0.2, 1).refreshBody();
    objects.platforms.create(15550, 200, 'platform').setScale(0.25, 1).refreshBody();
    objects.platforms.create(15700, 350, 'platform').setScale(0.5, 1).refreshBody();
    
    /*-----------------------------------------------------Sprites----------------------------------------------------------*/
    /*Suelo blanco del lab*/
    this.add.tileSprite(0,370,2500,30,'whiteLabGround').setOrigin(0,0);
    
    /*Verticales*/
    this.add.tileSprite(0,25,16,350,'blackBeamV').setScale(1.2,1).setOrigin(0,0);
    this.add.tileSprite(360,25,16,248,'blackBeamV').setScale(2.5,1).setOrigin(0,0);
    
    /*Techos*/
    this.add.tileSprite(0,0,430,16,'blackBeamH').setScale(1,1.6).setOrigin(0,0);
    
    /*Plataformas*/
    this.add.image(395,238,'fan').setScale(1.6,1.8).setOrigin(0,0);
    this.add.image(535,316,'box').setScale(1.55,1.8).setOrigin(0,0);
    this.add.image(584,316,'box').setScale(1.55,1.8).setOrigin(0,0);
    this.add.image(633,316,'box').setScale(1.55,1.8).setOrigin(0,0);
    this.add.image(682,316,'box').setScale(1.55,1.8).setOrigin(0,0);
    this.add.image(731,316,'box').setScale(1.55,1.8).setOrigin(0,0);
    this.add.image(780,316,'box').setScale(1.3,1.8).setOrigin(0,0);
    this.add.image(584,256,'box').setScale(0.9,2.2).setOrigin(0,0);
    this.add.image(613,256,'box').setScale(1.55,2.2).setOrigin(0,0);
    this.add.image(662,256,'box').setScale(1.55,2.2).setOrigin(0,0);
    this.add.image(711,256,'box').setScale(1.55,2.2).setOrigin(0,0);
    this.add.image(584,197,'box').setScale(1.55,2.2).setOrigin(0,0);
    this.add.image(633,197,'box').setScale(1.55,2.2).setOrigin(0,0);
    this.add.image(682,197,'box').setScale(0.9,2.2).setOrigin(0,0);
    
    /*Decoraciones*/
    /*------------------------------------------------Fin sprites-----------------------------------------------------------*/

    player = this.physics.add.sprite(634, 100, 'dudeidle');
    this.physics.add.collider(player, objects.platforms);
    player.body.setSize(6, 42);

    //Camera control
    this.cameras.main.setPosition(0, 0);
    this.cameras.main.setSize(800, 400);
    this.cameras.main.setBackgroundColor('#777777');
    this.cameras.main.setBounds(0, 0, 18000, 400);
    this.cameras.main.startFollow(player);

    var moabKeys = false;
    if (moabKeys) {
        //These are moab controls
        this.input.keyboard.removeAllKeys();
        controls.interactKey = this.input.keyboard.addKey('E');
        controls.gunKey = this.input.keyboard.addKey('W');
        controls.dropKey = this.input.keyboard.addKey('Q');
        controls.cursors = this.input.keyboard.createCursorKeys();
    } else {
        //These are WASD controls
        this.input.keyboard.removeAllKeys();
        controls.interactKey = this.input.keyboard.addKey('K');
        controls.gunKey = this.input.keyboard.addKey('J');
        controls.dropKey = this.input.keyboard.addKey('L');
        controls.cursors = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    //Makes player collide with borders, change if necessary
    player.setCollideWorldBounds(false);

    CountShoot = 0;
    bajando = false;
    bajadoComplete = false;
    subido = true;

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dudeWalk', {
            start: 0,
            end: 13
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('dudeidle', {
            start: 0,
            end: 4
        }),
        frameRate: 6,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dudeWalk', {
            start: 1,
            end: 13
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'attack',
        frames: this.anims.generateFrameNumbers('dudeShoot', {
            start: 0,
            end: 5
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'Crouch',
        frames: this.anims.generateFrameNumbers('dudeCrouch', {
            start: 0,
            end: 5
        }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'GetUp',
        frames: this.anims.generateFrameNumbers('dudeCrouch', {
            start: 5,
            end: 0
        }),
        frameRate: 10,
        repeat: 0
    });
}

function update() {

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
    if (player.x >= 13000)
        warp = true
    if (warp)
        lab2.tileScaleX = tween.getValue();
}

function Idle() {
    player.anims.play('idle', true);
    player.setVelocityX(0);

    //Move left
    if (controls.cursors.left.isDown) {
        playerState = playerStateList["movingLeft"];
    }

    //Move right
    if (controls.cursors.right.isDown) {
        playerState = playerStateList["movingRight"];
    }

    //Jump
    if (controls.cursors.up.isDown) {
        playerState = playerStateList["canJump"];
    }

    //Shooting
    if (controls.gunKey.isDown) {
        playerState = playerStateList["shooting"];
    }
}

function Left() {
    //Move left
    if (CountShoot == 0 && subido == true) {
        console.log(player.body.position.x);
        player.setVelocityX(-160);
        player.flipX = true;
        player.anims.play('left', true);
    }

    if (controls.cursors.left.isUp && playerState === playerStateList["movingLeft"]) {
        console.log("Stop moving left");
        playerState = playerStateList["idle"];
    }

    //Jump
    if (controls.cursors.up.isDown) {
        playerState = playerStateList["canJump"];
    }

    //Shooting
    if (controls.gunKey.isDown) {
        playerState = playerStateList["shooting"];
    }
}

function Right() {
    //Move right
    if (CountShoot == 0 && subido == true) {
        console.log(player.body.position.x);
        player.setVelocityX(160);
        player.flipX = false;
        player.anims.play('left', true);
    }

    if (controls.cursors.right.isUp && playerState === playerStateList["movingRight"]) {
        console.log("Stop moving right");
        playerState = playerStateList["idle"];
    }

    //Jump
    if (controls.cursors.up.isDown) {
        playerState = playerStateList["canJump"];
    }

    //Shooting
    if (controls.gunKey.isDown) {
        playerState = playerStateList["shooting"];
    }
}

function CanJump() {
    if (controls.cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
        playerState = playerStateList["jumping"];
    }
}

function Jump() {
    //Left
    if (controls.cursors.left.isDown && CountShoot == 0 && subido == true) {
        console.log(player.body.position.x);
        player.setVelocityX(-160);
        player.flipX = true;
        //player.anims.play('left', true);
    }

    //Right
    if (controls.cursors.right.isDown && CountShoot == 0 && subido == true) {
        console.log(player.body.position.x);
        player.setVelocityX(160);
        player.flipX = false;
        //player.anims.play('left', true);
    }

    // TODO: Fix jump state change
    if (player.body.touching.down && !controls.cursors.up.isDown) {
        playerState = playerStateList["idle"];
    }

    if (player.body.touching.down && controls.gunKey.isDown) {
        playerState = playerStateList["shooting"];
    }
}

function Shooting() {

    player.setVelocityX(0);
    player.anims.play('attack', true);
    CountShoot++;
    if (player.anims.currentFrame.index == 5)
        CountShoot = 0;


    if (controls.gunKey.isUp && CountShoot == 0) {
        playerState = playerStateList["idle"];
    }
}

function Crouching() {
    if (controls.cursors.down.isDown && player.body.touching.down && CountShoot == 0 && bajadoComplete == false) {
        if (bajando == false) {
            bajando = true;
            subido = false;
            console.log("Down");
            player.anims.play("Crouch", true);
        }
        player.once('animationcomplete', () => {
            console.log('animationcomplete')
            bajando = false;
            bajadoComplete = true;
        });
    }
}

function GettingUp() {
    //hacer que se levante el muñeco
    if (controls.cursors.down.isDown && bajadoComplete == true) {
        console.log("Getting up");
        player.anims.play("GetUp", true);
        console.log("AnimationDone");
        player.once('animationcomplete', () => {
            subido = true;
            bajadoComplete = false;
        });
    }
}
