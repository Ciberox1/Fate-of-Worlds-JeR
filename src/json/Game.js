var config = {

    width: 1500,
    height: 850,

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
    dropKey: '',
    collapseKey: ''
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
var collapse;
var collapsablePlats;

var game = new Phaser.Game(config);

var camera1, camera2, camera3;

function preload() {

    this.load.image('lab', '../../assets/Images/Enviroment/LabTileset/Backgrounds/fondo.png');
    this.load.image('lab2', '../../assets/Images/Enviroment/LabTileset/Backgrounds/fondo2R.png')

    this.load.image('ground', '../../assets/Images/Test/platform.png');
    this.load.image('collapsable', '../../assets/Images/Enviroment/Subway/Plataforma horizontal colapsable2.png');

    /*Imágenes necesarias para los sprites del mundo*/
    this.load.image('whiteLabGround', '../../assets/Images/Enviroment/LabTileset/Lab Items/Suelo laboratorio.png'); /*Suelo del laboratorio 1*/
    this.load.image('blackBeamV', '../../assets/Images/Enviroment/Space runner/Viga Vertical Larga.png'); /*Viga vert. negra 1 (bordes del mapa)*/
    this.load.image('blackBeamH', '../../assets/Images/Enviroment/Subway/Viga horizontal negra.png'); /*Techo*/
    this.load.image('fan', '../../assets/Images/Enviroment/Warped city/Ventilación 1.png'); /*Ventilador*/
    this.load.image('box', '../../assets/Images/Enviroment/Subway/Box.png'); /*Cajas*/
    this.load.image('platform1', '../../assets/Images/Enviroment/Subway/Plataforma horizontal2.png'); /*platafromas con rayas*/
    this.load.image('redBeamV', '../../assets/Images/Enviroment/Subway/Viga roja larga.png'); /*Viga roja vertical*/
    this.load.image('redBeamH', '../../assets/Images/Enviroment/Subway/Viga roja horizontal.png'); /*Viga roja horizontal*/
    this.load.image('wires', '../../assets/Images/Enviroment/Subway/Cable colgante.png'); /*cables colgantes*/
    this.load.image('lamp1', '../../assets/Images/Enviroment/Subway/Lámpara colgante.png'); /*lámpara colgante pequeña*/
    this.load.image('signalR', '../../assets/Images/Enviroment/Subway/Flecha emergencia derecha.png'); /*flecha derecha*/
    this.load.image('emergency', '../../assets/Images/Enviroment/Space runner/Luz de emergencia.png'); /*luz emergencia*/
    this.load.image('cone', '../../assets/Images/Enviroment/Subway/Cono.png'); /*conos*/
    this.load.image('beamCross', '../../assets/Images/Enviroment/Space runner/Cruce de vigas con verticales a los lados.png'); /*cruce de vigas*/
    this.load.image('metalPlate', '../../assets/Images/Enviroment/Subway/Plancha metal.png'); /*placa metálica*/
    this.load.image('vPipe', '../../assets/Images/Enviroment/Warped city/Tubería vertical.png'); /*tubería*/
    this.load.image('diagonalBeamB', '../../assets/Images/Enviroment/Space runner/Viga diagonal 1.png'); /*viga diagonal*/
    this.load.image('diagonalBeamB2', '../../assets/Images/Enviroment/Space runner/Viga diagonal 2.png'); /*viga diagonal*/
    this.load.image('machine', '../../assets/Images/Enviroment/Warped city/Máquina con pantalla.png'); /*viga diagonal*/
    /*Fin imágenes necesarias para los sprites del mundo*/

    //Sprites de objetos
    this.load.image('hpRestore', '../../assets/Images/Items/vida.png');

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
    this.load.spritesheet('Mario1idle', '../../assets/Images/Protagonista/Mario 1/Idle.png', {

        frameWidth: 64,
        frameHeight: 48
    });
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
    this.load.spritesheet('Amalgama',
        '../../assets/Images/Enemies/Amalgama/Trash Monster-Sprite sheet.png', {
            frameWidth: 64,
            frameHeight: 64
        }
    );


    /************Fin de carga de sprites del juego**********/



    var moabKeys = true;
    if (moabKeys == true) {
        //These are moab controls
        this.input.keyboard.removeAllKeys();
        controls.interactKey = this.input.keyboard.addKey('E');
        controls.gunKey = this.input.keyboard.addKey('W');
        controls.dropKey = this.input.keyboard.addKey('Q');
        controls.collapseKey = this.input.keyboard.addKey('SPACE');
        controls.cursors = this.input.keyboard.createCursorKeys();
    } else {
        //These are WASD controls
        this.input.keyboard.removeAllKeys();
        controls.interactKey = this.input.keyboard.addKey('K');
        controls.gunKey = this.input.keyboard.addKey('J');
        controls.dropKey = this.input.keyboard.addKey('L');
        controls.collapseKey = this.input.keyboard.addKey('SPACE');
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

    this.add.tileSprite(400, 200, 24000, 400, 'lab');
    lab = this.add.tileSprite(12400, 200, 16000, 400, 'lab');
    this.add.tileSprite(400, 650, 24000, 400, 'lab2');
    lab2 = this.add.tileSprite(12400, 650, 16000, 400, 'lab2');

    // Plataformas y muros del mundo de arriba
    objects.platforms = this.physics.add.staticGroup();
    objects.collapsable = this.physics.add.staticGroup();
    objects.platforms.create(0, 384, 'platform1').setScale(12.5, 1).refreshBody();
    objects.platforms.create(0, 200, 'platform1').setScale(0.1, 12).refreshBody();
    objects.platforms.create(380, 100, 'platform1').setScale(0.1, 9).refreshBody();
    objects.platforms.create(175, 10, 'platform1');
    objects.platforms.create(400, 255, 'platform1').setScale(0.2, 1.1).refreshBody();
    objects.platforms.create(675, 350, 'platform1').setScale(0.7, 2).refreshBody();
    objects.platforms.create(645, 280, 'platform1').setScale(0.3, 5).refreshBody();
    objects.platforms.create(710, 290, 'platform1').setScale(0.25, 2).refreshBody();
    objects.platforms.create(925, 200, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(1200, 250, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(1450, 225, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(1720, 300, 'platform1').setScale(0.2, 6).refreshBody();
    objects.platforms.create(1780, 320, 'platform1').setScale(0.2, 4).refreshBody();
    objects.platforms.create(1840, 340, 'platform1').setScale(0.2, 2).refreshBody();
    objects.platforms.create(2100, 100, 'platform1').setScale(0.2, 9).refreshBody();
    objects.collapsable.create(2700, 300, 'collapsable').setScale(0.2, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(2900, 200, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(3100, 275, 'platform1').setScale(0.2, 9).refreshBody();
    objects.platforms.create(3350, 200, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(3650, 250, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(3750, 150, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(3950, 150, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(5250, 384, 'platform1').setScale(5, 1).refreshBody();
    objects.platforms.create(4290, 125, 'platform1').setScale(0.2, 9).refreshBody();
    objects.platforms.create(4350, 275, 'platform1').setScale(0.5, 1.5).refreshBody();
    objects.platforms.create(4700, 225, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(5000, 250, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(5275, 275, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(5500, 150, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(5800, 100, 'platform1').setScale(0.2, 9).refreshBody();
    objects.platforms.create(6200, 350, 'platform1').setScale(1, 4).refreshBody();
    objects.platforms.create(6250, 250, 'platform1').setScale(0.75, 3).refreshBody();
    objects.platforms.create(6625, 150, 'platform1').setScale(0.4, 1).refreshBody();
    objects.platforms.create(6850, 355, 'platform1').setScale(0.4, 1).refreshBody();
    objects.platforms.create(7200, 250, 'platform1').setScale(0.4, 1).refreshBody();
    objects.platforms.create(7200, 384, 'platform1').setScale(0.4, 1).refreshBody();
    objects.collapsable.create(7450, 325, 'collapsable').setScale(0.25, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(7450, 150, 'platform1').setScale(0.4, 1).refreshBody();
    objects.platforms.create(7600, 355, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(7750, 150, 'platform1').setScale(0.3, 1).refreshBody();
    objects.platforms.create(7950, 355, 'platform1').setScale(0.2, 1).refreshBody();
    objects.collapsable.create(8050, 150, 'collapsable').setScale(0.4, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(8200, 355, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(8450, 355, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(8325, 200, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(8675, 300, 'platform1').setScale(0.4, 1).refreshBody();
    objects.platforms.create(8925, 200, 'platform1').setScale(0.3, 1).refreshBody();
    objects.platforms.create(8950, 355, 'platform1').setScale(0.4, 1).refreshBody();
    objects.platforms.create(9200, 200, 'platform1').setScale(0.3, 1).refreshBody();
    objects.platforms.create(9325, 355, 'platform1').setScale(0.7, 1).refreshBody();
    objects.platforms.create(9500, 150, 'platform1').setScale(0.4, 1).refreshBody();
    objects.platforms.create(9600, 300, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(9800, 250, 'platform1').setScale(0.4, 1).refreshBody();
    objects.platforms.create(10100, 175, 'platform1').setScale(0.3, 1).refreshBody();
    objects.platforms.create(10470, 325, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(10750, 325, 'platform1').setScale(0.4, 1).refreshBody();
    objects.platforms.create(11000, 275, 'platform1').setScale(0.2, 1).refreshBody();
    objects.collapsable.create(11300, 384, 'collapsable').setScale(0.4, 2).refreshBody(); //esta aparece colapsando
    objects.platforms.create(11550, 300, 'platform1').setScale(0.2, 1).refreshBody();
    objects.collapsable.create(11800, 250, 'collapsable').setScale(0.3, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(12100, 300, 'platform1').setScale(0.4, 7).refreshBody();
    objects.platforms.create(12425, 200, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(14000, 384, 'platform1').setScale(6.3, 1).refreshBody();
    objects.platforms.create(13000, 100, 'platform1').setScale(0.2, 9).refreshBody();
    objects.platforms.create(13400, 350, 'platform1').setScale(0.2, 4).refreshBody();
    objects.platforms.create(13800, 275, 'platform1').setScale(0.1, 1).refreshBody();
    objects.platforms.create(14300, 275, 'platform1').setScale(0.1, 1).refreshBody();
    objects.platforms.create(14800, 275, 'platform1').setScale(0.1, 1).refreshBody();
    objects.platforms.create(15200, 350, 'platform1').setScale(0.2, 4).refreshBody();
    objects.platforms.create(15275, 310, 'platform1').setScale(0.2, 6).refreshBody();
    objects.platforms.create(15475, 300, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(15550, 200, 'platform1').setScale(0.25, 1).refreshBody();
    objects.platforms.create(15700, 350, 'platform1').setScale(0.5, 1).refreshBody();
    objects.collapsable.create(15800, 200, 'collapsable').setScale(0.25, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(16000, 290, 'platform1').setScale(0.2, 1).refreshBody();
    objects.collapsable.create(16300, 330, 'collapsable').setScale(0.4, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(16300, 225, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(16600, 175, 'platform1').setScale(0.4, 1).refreshBody();
    objects.platforms.create(16950, 350, 'platform1').setScale(0.3, 1).refreshBody();
    objects.collapsable.create(17100, 275, 'collapsable').setScale(0.3, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(17000, 200, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(17200, 125, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(17500, 275, 'platform1').setScale(0.3, 1).refreshBody();
    objects.platforms.create(17650, 370, 'platform1').setScale(0.4, 1).refreshBody();
    objects.platforms.create(17700, 175, 'platform1').setScale(0.3, 1).refreshBody();
    objects.platforms.create(17850, 275, 'platform1').setScale(0.3, 1).refreshBody();
    objects.platforms.create(18150, 225, 'platform1').setScale(0.4, 1).refreshBody();
    objects.platforms.create(18250, 350, 'platform1').setScale(0.3, 1).refreshBody();
    objects.platforms.create(18475, 350, 'platform1').setScale(0.2, 7).refreshBody();
    objects.platforms.create(18475, 50, 'platform1').setScale(0.2, 6).refreshBody();
    objects.platforms.create(19100, 384, 'platform1').setScale(3, 1).refreshBody();
    objects.platforms.create(18535, 350, 'platform1').setScale(0.1, 4).refreshBody();
    objects.platforms.create(18750, 225, 'platform1').setScale(0.4, 1).refreshBody();
    objects.platforms.create(19050, 175, 'platform1').setScale(0.4, 1).refreshBody();
    objects.platforms.create(19400, 300, 'platform1').setScale(0.4, 6).refreshBody(); //sobre esto aparecera el terminal para acabar el juego
    objects.platforms.create(19500, 200, 'platform1').setScale(0.1, 12).refreshBody();
    objects.platforms.create(19100, 0, 'platform1').setScale(3, 1).refreshBody();

    //Plataformas del mundo 2
    objects.platforms.create(0, 834, 'ground').setScale(8.5, 1).refreshBody();
    objects.platforms.create(0, 640, 'ground').setScale(0.1, 12).refreshBody();
    objects.platforms.create(380, 550, 'ground').setScale(0.1, 9).refreshBody();
    objects.platforms.create(175, 460, 'ground');
    objects.platforms.create(560, 680, 'ground').setScale(1, 1.1).refreshBody();
    objects.platforms.create(825, 825, 'ground').setScale(0.2, 4).refreshBody();
    objects.platforms.create(1200, 680, 'ground').setScale(1.5, 1.1).refreshBody();
    objects.platforms.create(1650, 800, 'ground').setScale(0.2, 4).refreshBody();
    objects.platforms.create(1700, 760, 'ground').setScale(0.15, 8).refreshBody();
    objects.platforms.create(1900, 600, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(2100, 760, 'ground').setScale(0.2, 8).refreshBody();
    objects.platforms.create(2300, 834, 'ground').setScale(1, 1).refreshBody();
    objects.platforms.create(2700, 750, 'platform1').setScale(0.2, 1).refreshBody();
    objects.collapsable.create(2900, 650, 'collapsable').setScale(0.2, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(3100, 725, 'ground').setScale(0.2, 9).refreshBody();
    objects.platforms.create(3180, 600, 'ground').setScale(0.6, 2).refreshBody();
    objects.platforms.create(3800, 834, 'ground').setScale(3.5, 1).refreshBody();
    objects.platforms.create(3690, 450, 'ground').setScale(3.15, 1).refreshBody();
    objects.platforms.create(4290, 500, 'ground').setScale(0.2, 5).refreshBody();
    objects.platforms.create(4290, 800, 'ground').setScale(0.2, 5).refreshBody();
    objects.platforms.create(4600, 775, 'platform1').setScale(0.2, 1).refreshBody();
    objects.collapsable.create(4700, 675, 'collapsable').setScale(0.2, 1).refreshBody(); //esta aparece colapsando
    objects.collapsable.create(5000, 700, 'collapsable').setScale(0.2, 1).refreshBody(); //esta aparece colapsando
    objects.collapsable.create(5275, 700, 'collapsable').setScale(0.2, 1).refreshBody(); //esta aparece colapsando
    objects.collapsable.create(5500, 625, 'collapsable').setScale(0.2, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(6075, 750, 'ground').setScale(1.65, 8).refreshBody();
    objects.platforms.create(6075, 450, 'ground').setScale(1.65, 1).refreshBody();
    objects.platforms.create(6700, 800, 'ground').setScale(0.4, 6).refreshBody();
    objects.platforms.create(6950, 625, 'platform1').setScale(0.4, 1).refreshBody();
    objects.platforms.create(7225, 625, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(7450, 775, 'platform1').setScale(0.25, 1).refreshBody();
    objects.collapsable.create(7600, 805, 'collapsable').setScale(0.2, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(7775, 700, 'platform1').setScale(0.3, 1).refreshBody();
    objects.collapsable.create(7950, 805, 'collapsable').setScale(0.2, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(8050, 585, 'platform1').setScale(0.4, 1).refreshBody();
    objects.platforms.create(8225, 775, 'platform1').setScale(0.3, 1).refreshBody();
    objects.platforms.create(8450, 834, 'platform1').setScale(0.25, 1).refreshBody();
    objects.platforms.create(8550, 675, 'platform1').setScale(0.3, 1).refreshBody();
    objects.platforms.create(8710, 775, 'platform1').setScale(0.5, 1).refreshBody();
    objects.platforms.create(8800, 625, 'platform1').setScale(0.4, 1).refreshBody();
    objects.platforms.create(9100, 750, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(9325, 800, 'ground').setScale(0.5, 8).refreshBody();
    objects.platforms.create(9600, 750, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(9750, 675, 'ground').setScale(0.1, 1).refreshBody();
    objects.platforms.create(9900, 675, 'ground').setScale(0.1, 1).refreshBody();
    objects.platforms.create(10100, 800, 'platform1').setScale(0.3, 1).refreshBody();
    objects.platforms.create(10350, 800, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(10550, 750, 'platform1').setScale(0.4, 1).refreshBody();
    objects.platforms.create(10750, 700, 'ground').setScale(0.1, 1).refreshBody();
    objects.collapsable.create(11000, 725, 'collapsable').setScale(0.2, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(11150, 650, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(11350, 600, 'ground').setScale(0.1, 1).refreshBody();
    objects.platforms.create(11300, 834, 'platform1').setScale(0.4, 2).refreshBody();
    objects.platforms.create(11550, 600, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(11800, 700, 'platform1').setScale(0.3, 1).refreshBody();
    objects.platforms.create(12050, 800, 'platform1').setScale(0.4, 1).refreshBody();
    objects.platforms.create(12250, 700, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(12450, 600, 'platform1').setScale(0.2, 1).refreshBody();
    objects.collapsable.create(12825, 834, 'collapsable').setScale(0.5, 1).refreshBody(); //Sesta aparece colapsando
    objects.platforms.create(13000, 550, 'ground').setScale(0.2, 9).refreshBody();
    objects.platforms.create(13250, 834, 'ground').setScale(2, 1).refreshBody();
    objects.platforms.create(13400, 800, 'ground').setScale(0.2, 4).refreshBody();
    objects.platforms.create(13900, 725, 'platform1').setScale(0.7, 1).refreshBody();
    objects.platforms.create(14225, 650, 'platform1').setScale(0.3, 1).refreshBody();
    objects.platforms.create(14400, 750, 'ground').setScale(0.1, 1).refreshBody();
    objects.platforms.create(14600, 675, 'ground').setScale(0.1, 1).refreshBody();
    objects.platforms.create(14800, 600, 'ground').setScale(0.1, 1).refreshBody();
    objects.platforms.create(15150, 834, 'platform1').setScale(0.6, 1).refreshBody();
    objects.collapsable.create(15475, 750, 'collapsable').setScale(0.2, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(15650, 675, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(15825, 650, 'platform1').setScale(0.3, 1).refreshBody();
    objects.collapsable.create(16000, 740, 'collapsable').setScale(0.2, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(16300, 780, 'platform1').setScale(0.4, 1).refreshBody();
    objects.collapsable.create(16300, 675, 'collapsable').setScale(0.2, 1).refreshBody(); //esta aparece colapsando
    objects.collapsable.create(16600, 625, 'collapsable').setScale(0.4, 1).refreshBody(); //esta aparece colapsando
    objects.platforms.create(16850, 600, 'platform1').setScale(0.3, 1).refreshBody();
    objects.platforms.create(17100, 725, 'platform1').setScale(0.3, 1).refreshBody();
    objects.platforms.create(17300, 650, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(17450, 775, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(17725, 834, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(17900, 750, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(17750, 675, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(18050, 600, 'platform1').setScale(0.6, 1).refreshBody();
    objects.platforms.create(17550, 600, 'platform1').setScale(0.2, 1).refreshBody();
    objects.platforms.create(19050, 834, 'ground').setScale(3, 1).refreshBody();
    objects.platforms.create(18475, 550, 'ground').setScale(0.2, 8).refreshBody();
    objects.platforms.create(18625, 800, 'ground').setScale(0.2, 4).refreshBody();
    objects.platforms.create(18850, 750, 'ground').setScale(0.2, 5).refreshBody();
    objects.platforms.create(19100, 750, 'ground').setScale(0.2, 8).refreshBody();
    objects.platforms.create(19400, 750, 'ground').setScale(0.4, 6).refreshBody(); //sobre esto esta el terminal, debe colapsarse para mandarlo al otro mundo
    objects.platforms.create(19500, 650, 'ground').setScale(0.1, 12).refreshBody();
    objects.platforms.create(19100, 450, 'ground').setScale(3, 1).refreshBody();

    /*-----------------------------------------------------Sprites----------------------------------------------------------*/

    /*-----------------------------------------------------MUNDO 1------------------------------------------------------------*/
    /*Suelo blanco del lab*/
    this.add.tileSprite(0, 370, 2500, 30, 'whiteLabGround').setOrigin(0, 0);
    this.add.tileSprite(4250, 370, 2150, 30, 'whiteLabGround').setOrigin(0, 0);
    this.add.tileSprite(7120, 370, 160, 30, 'whiteLabGround').setOrigin(0, 0);
    this.add.tileSprite(12740, 370, 2574, 30, 'whiteLabGround').setOrigin(0, 0);
    this.add.tileSprite(18555, 370, 765, 30, 'whiteLabGround').setOrigin(0, 0);

    /*Verticales*/
    this.add.tileSprite(0, 25, 16, 350, 'blackBeamV').setScale(1.2, 1).setOrigin(0, 0);
    this.add.tileSprite(3070, 150, 32, 135, 'metalPlate').setScale(1.9, 1.9).setOrigin(0, 0);
    this.add.tileSprite(6013, 300, 32, 37, 'metalPlate').setScale(2.3, 1.9).setOrigin(0, 0);
    this.add.tileSprite(6110, 225, 128, 76, 'metalPlate').setScale(2.2, 1.9).setOrigin(0, 0);
    this.add.tileSprite(12030, 210, 64, 100, 'metalPlate').setScale(2.2, 1.9).setOrigin(0, 0);

    this.add.tileSprite(19330, 210, 64, 100, 'metalPlate').setScale(2.2, 1.9).setOrigin(0, 0);

    this.add.tileSprite(0, 25, 16, 350, 'blackBeamV').setScale(1.3, 1).setOrigin(0, 0);
    this.add.tileSprite(360, 25, 16, 248, 'blackBeamV').setScale(2.5, 1).setOrigin(0, 0);
    //this.add.tileSprite(915, 190, 16, 180, 'redBeamV').setScale(1.3, 1).setOrigin(0, 0);
    this.add.tileSprite(2060, 0, 16, 244, 'blackBeamV').setScale(2.7, 1).setOrigin(0, 0);
    this.add.tileSprite(2095, 0, 16, 244, 'blackBeamV').setScale(2.8, 1).setOrigin(0, 0);
    this.add.tileSprite(3059, 214, 16, 187, 'blackBeamV').setScale(0.85, 1).setOrigin(0, 0);
    this.add.tileSprite(3127, 214, 16, 187, 'blackBeamV').setScale(0.85, 1).setOrigin(0, 0);
    this.add.tileSprite(4250, 0, 32, 299, 'blackBeamV').setScale(2.5, 1).setOrigin(0, 0);
    this.add.tileSprite(5760, 0, 32, 245, 'blackBeamV').setScale(2.5, 1).setOrigin(0, 0);
    this.add.tileSprite(6100, 225, 16, 145, 'blackBeamV').setOrigin(0, 0);
    this.add.tileSprite(6384, 225, 16, 145, 'blackBeamV').setOrigin(0, 0);
    this.add.tileSprite(6170, 225, 16, 145, 'blackBeamV').setOrigin(0, 0);
    this.add.tileSprite(6240, 225, 16, 145, 'blackBeamV').setOrigin(0, 0);
    this.add.tileSprite(6310, 225, 16, 145, 'blackBeamV').setOrigin(0, 0);
    this.add.tileSprite(12020, 212, 16, 188, 'blackBeamV').setOrigin(0, 0);
    this.add.tileSprite(12164, 212, 16, 188, 'blackBeamV').setOrigin(0, 0);
    this.add.tileSprite(12090, 212, 16, 188, 'blackBeamV').setOrigin(0, 0);
    this.add.tileSprite(12960, 0, 32, 245, 'blackBeamV').setScale(2.5, 1).setOrigin(0, 0);

    this.add.tileSprite(18435, 0, 32, 147, 'blackBeamV').setScale(2.5, 1).setOrigin(0, 0);
    this.add.tileSprite(18435, 258, 32, 147, 'blackBeamV').setScale(2.5, 1).setOrigin(0, 0);
    this.add.tileSprite(18515, 305, 16, 95, 'blackBeamV').setScale(2.5, 1).setOrigin(0, 0);
    this.add.tileSprite(19480, 15, 16, 385, 'blackBeamV').setScale(1.3, 1).setOrigin(0, 0);
    this.add.tileSprite(19320, 320, 16, 80, 'blackBeamV').setScale(1.68, 1).setOrigin(0, 0);
    this.add.tileSprite(19454.5, 320, 16, 80, 'blackBeamV').setScale(1.68, 1).setOrigin(0, 0);
    this.add.tileSprite(19385, 228, 16, 172, 'blackBeamV').setScale(1.68, 1).setOrigin(0, 0);

    this.add.image(3059, 150, 'beamCross').setScale(0.85, 1).setOrigin(0, 0);
    this.add.image(6000, 305, 'beamCross').setScale(1.04, 1.01).setOrigin(0, 0);
    this.add.image(19320, 220, 'beamCross').setScale(1.68, 1.6).setOrigin(0, 0);

    /*Techos*/
    this.add.tileSprite(0, 0, 430, 16, 'blackBeamH').setScale(1, 1.6).setOrigin(0, 0);

    this.add.tileSprite(18515, 0, 430, 16, 'blackBeamH').setScale(2.3, 1).setOrigin(0, 0);

    /*Diagonales*/
    this.add.image(4330, 202, 'diagonalBeamB').setScale(1, 1.5).setOrigin(0, 0);
    this.add.image(6320, 204, 'diagonalBeamB').setScale(1, 1.5).setOrigin(0, 0);
    this.add.image(6113, 204, 'diagonalBeamB2').setScale(1, 1.5).setOrigin(0, 0);

    /*Plataformas*/
    this.add.image(395, 237, 'fan').setScale(1.6, 1.8).setOrigin(0, 0);
    this.add.image(13775, 259, 'fan').setScale(1.55, 1.6).setOrigin(0, 0);
    this.add.image(14275, 259, 'fan').setScale(1.55, 1.6).setOrigin(0, 0);
    this.add.image(14775, 259, 'fan').setScale(1.55, 1.6).setOrigin(0, 0);

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
    this.add.image(13360, 284, 'box').setScale(2.5, 2.7).setOrigin(0, 0);
    this.add.tileSprite(15150, 284, 64, 32, 'box').setScale(2.58, 2.7).setOrigin(0, 0);
    this.add.image(15235, 212, 'box').setScale(2.5, 2.6).setOrigin(0, 0);

    /*this.add.image(885, 184, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(1160, 234, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(1410, 209, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(2860, 184, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(3310, 184, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(3610, 234, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(3710, 134, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(3910, 134, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(4660, 209, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(4960, 234, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(5235, 259, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(5460, 134, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(6545, 134, 'platform1').setScale(2, 2.3).setOrigin(0, 0);
    this.add.image(6770, 339, 'platform1').setScale(2, 2.3).setOrigin(0, 0);
    this.add.image(7120, 234, 'platform1').setScale(2, 2.3).setOrigin(0, 0);
    this.add.image(7370, 134, 'platform1').setScale(2, 2.3).setOrigin(0, 0);
    this.add.image(7560, 339, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(7690, 134, 'platform1').setScale(1.5, 2.3).setOrigin(0, 0);
    this.add.image(7910, 339, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(8160, 339, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(8285, 184, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(8410, 339, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(8595, 284, 'platform1').setScale(2, 2.3).setOrigin(0, 0);
    this.add.image(8870, 339, 'platform1').setScale(2, 2.3).setOrigin(0, 0);
    this.add.image(8865, 184, 'platform1').setScale(1.5, 2.3).setOrigin(0, 0);
    this.add.image(9140, 184, 'platform1').setScale(1.5, 2.3).setOrigin(0, 0);
    this.add.tileSprite(9185, 339, 187, 14, 'platform1').setScale(1.5, 2.3).setOrigin(0, 0);
    this.add.image(9420, 134, 'platform1').setScale(2, 2.3).setOrigin(0, 0);
    this.add.image(9560, 284, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(9720, 234, 'platform1').setScale(2, 2.3).setOrigin(0, 0);
    this.add.image(10040, 159, 'platform1').setScale(1.5, 2.3).setOrigin(0, 0);
    this.add.image(10430, 309, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(10670, 309, 'platform1').setScale(2, 2.3).setOrigin(0, 0);
    this.add.image(10960, 259, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(11510, 284, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(12385, 184, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(15500, 184, 'platform1').setScale(1.25, 2.3).setOrigin(0, 0);
    this.add.image(15460, 284, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.tileSprite(15600, 334, 135, 14, 'platform1').setScale(1.5, 2.3).setOrigin(0, 0);
    this.add.image(15960, 274, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(16260, 209, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(16520, 159, 'platform1').setScale(2, 2.3).setOrigin(0, 0);
    this.add.image(16890, 334, 'platform1').setScale(1.5, 2.3).setOrigin(0, 0);
    this.add.image(16960, 184, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(17160, 109, 'platform1').setScale(1, 2.3).setOrigin(0, 0);
    this.add.image(17440, 259, 'platform1').setScale(1.5, 2.3).setOrigin(0, 0);
    this.add.image(17570, 354, 'platform1').setScale(2, 2.3).setOrigin(0, 0);
    this.add.image(17640, 159, 'platform1').setScale(1.5, 2.3).setOrigin(0, 0);
    this.add.image(17790, 259, 'platform1').setScale(1.5, 2.3).setOrigin(0, 0);
    this.add.image(18070, 209, 'platform1').setScale(2, 2.3).setOrigin(0, 0);
    this.add.image(18190, 334, 'platform1').setScale(1.5, 2.3).setOrigin(0, 0);
    this.add.image(18670, 209, 'platform1').setScale(2, 2.3).setOrigin(0, 0);
    this.add.image(18970, 159, 'platform1').setScale(2, 2.3).setOrigin(0, 0);
    this.add.image(12385, 184, 'platform1').setScale(1, 2.3).setOrigin(0, 0);*/

    this.add.image(3059, 130, 'blackBeamH').setScale(1.28, 1.4).setOrigin(0, 0);
    this.add.tileSprite(4330, 251, 120, 32, 'blackBeamH').setScale(1, 1.5).setOrigin(0, 0);
    this.add.tileSprite(6000, 286, 100, 16, 'blackBeamH').setScale(1, 1.5).setOrigin(0, 0);
    this.add.tileSprite(6100, 202, 300, 16, 'blackBeamH').setScale(1, 1.5).setOrigin(0, 0);
    this.add.tileSprite(12020, 188, 160, 16, 'blackBeamH').setScale(1, 1.5).setOrigin(0, 0);
    this.add.tileSprite(18435, 234, 80, 16, 'blackBeamH').setScale(1, 1.5).setOrigin(0, 0);
    this.add.tileSprite(18435, 234, 80, 16, 'blackBeamH').setScale(1, 1.5).setOrigin(0, 0);
    this.add.tileSprite(18515, 284, 40, 16, 'blackBeamH').setScale(1, 1.5).setOrigin(0, 0);
    this.add.tileSprite(19320, 204, 161, 16, 'blackBeamH').setScale(1, 1.5).setOrigin(0, 0);

    /*Decoraciones*/
    this.add.image(150, 25, 'wires').setScale(1.5, 1.5).setOrigin(0, 0);

    this.add.image(135, 25, 'lamp1').setScale(1.5, 1.5).setOrigin(0, 0);
    this.add.image(213, 25, 'lamp1').setScale(1.5, 1.5).setOrigin(0, 0);

    this.add.image(370, 280, 'signalR').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(2080, 280, 'signalR').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(4350, 310, 'signalR').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(5780, 270, 'signalR').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(12980, 270, 'signalR').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(18460, 160, 'signalR').setScale(1.2, 1.2).setOrigin(0, 0);

    this.add.image(158, 255, 'emergency').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(288, 255, 'emergency').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(3090, 250, 'emergency').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(6200, 250, 'emergency').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(6275, 250, 'emergency').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(12050, 250, 'emergency').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(12125, 250, 'emergency').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(18442, 265, 'emergency').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(18482, 265, 'emergency').setScale(1.2, 1.2).setOrigin(0, 0);

    this.add.image(2480, 350, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(4250, 350, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(6380, 182, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(7120, 350, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(7265, 350, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);
    this.add.image(12740, 350, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);

    this.add.tileSprite(3072, 300, 56, 32, 'vPipe').setScale(1, 1).setOrigin(0, 0);
    this.add.tileSprite(12035, 300, 56, 32, 'vPipe').setScale(1, 1).setOrigin(0, 0);
    this.add.tileSprite(12105, 300, 56, 32, 'vPipe').setScale(1.06, 1).setOrigin(0, 0);

    this.add.tileSprite(19400, 172, 14, 32, 'machine').setScale(1.2, 1).setOrigin(0, 0);

    /*------------------------------------------------MUNDO 2---------------------------------------------------------------*/


    /*------------------------------------------------Fin sprites-----------------------------------------------------------*/

    //-----------------------Divisor de pantalla---------------------------
    this.add.image(0, 400, 'blackBeamH').setScale(12.5, 3.2).setOrigin(0, 0);



    //adding physics to player
  
    player = this.physics.add.sprite(100, 100, 'Mario1idle').setScale(1.25);

    this.physics.add.collider(player, objects.platforms);
    collapsablePlats = this.physics.add.collider(player, objects.collapsable);
    collapsablePlats.active = false;
    widthPlayer = 5;
    heightPlayer = 36;

    //-------------------adding physics to enemies---------------------------

    //enemies create
    widthAmalgama = 40;
    heightAmalgama = 50;
    enemiesArray = this.physics.add.group();
    enemiesQuantity = 30;
    //adding to a group
    for (i = 0; i < enemiesQuantity; i++) {
        enemie = this.physics.add.sprite(0, 0, 'AmalgamaRun');
        enemie.setBounce(0);
        enemie.body.setSize(widthAmalgama, heightAmalgama);
        enemie.setCollideWorldBounds(false);
        enemiesArray.add(enemie);
    }

    //getChildren of group
    children = [];
    children = enemiesArray.getChildren();
    children[0].setPosition(900, 330);
    children[1].setPosition(4400, 200);
    children[2].setPosition(4800, 200);
    children[3].setPosition(6600, 110);
    children[4].setPosition(7200, 350);
    children[5].setPosition(7760, 100);
    children[6].setPosition(8950, 330);
    children[7].setPosition(10750, 200);
    children[8].setPosition(13730, 200);
    children[9].setPosition(14251, 200);
    children[10].setPosition(14730, 200);
    children[11].setPosition(15603, 310);
    children[12].setPosition(15761, 310);
    children[13].setPosition(17500, 235);
    children[14].setPosition(17600, 330);
    children[15].setPosition(17850, 235);
    children[16].setPosition(1550, 795);
    children[17].setPosition(3800, 795);
    children[18].setPosition(4000, 795);
    children[19].setPosition(4300, 695);
    children[20].setPosition(6950, 580);
    children[21].setPosition(7750, 650);
    children[22].setPosition(8800, 580);
    children[23].setPosition(10100, 760);
    children[24].setPosition(10600, 710);
    children[25].setPosition(11800, 650);
    children[26].setPosition(13900, 680);
    children[27].setPosition(15200, 760);
    children[28].setPosition(18000, 550);
    children[29].setPosition(19800, 760);

    //setting velocity for each enemie
    velocityXEnemie = [];
    for (i = 0; i < enemiesArray.countActive(true); i++) {
        velocityXEnemie[i] = -75;
        enemiesArray.setVelocityX(velocityXEnemie[i]);
    }
    //invisible barriers
    //World 1
    objects.invBar = this.physics.add.staticGroup();
    objects.invBar.create(4250, 300, 'ground').setScale(0.1, 4).refreshBody();
    objects.invBar.create(6500, 110, 'ground').setScale(0.1, 4).refreshBody();
    objects.invBar.create(6725, 110, 'ground').setScale(0.1, 4).refreshBody();
    objects.invBar.create(7075, 300, 'ground').setScale(0.1, 4).refreshBody();
    objects.invBar.create(7280, 300, 'ground').setScale(0.1, 4).refreshBody();
    objects.invBar.create(7650, 110, 'ground').setScale(0.1, 4).refreshBody();
    objects.invBar.create(7825, 110, 'ground').setScale(0.1, 4).refreshBody();
    objects.invBar.create(8825, 300, 'ground').setScale(0.1, 1).refreshBody();
    objects.invBar.create(9050, 300, 'ground').setScale(0.1, 1).refreshBody();
    objects.invBar.create(10625, 286, 'ground').setScale(0.1, 1).refreshBody();
    objects.invBar.create(10850, 286, 'ground').setScale(0.1, 1).refreshBody();
    objects.invBar.create(15550, 310, 'ground').setScale(0.1, 1).refreshBody();
    objects.invBar.create(15825, 310, 'ground').setScale(0.1, 1).refreshBody();
    objects.invBar.create(17390, 235, 'ground').setScale(0.1, 1).refreshBody();
    objects.invBar.create(17590, 235, 'ground').setScale(0.1, 1).refreshBody();
    objects.invBar.create(17525, 330, 'ground').setScale(0.1, 1).refreshBody();
    objects.invBar.create(17750, 330, 'ground').setScale(0.1, 1).refreshBody();
    objects.invBar.create(17740, 235, 'ground').setScale(0.1, 1).refreshBody();
    objects.invBar.create(17925, 235, 'ground').setScale(0.1, 1).refreshBody();
    //World 2
    objects.invBar.create(6825, 586, 'ground').setScale(0.1, 1).refreshBody();
    objects.invBar.create(7050, 586, 'ground').setScale(0.1, 1).refreshBody();
    objects.invBar.create(7675, 661, 'ground').setScale(0.1, 1).refreshBody();
    objects.invBar.create(7850, 661, 'ground').setScale(0.1, 1).refreshBody();
    objects.invBar.create(8675, 586, 'ground').setScale(0.1, 1).refreshBody();
    objects.invBar.create(8900, 586, 'ground').setScale(0.1, 1).refreshBody();
    objects.invBar.create(10000, 761, 'ground').setScale(0.1, 1).refreshBody();
    objects.invBar.create(10175, 761, 'platform1').setScale(0.1, 1).refreshBody();
    objects.invBar.create(10425, 711, 'platform1').setScale(0.1, 1).refreshBody();
    objects.invBar.create(10650, 711, 'platform1').setScale(0.1, 1).refreshBody();
    objects.invBar.create(11700, 661, 'platform1').setScale(0.1, 1).refreshBody();
    objects.invBar.create(11875, 661, 'platform1').setScale(0.1, 1).refreshBody();
    objects.invBar.create(13710, 686, 'platform1').setScale(0.1, 1).refreshBody();
    objects.invBar.create(14050, 686, 'platform1').setScale(0.1, 1).refreshBody();
    objects.invBar.create(15000, 795, 'platform1').setScale(0.1, 1).refreshBody();
    objects.invBar.create(15275, 795, 'platform1').setScale(0.1, 1).refreshBody();
    objects.invBar.create(17900, 561, 'platform1').setScale(0.1, 1).refreshBody();
    objects.invBar.create(18175, 561, 'platform1').setScale(0.1, 1).refreshBody();
    objects.invBar.setVisible(false);

    //adding collissions enviroment and invisible walls
    enemiesColliderInvBar = this.physics.add.collider(enemiesArray, objects.invBar, changeDirectionEnemie);
    enemiesColliderPlatforms = this.physics.add.collider(enemiesArray, objects.platforms, changeDirectionEnemie);


    //camera interface
    camera1 = this.cameras.main;
    camera1.setPosition(0, 400);
    camera1.setSize(800, 50);
    //camera1.setVisible(false);
    camera1.setScroll(0, 400);

    //camera up
    camera2 = this.cameras.add(0, 0, 800, 400);
    camera2.setBounds(0, 0, 19500, 400);
    camera2.startFollow(player);
    camera2.setScroll(0, 0);

    //camera down
    camera3 = this.cameras.add(0, 450, 800, 400);
    camera3.setBounds(0, 450, 19500, 400);
    camera3.startFollow(player);
    camera3.setScroll(0, 450);
    camera3.setBackgroundColor('#113833');
    //camera3.setPosition(0,450);
    //camera3.startFollow(player);


    //size player
    player.body.setSize(widthPlayer, heightPlayer);
    player.setCollideWorldBounds(false);



    //adding hearts
    hearts = this.add.group();
    let heart1 = this.add.sprite(100, 418, 'heartAnim').setOrigin(0, 0);
    hearts.add(heart1);
    let heart2 = this.add.sprite(120, 418, 'heartAnim').setOrigin(0, 0);
    hearts.add(heart2);
    let heart3 = this.add.sprite(140, 418, 'heartAnim').setOrigin(0, 0);
    hearts.add(heart3);

    //shooting booleans
    balaActiva = false;
    balaDisparada = false;
    ShootDirection = "";
    canShoot = true;

    //animations
    createAnims();
    hearts.playAnimation('heart');
    enemiesArray.playAnimation('AmalgamaRun');

    //player booleans
    colisionPlayer = true;

    //enemies booleans
    EnemieDead = false;
    //collision player-enemies
    playerCollidesEnemies = this.physics.add.collider(player, enemiesArray, KillPlayer, null, this);
    timerInitiated = false;
    collapseTimer = false;
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
    game.anims.create({
        key: 'AmalgamaRun',
        frames: game.anims.generateFrameNumbers('Amalgama', {
            start: 0,
            end: 6
        }),
        frameRate: 10,
        repeat: -1
    });
    game.anims.create({
        key: 'AmalgamaDeath',
        frames: game.anims.generateFrameNumbers('Amalgama', {
            start: 14,
            end: 22
        }),
        frameRate: 10,
        repeat: 0
    });
}

function update() {

    //console.log(player.x + ", " + player.y);
    console.log(collapseTimer);

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

    //Collapse code
    if(controls.collapseKey.isDown){
      collapsablePlats.active = true;
      if(collapseTimer === false){
        collapseEvent = this.time.delayedCall(15000, removeCollapse);
        collapseTimer = true;
      }
    }

    if(!warp){
      tween = this.tweens.addCounter({
          from: 1,
          to: 2,
          duration: 5000,
          ease: ('Sine.easeInOut'),
          yoyo: true,
          repeat: -1
      });
    }
    if (player.x >= 13000)
        warp = true;

    if (warp) {
        lab.tileScaleX = tween.getValue();
        lab2.tileScaleX = tween.getValue();
    }

    // Muerte por caida (jugador 1)
    if (player.y > 850) {
        playerState = playerStateList["movingLeft"];
        game.registry.destroy();
        game.events.off();
        this.scene.restart();
    }



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

    if (balaActiva == true && bala.body.position.x < (camera2.worldView.x + camera2.worldView.width) && bala.body.position.x > camera2.worldView.x) {
        canShoot = false;
    } else if (balaActiva == true && (bala.body.position.x > (camera2.worldView.x + camera2.worldView.width) ||
            bala.body.position.x < camera2.worldView.x)) {
        bala.destroy();
        balaActiva = false;
        canShoot = true;
    }

    /*--------instructions of Amalgama's death and movement----------*/

    children = enemiesArray.getChildren();

    if (balaActiva == true) {
        this.physics.add.collider(bala, enemiesArray, KillEnemie);
    }


    if (EnemieDead == true) {
        children = enemiesArray.getChildren();
        i = 0;
        while (children[i] != undefined && i < enemiesQuantity) {
            if (children[i].anims.currentKey == 'AmalgamaDeath') {
                console.log("Mosntruo muerto " + i);
                if (children[i].anims.currentFrame.index == 7) {
                    enemiesArray.remove(children[i], true);
                    console.log("animation complete");
                    EnemieDead = false;
                }
                for (k = i; k < enemiesQuantity - 1; k++) {
                    velocityXEnemie[k] = velocityXEnemie[k + 1];
                    children[k] = children[k + 1];
                }

            }
            i++;
        }
    }

    /*--------instructions of Player's death and movement----------*/
    if (colisionPlayer == false) {
        // console.log("ahora mismo no puedes morir");
        playerCollidesEnemies.active = false;
        if (timerInitiated == false) {
            timedEvent = this.time.delayedCall(5000, enableColisionPlayer, this, false);
            timerInitiated = true;
        }
    }


    if (colisionPlayer == true) {
        playerCollidesEnemies.active = true;
        timerInitiated = false;

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

function KillEnemie() {
    i = 0;
    while (i < enemiesQuantity && children[i] != undefined) {
        if (Math.abs(Phaser.Math.Distance.Between(bala.body.position.x, bala.body.position.y,
                children[i].body.position.x, children[i].body.position.y)) < 50) {
            children[i].anims.play('AmalgamaDeath', 'true');
            children[i].anims.currentKey = 'AmalgamaDeath';
            children[i].body.velocity.x = 0;
            console.log(i);
        }
        i++;
    }
    EnemieDead = true;
    Killbala();

}


function changeDirectionEnemie() {
    //cuando choca con una pared hace el collider dos veces, uno con el suelo, y otro con la propia pared.
    for (i = 0; i < enemiesQuantity; i++) {
        if (children[i] != undefined && children[i].body.touching.left && children[i].flipX == false) {
            //  console.log(children[i].body.velocity.x);
            //  console.log(velocityXEnemie[8]);
            velocityXEnemie[i] = -velocityXEnemie[i];
            children[i].body.velocity.x = velocityXEnemie[i];
            children[i].flipX = true;
            //  console.log("toca izquierda" + i );
            // console.log(children[i].body.velocity.x);
        }
        if (children[i] != undefined && children[i].body.touching.right && children[i].flipX == true) {
            // console.log("toca derecha" + i);
            velocityXEnemie[i] = -velocityXEnemie[i];
            children[i].body.velocity.x = velocityXEnemie[i];
            children[i].flipX = false;

        }


    }
    // console.log(children[8].body.velocity.x);
}

function KillPlayer() {
    // console.log("mata");
    colisionPlayer = false;
    if (hearts.countActive(true) == 1) {
        playerState = playerStateList["movingLeft"];
        game.registry.destroy();
        game.events.off();
        this.scene.restart();
    }
    hearts.remove(hearts.getFirstAlive(), true);
    for (i = 0; i < enemiesQuantity; i++)
        if (children[i] != undefined)
            children[i].body.setVelocityX(velocityXEnemie[i]);
}

function removeCollapse(){
  collapsablePlats.active = false;
  collapseTimer = false;
  collapseEvent.remove();
}

function enableColisionPlayer() {
    colisionPlayer = true;
    //console.log("ya puedes morir");
    timedEvent.remove();
}
