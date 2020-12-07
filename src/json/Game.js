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
var iter = 0;
var game = new Phaser.Game(config);

function preload() {
    this.load.image('lab', '../../assets/images/enviroment/labtileset/backgrounds/1038-0.png');
    this.load.image('ground', '../../assets/images/test/platform.png');
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

    lab = this.add.tileSprite(400, 200, 32000, 400, 'lab');
    tween = this.tweens.addCounter({
        from: 1,
        to: 2,
        duration: 5000,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
    });

    objects.platforms = this.physics.add.staticGroup();
    objects.platforms.create(0, 384, 'ground').setScale(12.5, 1).refreshBody();
    objects.platforms.create(0, 200, 'ground').setScale(0.1, 12).refreshBody();
    objects.platforms.create(380, 100, 'ground').setScale(0.1, 9).refreshBody();
    objects.platforms.create(175, 10, 'ground');
    objects.platforms.create(400, 255, 'ground').setScale(0.2, 1.1).refreshBody();
    objects.platforms.create(675, 350, 'ground').setScale(0.7, 2).refreshBody();
    objects.platforms.create(645, 280, 'ground').setScale(0.3, 5).refreshBody();
    objects.platforms.create(710, 290, 'ground').setScale(0.25, 2).refreshBody();
    objects.platforms.create(925, 200, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(1200, 250, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(1450, 225, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(1720, 300, 'ground').setScale(0.2, 6).refreshBody();
    objects.platforms.create(1780, 320, 'ground').setScale(0.2, 4).refreshBody();
    objects.platforms.create(1840, 340, 'ground').setScale(0.2, 2).refreshBody();
    objects.platforms.create(2100, 100, 'ground').setScale(0.2, 9).refreshBody();
    objects.platforms.create(2700, 300, 'ground').setScale(0.2, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(2900, 200, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(3100, 275, 'ground').setScale(0.2, 9).refreshBody();
    objects.platforms.create(3350, 200, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(3650, 250, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(3750, 150, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(3950, 150, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(5250, 384, 'ground').setScale(5, 1).refreshBody();
    objects.platforms.create(4290, 125, 'ground').setScale(0.2, 9).refreshBody();
    objects.platforms.create(4350, 275, 'ground').setScale(0.5, 1.5).refreshBody();
    objects.platforms.create(4700, 225, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(5000, 250, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(5300, 250, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(5500, 150, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(5800, 100, 'ground').setScale(0.2, 9).refreshBody();
    objects.platforms.create(6200, 350, 'ground').setScale(1, 4).refreshBody();
    objects.platforms.create(6250, 250, 'ground').setScale(0.75, 3).refreshBody();
    objects.platforms.create(6625, 150, 'ground').setScale(0.4, 1).refreshBody();
    objects.platforms.create(6850, 355, 'ground').setScale(0.4, 1).refreshBody();
    objects.platforms.create(7200, 250, 'ground').setScale(0.4, 1).refreshBody();
    objects.platforms.create(7200, 384, 'ground').setScale(0.4, 1).refreshBody();
    objects.platforms.create(7450, 325, 'ground').setScale(0.25, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(7450, 150, 'ground').setScale(0.4, 1).refreshBody();
    objects.platforms.create(7600, 355, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(7750, 150, 'ground').setScale(0.3, 1).refreshBody();
    objects.platforms.create(7950, 355, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(8050, 150, 'ground').setScale(0.4, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(8200, 355, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(8450, 355, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(8325, 200, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(8675, 300, 'ground').setScale(0.4, 1).refreshBody();
    objects.platforms.create(8925, 200, 'ground').setScale(0.3, 1).refreshBody();
    objects.platforms.create(8950, 355, 'ground').setScale(0.4, 1).refreshBody();
    objects.platforms.create(9200, 200, 'ground').setScale(0.3, 1).refreshBody();
    objects.platforms.create(9325, 355, 'ground').setScale(0.7, 1).refreshBody();
    objects.platforms.create(9500, 150, 'ground').setScale(0.4, 1).refreshBody();
    objects.platforms.create(9600, 300, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(9800, 250, 'ground').setScale(0.4, 1).refreshBody();
    objects.platforms.create(10100, 175, 'ground').setScale(0.3, 1).refreshBody();
    objects.platforms.create(10470, 325, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(10750, 325, 'ground').setScale(0.4, 1).refreshBody();
    objects.platforms.create(11000, 275, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(11300, 384, 'ground').setScale(0.4, 2).refreshBody(); //esta aparece colapsando
    objects.platforms.create(11550, 300, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(11800, 250, 'ground').setScale(0.3, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(12100, 300, 'ground').setScale(0.4, 7).refreshBody();
    objects.platforms.create(12425, 200, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(13925, 384, 'ground').setScale(6, 1).refreshBody();

    player = this.physics.add.sprite(100, 100, 'dudeidle');

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
    //lab.tileScaleX = tween.getValue();
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
