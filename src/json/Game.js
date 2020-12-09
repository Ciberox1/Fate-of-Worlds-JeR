var config = {
    width: 1500,
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
    this.load.image('lab', '../../assets/Images/Enviroment/LabTileset/Backgrounds/1038-0.png');
    this.load.image('ground', '../../assets/Images/Test/platform.png');

    /*Imágenes necesarias para los sprites del mundo*/
    this.load.image('whiteLabGround', '../../assets/Images/Enviroment/LabTileset/Lab Items/Suelo laboratorio.png'); /*Suelo del laboratorio 1*/
    this.load.image('blackBeamV', '../../assets/Images/Enviroment/Space runner/Viga Vertical Larga.png'); /*Viga vert. negra 1 (bordes del mapa)*/
    this.load.image('blackBeamH', '../../assets/Images/Enviroment/Subway/Viga horizontal negra.png'); /*Techo*/
    this.load.image('fan', '../../assets/Images/Enviroment/Warped city/Ventilación 1.png'); /*Ventilador*/
    this.load.image('box', '../../assets/Images/Enviroment/Subway/Box.png'); /*Cajas*/
    this.load.image('platform1', '../../assets/Images/Enviroment/Subway/Plataforma horizontal infinita 2.png'); /*platafromas con rayas*/
    this.load.image('redBeamV', '../../assets/Images/Enviroment/Subway/Viga roja larga.png'); /*platafromas con rayas*/
    this.load.image('wires', '../../assets/Images/Enviroment/Subway/Cable colgante.png'); /*cables colgantes*/
    this.load.image('lamp1', '../../assets/Images/Enviroment/Subway/Lámpara colgante.png'); /*lámpara colgante pequeña*/
    this.load.image('signalR', '../../assets/Images/Enviroment/Subway/Flecha emergencia derecha.png'); /*flecha derecha*/
    this.load.image('emergency', '../../assets/Images/Enviroment/Space runner/Luz de emergencia.png'); /*luz emergencia*/
    this.load.image('cone', '../../assets/Images/Enviroment/Subway/Cono.png'); /*conos*/
    /*Fin imágenes necesarias para los sprites del mundo*/

    //sprites del personaje y relacionados
    this.load.image('heart', '../../assets/Images/Protagonista/Mario 1/Heart.png')
    this.load.image('bala', '../../assets/Images/Protagonista/Mario 1/bala.png');
    this.load.spritesheet('Mario1Walk',
        '../../assets/Images/Protagonista/Mario 1/Run.png', {
            frameWidth: 64,
            frameHeight: 48
        }
    );
    this.load.spritesheet('Mario1Aim',
        '../../assets/Images/Protagonista/Mario 1/Aim.png', {
            frameWidth: 64,
            frameHeight: 48
        }
    );
    this.load.spritesheet('Mario1idle',
        '../../assets/Images/Protagonista/Mario 1/Idle.png', {
            frameWidth: 64,
            frameHeight: 48
        }
    );
    this.load.spritesheet('Mario1Shoot',
        '../../assets/Images/Protagonista/Mario 1/Shoot.png', {
            frameWidth: 64,
            frameHeight: 48
        }
    );
    this.load.spritesheet('Mario1Jump',
        '../../assets/Images/Protagonista/Mario 1/Jump.png', {
            frameWidth: 64,
            frameHeight: 48
        }
    );

    this.load.spritesheet('heartAnim',
        '../../assets/Images/Protagonista/Mario 1/Heart.png', {
            frameWidth: 18,
            frameHeight: 18
        }
    );


    /************Fin de carga de sprites del juego**********/



    var moabKeys = false;
    if (moabKeys == true) {
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

}

function create() {
    warp = false;

    lab = this.add.tileSprite(400, 200, 24000, 400, 'lab');
    lab2 = this.add.tileSprite(12400, 200, 16000, 400, 'lab');
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
    objects.platforms.create(14000, 384, 'ground').setScale(6.3, 1).refreshBody();
    objects.platforms.create(13000, 100, 'ground').setScale(0.2, 9).refreshBody();
    objects.platforms.create(13400, 350, 'ground').setScale(0.2, 4).refreshBody();
    objects.platforms.create(13800, 275, 'ground').setScale(0.1, 1).refreshBody();
    objects.platforms.create(14300, 275, 'ground').setScale(0.1, 1).refreshBody();
    objects.platforms.create(14800, 275, 'ground').setScale(0.1, 1).refreshBody();
    objects.platforms.create(15200, 350, 'ground').setScale(0.2, 4).refreshBody();
    objects.platforms.create(15275, 310, 'ground').setScale(0.2, 6).refreshBody();
    objects.platforms.create(15500, 300, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(15550, 200, 'ground').setScale(0.25, 1).refreshBody();
    objects.platforms.create(15700, 350, 'ground').setScale(0.5, 1).refreshBody();
    objects.platforms.create(15800, 200, 'ground').setScale(0.25, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(16000, 290, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(16300, 330, 'ground').setScale(0.4, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(16300, 225, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(16600, 175, 'ground').setScale(0.4, 1).refreshBody();
    objects.platforms.create(16950, 350, 'ground').setScale(0.3, 1).refreshBody();
    objects.platforms.create(17100, 275, 'ground').setScale(0.3, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(17000, 200, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(17200, 125, 'ground').setScale(0.2, 1).refreshBody();
    objects.platforms.create(17500, 275, 'ground').setScale(0.3, 1).refreshBody();
    objects.platforms.create(17650, 370, 'ground').setScale(0.4, 1).refreshBody();
    objects.platforms.create(17700, 175, 'ground').setScale(0.3, 1).refreshBody();
    objects.platforms.create(17850, 275, 'ground').setScale(0.3, 1).refreshBody();
    objects.platforms.create(18150, 225, 'ground').setScale(0.4, 1).refreshBody();
    objects.platforms.create(18250, 350, 'ground').setScale(0.3, 1).refreshBody();
    objects.platforms.create(18475, 350, 'ground').setScale(0.2, 7).refreshBody();
    objects.platforms.create(18475, 50, 'ground').setScale(0.2, 6).refreshBody();
    objects.platforms.create(19100, 384, 'ground').setScale(3, 1).refreshBody();
    objects.platforms.create(18535, 350, 'ground').setScale(0.1, 4).refreshBody();
    objects.platforms.create(18750, 225, 'ground').setScale(0.4, 1).refreshBody();
    objects.platforms.create(19050, 175, 'ground').setScale(0.4, 1).refreshBody();
    objects.platforms.create(19400, 300, 'ground').setScale(0.4, 6).refreshBody(); //sobre esto aparecera el terminal para acabar el juego
    objects.platforms.create(19500, 200, 'ground').setScale(0.1, 12).refreshBody();
    objects.platforms.create(19100, 0, 'ground').setScale(3, 1).refreshBody();

    //Plataformas del mundo 2

    /*-----------------------------------------------------Sprites----------------------------------------------------------*/
    /*Suelo blanco del lab*/
    this.add.tileSprite(0, 370, 2500, 30, 'whiteLabGround').setOrigin(0, 0);

    /*Verticales*/
    this.add.tileSprite(0, 25, 16, 350, 'blackBeamV').setScale(1.2, 1).setOrigin(0, 0);
    this.add.tileSprite(360, 25, 16, 248, 'blackBeamV').setScale(2.5, 1).setOrigin(0, 0);
    this.add.tileSprite(915, 190, 16, 180, 'redBeamV').setScale(1.3, 1).setOrigin(0, 0);
    this.add.tileSprite(2060, 0, 16, 244, 'blackBeamV').setScale(2.7, 1).setOrigin(0, 0);
    this.add.tileSprite(2095, 0, 16, 244, 'blackBeamV').setScale(2.8, 1).setOrigin(0, 0);
    /*Techos*/
    this.add.tileSprite(0, 0, 430, 16, 'blackBeamH').setScale(1, 1.6).setOrigin(0, 0);

    /*Plataformas*/
    this.add.image(395, 238, 'fan').setScale(1.6, 1.8).setOrigin(0, 0);
    this.add.image(535, 316, 'box').setScale(1.55, 1.8).setOrigin(0, 0);
    this.add.image(584, 316, 'box').setScale(1.55, 1.8).setOrigin(0, 0);
    this.add.image(633, 316, 'box').setScale(1.55, 1.8).setOrigin(0, 0);
    this.add.image(682, 316, 'box').setScale(1.55, 1.8).setOrigin(0, 0);
    this.add.image(731, 316, 'box').setScale(1.55, 1.8).setOrigin(0, 0);
    this.add.image(780, 316, 'box').setScale(1.3, 1.8).setOrigin(0, 0);
    this.add.image(584, 256, 'box').setScale(0.9, 2.2).setOrigin(0, 0);
    this.add.image(613, 256, 'box').setScale(1.55, 2.2).setOrigin(0, 0);
    this.add.image(662, 256, 'box').setScale(1.55, 2.2).setOrigin(0, 0);
    this.add.image(711, 256, 'box').setScale(1.55, 2.2).setOrigin(0, 0);
    this.add.image(584, 197, 'box').setScale(1.55, 2.2).setOrigin(0, 0);
    this.add.image(633, 197, 'box').setScale(1.55, 2.2).setOrigin(0, 0);
    this.add.image(682, 197, 'box').setScale(0.9, 2.2).setOrigin(0, 0);
    this.add.image(1680, 308, 'box').setScale(2, 2).setOrigin(0, 0);
    this.add.image(1744, 308, 'box').setScale(2, 2).setOrigin(0, 0);
    this.add.image(1808, 308, 'box').setScale(2.25, 2).setOrigin(0, 0);
    this.add.image(1680, 256, 'box').setScale(2.4, 1.9).setOrigin(0, 0);
    this.add.image(1756, 256, 'box').setScale(2, 1.9).setOrigin(0, 0);
    this.add.image(1680, 204, 'box').setScale(2.5, 1.85).setOrigin(0, 0);

    this.add.image(885, 183, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(1160, 234, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(1410, 209, 'platform1').setScale(1, 2.3).setOrigin(0, 0);

    /*Decoraciones*/
    this.add.image(150, 25, 'wires').setScale(1.5, 1.5).setOrigin(0, 0);
    this.add.image(135, 25, 'lamp1').setScale(1.5, 1.5).setOrigin(0, 0);
    this.add.image(213, 25, 'lamp1').setScale(1.5, 1.5).setOrigin(0, 0);
    this.add.image(370, 280, 'signalR').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(2080, 280, 'signalR').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(158, 255, 'emergency').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(288, 255, 'emergency').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(2480, 350, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);
    /*------------------------------------------------Fin sprites-----------------------------------------------------------*/



    //adding physics
    player = this.physics.add.sprite(200, 320, 'Mario1idle');
    this.physics.add.collider(player, objects.platforms);
    widthPlayer = 5;
    heightPlayer = 36;

    //camera control
    camera = this.cameras.main;
    camera.setPosition(0, 0);
    camera.setSize(800, 400);
    camera.setBackgroundColor('#777777');
    camera.setBounds(0, 0, 19500, 400);
    camera.startFollow(player);

    //size player
    player.body.setSize(widthPlayer, heightPlayer);
    player.setCollideWorldBounds(false);
    //adding hearts

    hearts = this.add.group();
    let heart1 = this.add.sprite(player.body.position.x + 620 + 20 * 0, player.body.position.y - 260, 'heartAnim');
    hearts.add(heart1);
    let heart2 = this.add.sprite(player.body.position.x + 620 + 20 * 1, player.body.position.y - 260, 'heartAnim');
    hearts.add(heart2);
    let heart3 = this.add.sprite(player.body.position.x + 620 + 20 * 2, player.body.position.y - 260, 'heartAnim');
    hearts.add(heart3);



    //shooting booleans
    balaActiva = false;
    balaDisparada = false;
    ShootDirection = "";
    canShoot = true;
    //animations
    createAnims();
    hearts.playAnimation('heart');
}

function createAnims() {

    game.anims.create({
        key: 'Mario1Walk',
        frames: game.anims.generateFrameNumbers('Mario1Walk', {
            start: 1,
            end: 13
        }),
        frameRate: 10,
        repeat: -1
    });

    game.anims.create({
        key: 'idleMario1',
        frames: game.anims.generateFrameNumbers('Mario1idle', {
            start: 0,
            end: 4
        }),
        frameRate: 6
    });

    game.anims.create({
        key: 'Mario1Shoot',
        frames: game.anims.generateFrameNumbers('Mario1Shoot', {
            start: 0,
            end: 5
        }),
        frameRate: 10,
        repeat: 0
    });
    game.anims.create({
        key: 'Mario1JumpStart',
        frames: game.anims.generateFrameNumbers('Mario1Jump', {
            frames: [0, 1, 2, 3, 4, 3, 4, 3, 2, 1, 0]
        }),
        frameRate: 30,
        repeat: 0
    });
    game.anims.create({
        key: 'Mario1JumpEnd',
        frames: game.anims.generateFrameNumbers('Mario1Jump', {
            start: 4,
            end: 0
        }),
        frameRate: 60,
        repeat: 0
    });

    game.anims.create({
        key: 'heart',
        frames: game.anims.generateFrameNumbers('heartAnim', {
            start: 0,
            end: 8
        }),
        frameRate: 10,
        repeat: -1
    });
}

function update() {

    console.log(player.x + ", " + player.y);

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
        warp = true;
    if (warp)
        lab2.tileScaleX = tween.getValue();
    // Muerte por caida (jugador 1)
    if (player.y > 400) {
        playerState = playerStateList["movingLeft"];
        this.registry.destroy();
        this.events.off();
        this.scene.restart();
    }

    //draw hearts in screen according to camera´s position
    hearts.setXY((camera.worldView.x + camera.worldView.width - 60), (camera.worldView.y + 20), 20);

    // sirve para originar la bala dependiendo de hacia donde mire el personaje
    if (balaDisparada == true) {
        if (ShootDirection == "right") {
            bala = this.physics.add.sprite(player.body.position.x + 30, player.body.position.y + heightPlayer / 2 - 5, 'bala');
            this.physics.add.collider(bala, objects.platforms, Killbala);
        } else if (ShootDirection == "left") {
            bala = this.physics.add.sprite(player.body.position.x - 30, player.body.position.y + heightPlayer / 2 - 5, 'bala');
            this.physics.add.collider(bala, objects.platforms, Killbala);
        }
        bala.setGravityY(-490);
        balaDisparada = false;
        balaActiva = true;
        bala.setScale(0.5);
    }
    //sirve para dar velocidad una vez se crea la bala
    if (balaActiva == true) {
        if (ShootDirection == "right")
            bala.setVelocityX(300);
        else if (ShootDirection == "left") {
            bala.setVelocityX(-300);
        }
    }

    if (balaActiva == true && bala.body.position.x < (camera.worldView.x + camera.worldView.width) && bala.body.position.x > camera.worldView.x) {
        canShoot = false;
    } else if (balaActiva == true && (bala.body.position.x > (camera.worldView.x + camera.worldView.width) ||
            bala.body.position.x < camera.worldView.x)) {
        bala.destroy();
        balaActiva = false;
        canShoot = true;
    }


}

function Idle() {
    player.anims.play('idleMario1', true);
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
    if (canShoot == true) {
        if (controls.gunKey.isDown) {
            playerState = playerStateList["shooting"];
        }
    }
}

function Left() {
    //Move left
    if (player.flipX == false) {
        player.body.position.x -= 12;
    }

    player.setVelocityX(-160);
    player.anims.play('Mario1Walk', true);
    player.flipX = true;




    if (controls.cursors.left.isUp && playerState === playerStateList["movingLeft"]) {
        playerState = playerStateList["idle"];
    }

    //Jump
    if (controls.cursors.up.isDown) {
        playerState = playerStateList["canJump"];
    }

    //Shooting
    if (canShoot == true) {
        if (controls.gunKey.isDown) {
            playerState = playerStateList["shooting"];
        }
    }

}

function Right() {

    if (player.flipX == true) {
        player.body.position.x += 12;
    }
    //Move right
    player.setVelocityX(160);
    player.flipX = false;
    if (player.body.touching.down) {
        player.anims.play('Mario1Walk', true);
    }

    if (controls.cursors.right.isUp && playerState === playerStateList["movingRight"]) {
        playerState = playerStateList["idle"];
    }

    //Jump
    if (controls.cursors.up.isDown) {
        playerState = playerStateList["canJump"];
    }

    //Shooting
    if (canShoot == true) {
        if (controls.gunKey.isDown) {
            playerState = playerStateList["shooting"];
        }
    }

}

function CanJump() {
    if (controls.cursors.up.isDown && player.body.touching.down) {
        player.anims.play('Mario1JumpStart', true);
        playerState = playerStateList["jumping"];
    }

    /**/
    else {
      playerState = playerStateList["idle"];
    }
    //*/
}

function Jump() {
    //to control the jumping animation
    if (player.anims.currentAnim.key == "Mario1JumpStart" && player.anims.currentFrame.index == 5)
        player.setVelocityY(-330);

    else if (player.anims.currentFrame.index == 6) {
        player.anims.stop(player.anims.currentAnim.frames[5], false);
    }

    if (player.body.touching.down && player.anims.currentFrame.index == 6) {
        player.setVelocityX(0);
        player.anims.play('Mario1JumpEnd', true);
    }



    //Left
    if (controls.cursors.left.isDown && controls.cursors.right.isUp) {
        if (player.flipX == false) {
            player.body.position.x -= 10;
        }
        player.setVelocityX(-150);
        player.flipX = true;
    } else if (controls.cursors.right.isDown && controls.cursors.left.isUp) {
        if (player.flipX == true) {
            player.body.position.x += 10;
        }
        player.setVelocityX(150);
        player.flipX = false;
    }


    if (player.anims.currentAnim.key == "Mario1JumpEnd" && player.anims.currentFrame.index == 5) {
        if (player.body.touching.down) {
            playerState = playerStateList["idle"];
        }

        if (player.body.touching.down && controls.gunKey.isDown) {
            playerState = playerStateList["shooting"];
        }

    }


}

function Shooting() {
    if (canShoot == true) {
        if (player.flipX == false) {
            ShootDirection = "right";
        } else if (player.flipX == true) {
            ShootDirection = "left";
        }
        player.anims.play('Mario1Shoot', true);
        if (player.anims.currentFrame.index == 5) {
            balaDisparada = true;
            playerState = playerStateList["idle"];
        }
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

function Killbala() {
    bala.destroy();
    canShoot = true;
    balaActiva = false;
}
