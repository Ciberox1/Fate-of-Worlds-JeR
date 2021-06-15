class Level extends Phaser.Scene {
    constructor() {
        super({
            key: 'Level'
        });
    }
    preload() {                
        
        connection.binaryType='arraybuffer';
        controls1.interactKey = this.input.keyboard.addKey('E');
        controls1.gunKey = this.input.keyboard.addKey('P');
        controls1.dropKey = this.input.keyboard.addKey('Q');
        controls1.collapseKey = this.input.keyboard.addKey('SPACE');
        controls1.cursors = this.input.keyboard.createCursorKeys();

        controls2.interactKey = this.input.keyboard.addKey('K');
        controls2.gunKey = this.input.keyboard.addKey('F');
        controls2.dropKey = this.input.keyboard.addKey('L');
        controls2.cursors = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });

    }

    create() {
        warp = false;
        collapseTimer = false;

        this.add.tileSprite(400, 200, 24000, 400, 'lab');
        lab = this.add.tileSprite(12400, 200, 16000, 400, 'lab');
        this.add.tileSprite(400, 650, 24000, 400, 'lab2');
        lab2 = this.add.tileSprite(12400, 650, 16000, 400, 'lab2');
        tween = this.tweens.addCounter({
            from: 1,
            to: 2,
            duration: 5000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

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
        objects.platforms.create(18850, 650, 'platform1').setScale(0.2, 1).refreshBody();
        objects.platforms.create(19100, 625, 'platform1').setScale(0.2, 1).refreshBody();
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
        //Suelo
        this.add.tileSprite(0, 820, 1730, 30, 'whiteLabGround').setOrigin(0, 0);
        this.add.tileSprite(2139, 820, 360, 30, 'whiteLabGround').setOrigin(0, 0);
        this.add.tileSprite(3140, 820, 1360, 30, 'whiteLabGround').setOrigin(0, 0);
        this.add.tileSprite(6620, 820, 160, 30, 'whiteLabGround').setOrigin(0, 0);
        this.add.tileSprite(11220, 803, 160, 50, 'whiteLabGround').setOrigin(0, 0);
        this.add.tileSprite(12850, 819, 800, 50, 'whiteLabGround').setOrigin(0, 0);
        this.add.tileSprite(18450, 819, 1050, 50, 'whiteLabGround').setOrigin(0, 0);

        //Metal Plates
        this.add.tileSprite(2078, 652, 32, 160, 'metalPlate').setScale(1.4, 1.3).setOrigin(0, 0);
        this.add.tileSprite(3078, 588, 160, 16, 'metalPlate').setScale(1.35, 1.5).setOrigin(0, 0);
        this.add.tileSprite(3078, 612, 32, 180, 'metalPlate').setScale(1.35, 1.5).setOrigin(0, 0);
        this.add.tileSprite(5770, 640, 415, 160, 'metalPlate').setScale(1.5, 1.5).setOrigin(0, 0);
        this.add.tileSprite(9235, 695, 124, 110, 'metalPlate').setScale(1.5, 1.5).setOrigin(0, 0);
        this.add.tileSprite(19330, 670, 124, 99, 'metalPlate').setScale(1.8, 1.5).setOrigin(0, 0);

        //Diagonales
        this.add.image(380, 625, 'redBeamD').setScale(2,2).setOrigin(0,0);
        this.add.image(3120, 630, 'redBeamD2').setScale(2,2).setOrigin(0,0);
        this.add.image(5765, 640, 'redBeamD2').setScale(2,2).setOrigin(0,0);
        this.add.image(6325, 640, 'redBeamD').setScale(2,2).setOrigin(0,0);
        this.add.image(19430, 465, 'redBeamD').setScale(2,2).setOrigin(0,0);
        this.add.image(19330, 675, 'redBeamD2').setScale(2,2).setOrigin(0,0);

        //Verticales
        this.add.tileSprite(0, 476, 16, 349, 'redBeamV').setScale(1.3, 1).setOrigin(0, 0);
        this.add.tileSprite(360, 476, 32, 222, 'redBeamV').setScale(1.25, 1).setOrigin(0, 0);
        this.add.tileSprite(2060, 650, 16, 200, 'redBeamV').setScale(1.25, 1).setOrigin(0, 0);
        this.add.tileSprite(2120, 650, 16, 200, 'redBeamV').setScale(1.25, 1).setOrigin(0, 0);
        this.add.tileSprite(3060, 590, 16, 260, 'redBeamV').setScale(1.25, 1).setOrigin(0, 0);
        this.add.tileSprite(3120, 632, 16, 220, 'redBeamV').setScale(1.25, 1).setOrigin(0, 0);
        this.add.tileSprite(3280, 590, 16, 30, 'redBeamV').setScale(1.25, 1).setOrigin(0, 0);
        this.add.tileSprite(4250, 465, 48, 115, 'redBeamV').setScale(1.67, 1).setOrigin(0, 0);
        this.add.tileSprite(5745, 645, 16, 210, 'redBeamV').setScale(1.67, 1).setOrigin(0, 0);
        this.add.tileSprite(6378, 645, 16, 210, 'redBeamV').setScale(1.67, 1).setOrigin(0, 0);
        this.add.tileSprite(5810, 645, 16, 210, 'redBeamV').setScale(1.1, 1).setOrigin(0, 0);
        this.add.tileSprite(5860, 645, 16, 210, 'redBeamV').setScale(1.1, 1).setOrigin(0, 0);
        this.add.tileSprite(5910, 645, 16, 210, 'redBeamV').setScale(1.1, 1).setOrigin(0, 0);
        this.add.tileSprite(5960, 645, 16, 210, 'redBeamV').setScale(1.1, 1).setOrigin(0, 0);
        this.add.tileSprite(6005, 645, 16, 210, 'redBeamV').setScale(1.1, 1).setOrigin(0, 0);
        this.add.tileSprite(6050, 645, 16, 210, 'redBeamV').setScale(1.1, 1).setOrigin(0, 0);
        this.add.tileSprite(6100, 645, 16, 210, 'redBeamV').setScale(1.1, 1).setOrigin(0, 0);
        this.add.tileSprite(6150, 645, 16, 210, 'redBeamV').setScale(1.1, 1).setOrigin(0, 0);
        this.add.tileSprite(6200, 645, 16, 210, 'redBeamV').setScale(1.1, 1).setOrigin(0, 0);
        this.add.tileSprite(6240, 645, 16, 210, 'redBeamV').setScale(1.1, 1).setOrigin(0, 0);
        this.add.tileSprite(6290, 645, 16, 210, 'redBeamV').setScale(1.1, 1).setOrigin(0, 0);
        this.add.tileSprite(6340, 645, 16, 210, 'redBeamV').setScale(1.1, 1).setOrigin(0, 0);
        this.add.tileSprite(9225, 690, 16, 190, 'redBeamV').setScale(1.1, 1).setOrigin(0, 0);
        this.add.tileSprite(9408, 690, 16, 190, 'redBeamV').setScale(1.1, 1).setOrigin(0, 0);
        this.add.tileSprite(9270, 690, 16, 190, 'redBeamV').setScale(1.1, 1).setOrigin(0, 0);
        this.add.tileSprite(9320, 690, 16, 190, 'redBeamV').setScale(1.1, 1).setOrigin(0, 0);
        this.add.tileSprite(9365, 690, 16, 190, 'redBeamV').setScale(1.1, 1).setOrigin(0, 0);
        this.add.tileSprite(12960, 450, 32, 244, 'redBeamV').setScale(2.5, 1).setOrigin(0, 0);
        this.add.tileSprite(18435, 465, 32, 220, 'redBeamV').setScale(2.5, 1).setOrigin(0, 0);
        this.add.tileSprite(19320, 660, 16, 159, 'redBeamV').setScale(1, 1).setOrigin(0, 0);
        this.add.tileSprite(19380, 660, 16, 159, 'redBeamV').setScale(1, 1).setOrigin(0, 0);
        this.add.tileSprite(19435, 660, 16, 159, 'redBeamV').setScale(1, 1).setOrigin(0, 0);

        //Horizontales
        this.add.tileSprite(400, 662, 277, 16, 'redBeamH').setScale(1.3, 2.22).setOrigin(0, 0);
        this.add.tileSprite(900, 662, 463, 16, 'redBeamH').setScale(1.3, 2.22).setOrigin(0, 0);
        this.add.tileSprite(2060, 632, 80, 16, 'redBeamH').setScale(1, 1.3).setOrigin(0, 0);
        this.add.tileSprite(3060, 568, 240, 16, 'redBeamH').setScale(1, 1.4).setOrigin(0, 0);
        this.add.tileSprite(3120, 610, 180, 16, 'redBeamH').setScale(1, 1.4).setOrigin(0, 0);
        this.add.tileSprite(5745, 622, 660, 16, 'redBeamH').setScale(1, 1.5).setOrigin(0, 0);
        this.add.tileSprite(9225, 672, 200, 16, 'redBeamH').setScale(1, 1.5).setOrigin(0, 0);
        this.add.tileSprite(19320, 654, 200, 16, 'redBeamH').setScale(1, 1.5).setOrigin(0, 0);

        this.add.image(785, 760, 'box').setScale(2.5, 1.8).setOrigin(0, 0);
        this.add.tileSprite(1610, 733, 64, 32, 'box').setScale(1.88, 2.7).setOrigin(0, 0);
        this.add.image(1670, 680, 'box').setScale(1.88, 2.1).setOrigin(0, 0);
        this.add.image(1670, 630, 'box').setScale(1.88, 1.88).setOrigin(0, 0);
        this.add.image(4250, 716, 'box').setScale(2.5, 3.2).setOrigin(0, 0);
        this.add.tileSprite(6620, 702, 64, 32, 'box').setScale(2.5, 3.6).setOrigin(0, 0);
        this.add.image(13360, 734, 'box').setScale(2.5, 2.7).setOrigin(0, 0);
        this.add.image(18585, 734, 'box').setScale(2.5, 2.7).setOrigin(0, 0);

        this.add.image(9722, 659, 'fan').setScale(1.7, 1.8).setOrigin(0, 0);
        this.add.image(9872, 659, 'fan').setScale(1.7, 1.8).setOrigin(0, 0);
        this.add.image(10722, 682, 'fan').setScale(1.7, 1.8).setOrigin(0, 0);
        this.add.image(11322, 580, 'fan').setScale(1.7, 1.8).setOrigin(0, 0);
        this.add.image(14375, 730, 'fan').setScale(1.6, 1.8).setOrigin(0, 0);
        this.add.image(14575, 658, 'fan').setScale(1.6, 1.8).setOrigin(0, 0);
        this.add.image(14775, 580, 'fan').setScale(1.6, 1.8).setOrigin(0, 0);

        //Esta es vertical pero tiene que ir aquí para no tener que hacerla dos veces.
        this.add.tileSprite(19480, 450, 16, 370, 'redBeamV').setScale(1.3, 1).setOrigin(0, 0);

        //Techos
        this.add.tileSprite(0, 450, 308, 16, 'redBeamH').setScale(1.3, 1.65).setOrigin(0, 0);
        this.add.tileSprite(3060, 450, 978, 16, 'redBeamH').setScale(1.3, 1).setOrigin(0, 0);
        this.add.tileSprite(5745, 450, 510, 16, 'redBeamH').setScale(1.3, 1).setOrigin(0, 0);
        this.add.tileSprite(18435, 450, 1065, 16, 'redBeamH').setScale(1.3, 1).setOrigin(0, 0);

        //Decoraciones
        this.add.image(370, 715, 'signalR').setScale(1.2, 1.2).setOrigin(0, 0);
        this.add.image(4450, 715, 'signalR').setScale(1.2, 1.2).setOrigin(0, 0);
        this.add.image(4450, 715, 'signalR').setScale(1.2, 1.2).setOrigin(0, 0);
        this.add.image(9300, 600, 'signalR').setScale(1.2, 1.2).setOrigin(0, 0);
        this.add.image(18470, 720, 'signalR').setScale(1.2, 1.2).setOrigin(0, 0);

        this.add.image(2090, 700, 'emergency').setScale(1.2, 1.2).setOrigin(0, 0);
        this.add.image(3090, 670, 'emergency').setScale(1.2, 1.2).setOrigin(0, 0);
        this.add.image(3090, 715, 'emergency').setScale(1.2, 1.2).setOrigin(0, 0);
        this.add.image(19405, 715, 'emergency').setScale(1.2, 1.2).setOrigin(0, 0);

        this.add.image(1710, 615, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);
        this.add.image(2060, 612, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);
        this.add.image(2485, 800, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);
        this.add.image(3060, 550, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);
        this.add.image(4485, 800, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);
        this.add.image(5745, 605, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);
        this.add.image(6385, 605, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);
        this.add.image(6620, 690, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);
        this.add.image(6765, 690, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);
        this.add.image(9225, 655, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);
        this.add.image(9410, 655, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);
        this.add.image(11220, 785, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);
        this.add.image(11365, 785, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);
        this.add.image(13630, 800, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);
        this.add.image(18450, 800, 'cone').setScale(1.2, 1.2).setOrigin(0, 0);

        this.add.image(11290, 730, 'exit').setScale(2, 2).setOrigin(0, 0);

        this.add.image(11315, 680, 'signalR').setScale(1.2, 1.2).setRotation(45.555).setOrigin(0, 0);

        this.add.tileSprite(19400, 622, 14, 32, 'machine').setScale(1.2, 1).setOrigin(0, 0);
        /*-------------------------------------------FIN MUNDO 2----------------------------------------------------------------*/
        /*------------------------------------------------Fin sprites-----------------------------------------------------------*/

        //-----------------------Divisor de pantalla---------------------------
        this.add.tileSprite(0, 400, 160, 16, 'blackBeamH').setScale(12.5, 3.2).setOrigin(0, 0);


        //adding physics to player
        players.player1 = this.physics.add.sprite(19000, 700, 'Mario1idle').setScale(1.25);
        players.player2 = this.physics.add.sprite(19000, 300, 'Mario2idle').setScale(1.25);

        this.physics.add.collider(players.player1, objects.platforms);
        collapsablePlats1 = this.physics.add.collider(players.player1, objects.collapsable);
        this.physics.add.collider(players.player2, objects.platforms);
        collapsablePlats2 = this.physics.add.collider(players.player2, objects.collapsable);
        collapsablePlats1.active = false;
        collapsablePlats2.active = false;

        widthPlayer1 = 10;
        heightPlayer1 = 35;
        widthPlayer2 = 13;
        heightPlayer2 = 35;

        //-------------------adding physics to enemies---------------------------

        //enemies create
        widthAmalgama = 50;
        heightAmalgama = 30;
        enemiesArray = this.physics.add.group();
        var enemy;
        //adding to a group
        for (var i = 0; i < enemiesQuantity; i++) {
            enemy = this.physics.add.sprite(0, 0, 'AmalgamaRun');
            enemy.setBounce(0);
            enemy.body.setSize(widthAmalgama, heightAmalgama);
            enemy.setCollideWorldBounds(false);
            enemy.body.setOffset(5,15);
            enemiesArray.add(enemy);
        }

        //getChildren of group
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
        
        for(i=0;i<children.length;i++){
           positionXEnemy[i]=children[i].x;
           positionYEnemy[i]=children[i].y+20;
        }
        
        

        //setting velocity for each enemie
        for (var i = 0; i < enemiesArray.countActive(true); i++) {
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
        var enemiesColliderInvBar = this.physics.add.collider(enemiesArray, objects.invBar, changeDirectionEnemie);
        var enemiesColliderPlatforms = this.physics.add.collider(enemiesArray, objects.platforms, changeDirectionEnemie);

        //camera interface
        camera1 = this.cameras.main;
        camera1.setPosition(0, 400);
        camera1.setSize(config.width, 50);
        camera1.setScroll(0, 400);

        //camera up
        camera2 = this.cameras.add(0, 0, config.width, 400);
        camera2.setBounds(0, 0, 19500, 400);
        camera2.startFollow(players.player2);
        camera2.setScroll(0, 0);

        //camera down
        camera3 = this.cameras.add(0, 450, config.width, 400);
        camera3.setBounds(0, 450, 19500, 400);
        camera3.startFollow(players.player1);
        camera3.setScroll(0, 450);
        camera3.setBackgroundColor('#113833');


        //size player
        players.player1.body.setSize(widthPlayer1, heightPlayer1);
        players.player1.setCollideWorldBounds(false);
        players.player1.body.setOffset(21,7);
        Offsetxplayer1=21;
        Offsetyplayer1=7;

        players.player2.body.setSize(widthPlayer2, heightPlayer2);
        players.player2.setCollideWorldBounds(false);
        players.player2.body.setOffset(12,0);
        Offsetxplayer2=12;
        Offsetyplayer2=0;

        //adding hearts
        hearts = this.add.group();
        let heart1 = this.add.sprite(100, 418, 'heartAnim').setOrigin(0, 0);
        hearts.add(heart1);
        let heart2 = this.add.sprite(120, 418, 'heartAnim').setOrigin(0, 0);
        hearts.add(heart2);
        let heart3 = this.add.sprite(140, 418, 'heartAnim').setOrigin(0, 0);
        hearts.add(heart3);

        //animations
        createAnims();
        hearts.playAnimation('heart');
        enemiesArray.playAnimation('AmalgamaRun');

        //collision player-enemies
        // this.physics.add.collider(players.player1, enemiesArray, KillPlayer1);
        //this.physics.add.collider(players.player2, enemiesArray, KillPlayer2);
        playerCollidesEnemies1 =this.physics.add.overlap(players.player1, enemiesArray, KillPlayer1);
        playerCollidesEnemies2 = this.physics.add.overlap(players.player2, enemiesArray, KillPlayer2);

        //adding sound
        soundBackground = this.sound.add('BackgroundSound', {
            volume: 0.10
        });
        soundShoot = this.sound.add('shootSound');
        soundHit = this.sound.add('hitSound');
        soundDeathAmalgama = this.sound.add('AmalgamaDeathSound');
        soundCollapse = this.sound.add('CollapseSound');
        soundJump = this.sound.add('JumpSound');
        soundBackground.loop = true;
        soundBackground.play();

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
                frameRate: 35,
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
                key: 'Mario2Walk',
                frames: game.anims.generateFrameNumbers('Mario2Walk', {
                    start: 1,
                    end: 13
                }),
                frameRate: 10,
                repeat: -1
            });

            game.anims.create({
                key: 'idleMario2',
                frames: game.anims.generateFrameNumbers('Mario2idle', {
                    start: 0,
                    end: 4
                }),
                frameRate: 6
            });

            game.anims.create({
                key: 'Mario2Shoot',
                frames: game.anims.generateFrameNumbers('Mario2Shoot', {
                    start: 0,
                    end: 5
                }),
                frameRate: 10,
                repeat: 0
            });
            game.anims.create({
                key: 'Mario2JumpStart',
                frames: game.anims.generateFrameNumbers('Mario2Jump', {
                    frames: [0, 1, 2, 3, 4, 3, 4, 3, 2, 1, 0]
                }),
                frameRate: 30,
                repeat: 0
            });
            game.anims.create({
                key: 'Mario2JumpEnd',
                frames: game.anims.generateFrameNumbers('Mario2Jump', {
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
            })
        }
    }

    update() {      
        if(idJugador==1){
            updatePlayer1 = true;
            if(players.player2.body.touching.down &&  player2ReadyToPlay==false){
                 player2ReadyToPlay=true;
                players.player2.body.setVelocityY(0);
                updatePlayer2=false;
            }
            if(players.player1.body.touching.down &&  player1ReadyToPlay==false)
                player1ReadyToPlay=true;
        }
               

            

        switch (playerState1) {
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
            default:

        }
        
        if(idJugador==1)
            updatePlayer1 = false;
        
        if(idJugador==2){
             updatePlayer2 = true;
            if(players.player1.body.touching.down &&  player1ReadyToPlay==false){
                
                  player1ReadyToPlay=true;
                  updatePlayer1 = false;
                players.player1.body.setVelocityY(0);
            }
             if(players.player2.body.touching.down &&  player2ReadyToPlay==false)
                player2ReadyToPlay=true;
        }  

        switch (playerState2) {
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
            default:

        }
                if(idJugador==2)
                    updatePlayer2=false;  

        
        if(collapsableConexionLocal==true)
            collapsableConexionLocal=false;
        //Collapse code
        if (((controls1.collapseKey.isDown && collapseTimer === false) || collapsableConexionLocal===true || collapsableConexionOnline===true) && collapsablePlats1.active === false && collapsablePlats2.active === false) {
            if(collapsableConexionOnline==true)
                collapsableConexionOnline=false;
            
            if(controls1.collapseKey.isDown)
                collapsableConexionLocal=true;
            
            
            soundCollapse.play();
            collapsablePlats1.active = true;
            collapsablePlats2.active = true;
            for (let i = 0; i < objects.collapsable.children.entries.length; i++) {
                objects.collapsable.children.entries[i].setTexture('collapsed');
            }
            if (collapseTimer === false) {
                collapseEvent = this.time.delayedCall(8500, removeCollapse);
                collapseTimer = true;
            }
        }

        if (!warp) {
            tween = this.tweens.addCounter({
                from: 1,
                to: 2,
                duration: 5000,
                ease: ('Sine.easeInOut'),
                yoyo: true,
                repeat: -1
            });
        }

        if (players.player1.x >= 13000 || players.player2.x >= 13000)
            warp = true;
        if (warp) {
            lab.tileScaleX = tween.getValue();
            lab2.tileScaleX = tween.getValue();
        }


        // Muerte por caida
        if (players.player2.y > 400 || players.player1.y > 850) {
            playerDead = true;
        }
        //Pantalla de Muerte
        if (playerDead == true) {
          GameOver(this.scene);
        }

        // Condición de victoria
        if (players.player1.x > 19400 && players.player2.x > 19400) {
            Victory(this.scene);
        }


        /*--------------------------- BULLET LOGIC ------------------------------*/
       // sirve para originar la bala dependiendo de hacia donde mire el personaje
        if(balaActiva1 == true && balaDisparada1 == true)
            balaDisparada1 = false;
        if (balaDisparada1 == true) {
            soundShoot.play();
            if (ShootDirection1 == "right" || ShootDirection1 == "rightOnline") {
                bala1 = this.physics.add.sprite(players.player1.body.position.x + 30, players.player1.body.position.y + heightPlayer1 / 2 + 2, 'bala');
                this.physics.add.collider(bala1, objects.platforms, Killbala1);
            } else if (ShootDirection1 == "left" || ShootDirection1 == "leftOnline") {
                bala1 = this.physics.add.sprite(players.player1.body.position.x - 30, players.player1.body.position.y + heightPlayer1 / 2 + 2, 'bala');
                this.physics.add.collider(bala1, objects.platforms, Killbala1);
            }
            bala1.setGravityY(-490);
            balaActiva1 = true;
            bala1.setScale(0.5);
        }
        //sirve para dar velocidad una vez se crea la bala
        if (balaActiva1 == true) {
            if (ShootDirection1 == "right" || ShootDirection1 == "rightOnline")
                bala1.setVelocityX(500);
            else if (ShootDirection1 == "left" || ShootDirection1 == "leftOnline") {
                bala1.setVelocityX(-500);
            }
        }

        if (balaActiva1 == true && bala1.body.position.x < (camera3.worldView.x + camera3.worldView.width) && bala1.body.position.x > camera3.worldView.x) {
            canShoot1 = false;
        } else if (balaActiva1 == true && (bala1.body.position.x > (camera3.worldView.x + camera3.worldView.width) ||
                bala1.body.position.x < camera3.worldView.x)) {
            bala1.destroy();
            balaActiva1 = false;
            canShoot1 = true;
        }

        // Bala 2
        // sirve para originar la bala dependiendo de hacia donde mire el personaje
        if(balaActiva2 == true)
            balaDisparada2 = false;
        
        if (balaDisparada2 == true) {
            soundShoot.play();
            if (ShootDirection2 == "right" || ShootDirection2 == "rightOnline") {
                bala2 = this.physics.add.sprite(players.player2.body.position.x + 30, players.player2.body.position.y + heightPlayer2 / 2 -2, 'bala');
                this.physics.add.collider(bala2, objects.platforms, Killbala2);
            } else if (ShootDirection2 == "left" || ShootDirection2 == "leftOnline") {
                bala2 = this.physics.add.sprite(players.player2.body.position.x - 30, players.player2.body.position.y + heightPlayer2 / 2 -2, 'bala');
                this.physics.add.collider(bala2, objects.platforms, Killbala2);
            }
            bala2.setGravityY(-490);
            balaActiva2 = true;
            bala2.setScale(0.5);
        }
         
        //sirve para dar velocidad una vez se crea la bala
        if (balaActiva2 == true) {
            if (ShootDirection2 == "right" || ShootDirection2 == "rightOnline")
                bala2.setVelocityX(500);
            else if (ShootDirection2 == "left" || ShootDirection2 == "leftOnline") {
                bala2.setVelocityX(-500);
            }
        }

        if (balaActiva2 == true && bala2.body.position.x < (camera2.worldView.x + camera2.worldView.width) && bala2.body.position.x > camera3.worldView.x) {
            canShoot2 = false;
        } else if (balaActiva2 == true && (bala2.body.position.x > (camera2.worldView.x + camera2.worldView.width) ||
                bala2.body.position.x < camera2.worldView.x)) {
                    bala2.destroy();
                    balaActiva2 = false;
                    canShoot2 = true;
        }

        /*--------instructions of Amalgama's death and movement----------*/

        children = enemiesArray.getChildren();
        
        for(var i=0;i<children.length;i++){
           positionXEnemy[i]=children[i].x;
           positionYEnemy[i]=Math.round(children[i].y);
        }

        if (balaActiva1 == true) {
            this.physics.add.overlap(bala1, enemiesArray, KillEnemie1);
        }
        if (balaActiva2 == true) {
            this.physics.add.overlap(bala2, enemiesArray, KillEnemie2);
        }


            indexEnemieDead1=-1;
            indexEnemieDead2=-1;
        if (EnemieDead == true) {
            children = enemiesArray.getChildren();
            i = 0;
            while (children[i] != undefined && i < enemiesQuantity) {
                if (children[i].anims.currentKey == 'AmalgamaDeath') {
                        EnemieDead = false;
                        if(indexEnemieDead1 == -1)
                            indexEnemieDead1=i;
                        else if(indexEnemieDead2 == -1)
                             indexEnemieDead2=i;
                    for (var k = i; k < enemiesQuantity - 1; k++) {
                        velocityXEnemie[k] = velocityXEnemie[k + 1];
                        children[k] = children[k + 1];
                    }

                }
                i++;
            }
        }

        /*--------instructions of Player's death and movement----------*/
        if (colisionPlayer1 == false) {
            playerCollidesEnemies1.active = false;
            if (timerInitiated1 == false) {
                timedEvent1 = this.time.delayedCall(1000, enableColisionPlayer1, this, false);
                timerInitiated1 = true;
            }
        }


        if (colisionPlayer1 == true) {
            playerCollidesEnemies1.active = true;
            timerInitiated1 = false;
        }

       if (colisionPlayer2 == false) {
            playerCollidesEnemies2.active = false;
            if (timerInitiated2 == false) {
                timedEvent2 = this.time.delayedCall(1000, enableColisionPlayer2, this, false);
                timerInitiated2 = true;
            }
        }


        if (colisionPlayer2 == true) {
            playerCollidesEnemies2.active = true;
            timerInitiated2 = false;
        }

        function Idle() {
            if(updatePlayer1){
              players.player1.anims.play('idleMario1', true);
              players.player1.setVelocityX(0);

              //Move left
              if (controls1.cursors.left.isDown) {
                  playerState1 = playerStateList["movingLeft"];
              }
              //Move right
              if (controls1.cursors.right.isDown) {
                  playerState1 = playerStateList["movingRight"];
              }
              //Jump
              if (controls1.cursors.up.isDown) {
                  playerState1 = playerStateList["canJump"];
              }
              //Shooting
              if (canShoot1 == true) {
                  if (controls1.gunKey.isDown) {
                      playerState1 = playerStateList["shooting"];
                  }
              }
            }

            if(updatePlayer2){
              players.player2.anims.play('idleMario2', true);
              players.player2.setVelocityX(0);

              //Move Left
              if (controls2.cursors.left.isDown) {
                  playerState2 = playerStateList["movingLeft"];
              }
              //Move right
              if (controls2.cursors.right.isDown) {
                  playerState2 = playerStateList["movingRight"];
              }
              //Jump
              if (controls2.cursors.up.isDown) {
                  playerState2 = playerStateList["canJump"];
              }
              //Shooting
              if (canShoot2 == true) {
                  if (controls2.gunKey.isDown) {
                      playerState2 = playerStateList["shooting"];
                  }
              }
            }



        }

        function Left() {
            if(updatePlayer1){
              //Move left
              if (players.player1.flipX == false) {
                  players.player1.body.position.x -= 12;
                  players.player1.body.setOffset(34,7);
                  Offsetxplayer1=34;
                  Offsetyplayer1=7;
              }
              players.player1.setVelocityX(-160);
              players.player1.anims.play('Mario1Walk', true);
              players.player1.flipX = true;

              //Return Idle
              if (controls1.cursors.left.isUp && playerState1 === playerStateList["movingLeft"]) {
                  playerState1 = playerStateList["idle"];
              }

              //Jump
              if (controls1.cursors.up.isDown) {
                  playerState1 = playerStateList["canJump"];
              }

              //Shooting
              if (canShoot1 == true) {
                  if (controls1.gunKey.isDown) {
                      playerState1 = playerStateList["shooting"];
                  }
              }
            }

            if(updatePlayer2){
              if (players.player2.flipX == false) {
                  players.player2.body.position.x -= 12;
                  players.player2.body.setOffset(25,0);
                  Offsetxplayer2=25;
                  Offsetyplayer2=0;
              }
              players.player2.setVelocityX(-160);
              players.player2.anims.play('Mario2Walk', true);
              players.player2.flipX = true;

              //Return Idle
              if (controls2.cursors.left.isUp && playerState2 === playerStateList["movingLeft"]) {
                  playerState2 = playerStateList["idle"];
              }

              //Jump
              if (controls2.cursors.up.isDown) {
                  playerState2 = playerStateList["canJump"];
              }

              //Shooting
              if (canShoot2 == true) {
                  if (controls2.gunKey.isDown) {
                      playerState2 = playerStateList["shooting"];
                  }
              }
            }

        }

        function Right() {
            //Move right
            if(updatePlayer1){
              if (players.player1.flipX == true) {
                  players.player1.body.position.x += 12;
                  players.player1.body.setOffset(21,7);
                  Offsetxplayer1=21;
                  Offsetyplayer1=7;
              }
              players.player1.setVelocityX(160);
              players.player1.anims.play('Mario1Walk', true);
              players.player1.flipX = false;

              //Return Idle
              if (controls1.cursors.right.isUp && playerState1 === playerStateList["movingRight"]) {
                  playerState1 = playerStateList["idle"];
              }

              //Jump
              if (controls1.cursors.up.isDown) {
                  playerState1 = playerStateList["canJump"];
              }

              //Shooting
              if (canShoot1 == true) {
                  if (controls1.gunKey.isDown) {
                      playerState1 = playerStateList["shooting"];
                  }
              }
            }

            if(updatePlayer2){
              if (players.player2.flipX == true) {
                  players.player2.body.position.x += 12;
                  players.player2.body.setOffset(13,0);
                  Offsetxplayer2=13;
                  Offsetyplayer2=0;
              }
              players.player2.setVelocityX(160);
              players.player2.anims.play('Mario2Walk', true);
              players.player2.flipX = false;

              //Return Idle
              if (controls2.cursors.right.isUp && playerState2 === playerStateList["movingRight"]) {
                  playerState2 = playerStateList["idle"];
              }

              //Jump
              if (controls2.cursors.up.isDown) {
                  playerState2 = playerStateList["canJump"];
              }

              //Shooting
              if (canShoot2 == true) {
                  if (controls2.gunKey.isDown) {
                      playerState2 = playerStateList["shooting"];
                  }
              }
            }
        }

        function CanJump() {
          if(updatePlayer1){
            if (controls1.cursors.up.isDown && players.player1.body.touching.down) {
                players.player1.anims.play('Mario1JumpStart', true);
                playerState1 = playerStateList["jumping"];
                soundJump.play();
            }

            else {
                playerState1 = playerStateList["idle"];
            }
          }

          if(updatePlayer2){
            if (controls2.cursors.up.isDown && players.player2.body.touching.down) {
                players.player2.anims.play('Mario2JumpStart', true);
                playerState2 = playerStateList["jumping"];
                soundJump.play();
            }

            else {
                playerState2 = playerStateList["idle"];
            }
          }
        }

        function Jump() {
          if(updatePlayer1){
            //to control the jumping animation
            if (players.player1.anims.currentAnim.key == "Mario1JumpStart" && players.player1.anims.currentFrame.index == 5)
                players.player1.setVelocityY(-330);

            else if (players.player1.anims.currentFrame.index == 6) {
                players.player1.anims.stop(players.player1.anims.currentAnim.frames[5], false);
            }

            if (players.player1.body.touching.down && players.player1.anims.currentFrame.index == 6) {
                players.player1.setVelocityX(0);
                players.player1.anims.play('Mario1JumpEnd', true);
            }

            //Left
            if (controls1.cursors.left.isDown && controls1.cursors.right.isUp) {
                if (players.player1.flipX == false) {
                    players.player1.body.position.x -= 12;
                    players.player1.body.setOffset(32,7);
                    Offsetxplayer1=32;
                    Offsetyplayer1=7;
                }
                players.player1.setVelocityX(-150);
                players.player1.flipX = true;
            } else if (controls1.cursors.right.isDown && controls1.cursors.left.isUp) {
                if (players.player1.flipX == true) {
                    players.player1.body.position.x += 12;
                     players.player1.body.setOffset(22,7);
                    Offsetxplayer1=22;
                    Offsetyplayer1=7;
                }
                players.player1.setVelocityX(150);
                players.player1.flipX = false;
            }

            if (players.player1.anims.currentAnim.key == "Mario1JumpEnd" && players.player1.anims.currentFrame.index == 5) {
                if (players.player1.body.touching.down) {
                    playerState1 = playerStateList["idle"];
                }

                if (players.player1.body.touching.down && controls1.gunKey.isDown) {
                    playerState1 = playerStateList["shooting"];
                }
            }
          }

          if(updatePlayer2){
            //to control the jumping animation
            if (players.player2.anims.currentAnim.key == "Mario2JumpStart" && players.player2.anims.currentFrame.index == 5)
                players.player2.setVelocityY(-330);

            else if (players.player2.anims.currentFrame.index == 6) {
                players.player2.anims.stop(players.player2.anims.currentAnim.frames[5], false);
            }

            if (players.player2.body.touching.down && players.player2.anims.currentFrame.index == 6) {
                players.player2.setVelocityX(0);
                players.player2.anims.play('Mario2JumpEnd', true);
            }

            //Left
            if (controls2.cursors.left.isDown && controls2.cursors.right.isUp) {
                if (players.player2.flipX == false) {
                    players.player2.body.position.x -= 12;
                    players.player2.body.setOffset(24,0);
                    Offsetxplayer2=24;
                    Offsetyplayer2=0;
                }
                players.player2.setVelocityX(-150);
                players.player2.flipX = true;
            } else if (controls2.cursors.right.isDown && controls2.cursors.left.isUp) {
                if (players.player2.flipX == true) {
                    players.player2.body.position.x += 12;
                     players.player2.body.setOffset(12,0);
                    Offsetxplayer2=12;
                    Offsetyplayer2=0;
                }
                players.player2.setVelocityX(150);
                players.player2.flipX = false;
            }

            if (players.player2.anims.currentAnim.key == "Mario2JumpEnd" && players.player2.anims.currentFrame.index == 5) {
                if (players.player2.body.touching.down) {
                    playerState2 = playerStateList["idle"];
                }

                if (players.player2.body.touching.down && controls2.gunKey.isDown) {
                    playerState2 = playerStateList["shooting"];
                }
            }
          }
        }

        function Shooting() {
          if(updatePlayer1)
            if (canShoot1 == true) {
                if (players.player1.flipX == false) {
                    ShootDirection1 = "right";
                } else if (players.player1.flipX == true) {
                    ShootDirection1 = "left";
                }
                players.player1.anims.play('Mario1Shoot', true);
                if (players.player1.anims.currentFrame.index == 5) {
                    balaDisparada1 = true;
                    playerState1 = playerStateList["idle"];
                }
                players.player1.setVelocityX(0);
            }

          if(updatePlayer2)
            if (canShoot2 == true) {
                if (players.player2.flipX == false) {
                    ShootDirection2 = "right";
                } else if (players.player2.flipX == true) {
                    ShootDirection2 = "left";
                }
                players.player2.anims.play('Mario2Shoot', true);
                if (players.player2.anims.currentFrame.index == 5) {
                    balaDisparada2 = true;
                    playerState2 = playerStateList["idle"];
                }
                players.player2.setVelocityX(0);
            }

        }

        function Killbala1() {
            bala1.destroy();
            canShoot1 = true;
            balaActiva1 = false;
            balaDisparada1 =  false;
        }

        function Killbala2() {
            bala2.destroy();
            canShoot2 = true;
            balaActiva2 = false;
            balaDisparada2 = false;
        }

        function KillEnemie1() {
            soundDeathAmalgama.play();
            var i = 0;
            while (i < enemiesQuantity && children[i] != undefined) {
                if (Math.abs(Phaser.Math.Distance.Between(bala1.body.position.x, bala1.body.position.y,
                        children[i].body.position.x, children[i].body.position.y)) < 55) {
                            children[i].anims.play('AmalgamaDeath', 'true');
                            children[i].anims.currentKey = 'AmalgamaDeath';
                            children[i].body.velocity.x = 0;
                            children[i].body.gravity.y=-490;
                }
                i++;
            }
            EnemieDead = true;
            Killbala1();

        }

        function KillEnemie2() {
            soundDeathAmalgama.play();
            var i = 0;
            while (i < enemiesQuantity && children[i] != undefined) {
                if (Math.abs(Phaser.Math.Distance.Between(bala2.body.position.x, bala2.body.position.y,
                        children[i].body.position.x, children[i].body.position.y)) < 55) {
                            children[i].anims.play('AmalgamaDeath', 'true');
                            children[i].anims.currentKey = 'AmalgamaDeath';
                            children[i].body.velocity.x = 0;
                            children[i].body.gravity.y=-490;
                }
                i++;
            }
            EnemieDead = true;
            Killbala2();

        }

        function removeCollapse() {
            collapsablePlats1.active = false;
            collapsablePlats2.active = false;
            for (let i = 0; i < objects.collapsable.children.entries.length; i++) {
                objects.collapsable.children.entries[i].setTexture('collapsable');
            }
            collapseTimer = false;
            collapseEvent.remove();
        }

        function GameOver(scene) {
            playerState1 = playerStateList["movingRight"];
            playerState2 = playerStateList["movingRight"];
            balaActiva1 = false;
            balaActiva2 = false;
            game.registry.destroy();
            game.events.off();
            game.sound.stopAll();
            scene.start('GameOver');
            playerDead = false;
        }

        function Victory(scene) {
            playerState1 = playerStateList["movingRight"];
            playerState2 = playerStateList["movingRight"];
            balaActiva1 = false;
            balaActiva2 = false;
            game.registry.destroy();
            game.events.off();
            game.sound.stopAll();
            scene.start('Victory');
            playerDead = false;
        }
        
        if(idJugador==1){
        //conexion websocket 
                if(connection.readyState==1){
                                    
                    
                    JsonData=JSON.stringify([players.player1.body.velocity.x,players.player1.body.position.x,players.player1.body.position.y,players.player1.anims.currentAnim.key,players.player1.anims.currentFrame,players.player1.flipX,Offsetxplayer1,Offsetyplayer1,player1ReadyToPlay,velocityXEnemie,children,collapsableConexionLocal,indexEnemieDead1,indexEnemieDead2,positionXEnemy,positionYEnemy,enemiesQuantity,balaDisparada1,ShootDirection1]);
                    
                    connection.send(JsonData);
                    
                    connection.onerror = function(e) {
                        console.log("WS error: " + e);
                        }
                    connection.onmessage = function(msg) {
                        k=8;
                        data=JSON.parse(msg.data);
                        if(player2ReadyToPlay==true && data[8]!=null && data[8]==true){
                            
                            posxnew2=data[1];
                            posynew2=data[2];
                            //setAnim
                            players.player2.anims.load(data[3]);
                            players.player2.setFrame(data[4].frame); 
                            //setFlip
                            players.player2.flipX=data[5];
                            //setOffset
                            players.player2.setOffset(data[6],data[7]);
                            //set bala position
                            balaDisparada2=data[17];
                            if (data[18] == "right")
                                ShootDirection2 = "rightOnline";
                            else
                                ShootDirection2 = "leftOnline";
                            //Set enemies array for each camera player
                            
                            for(i=0;i<data[16]-16;i++){
                                children[i].setPosition(data[14][i],data[15][i]);
                                children[i].flipX=data[10][i].flipX;
                            };
                            
                            if((data[12])!=-1){
                                children[data[12]].anims.play('AmalgamaDeath',true);
                                children[data[12]].body.gravity.y=-490;
                                     for(var l=data[13];l<data[16]-1;l++)
                                    {
                                        children[l] = children[l + 1];
                                    }
                                Killbala2();
                            }
                            if((data[13])!=-1){
                                children[data[13]].anims.play('AmalgamaDeath',true);
                                children[data[13]].body.gravity.y=-490;
                                     for(l=data[13];l<data[16]-1;l++)
                                    {
                                        children[l] = children[l + 1];
                                    }
                                Killbala2();
                            }
                            // implement collapsable plats update for online gaming
                            if(data[11]==true){
                                collapsableConexionOnline=true;
                            }
                         
                        }
                    }
                    if(player2ReadyToPlay==true){
                            players.player2.body.position.x=posxnew2;
                            players.player2.body.position.y=posynew2;
                        }
                    
                connection.onclose = function(){
                    console.log("Se ha cerrado el servidor");
                }
            }
        }
        
    if(idJugador==2){
            if(connection.readyState==1){
                JsonData=JSON.stringify([players.player2.body.velocity.x,players.player2.body.position.x,players.player2.body.position.y,players.player2.anims.currentAnim.key,players.player2.anims.currentFrame,players.player2.flipX,Offsetxplayer2,Offsetyplayer2,player2ReadyToPlay,velocityXEnemie,children,collapsableConexionLocal,indexEnemieDead1,indexEnemieDead2,positionXEnemy,positionYEnemy,enemiesQuantity,balaDisparada2,ShootDirection2]);
                    
                connection.send(JsonData);
                
                connection.onerror = function(e) {
                console.log("WS error: " + e);
            }
                connection.onmessage = function(msg) {
                    data=JSON.parse(msg.data);
                
                    if(player1ReadyToPlay==true && data[8]!=null && data[8]==true){
                        posxnew1=data[1];
                        posynew1=data[2];
                        //setAnim
                        players.player1.anims.load(data[3]);
                        players.player1.setFrame(data[4].frame);
                        //setFlip
                        players.player1.flipX=data[5];
                        //setOffset
                         players.player1.setOffset(data[6],data[7]);
                        //set bala position
                        balaDisparada1=data[17];
                        if (data[18] == "right")
                            ShootDirection1 = "rightOnline";
                        else
                            ShootDirection1 = "leftOnline";
                        //Set enemies array for each camera player
                        for(i=16;i<data[16];i++){
                            children[i].setPosition(data[14][i],data[15][i]);
                            children[i].flipX=data[10][i].flipX; 
                        }
                        
                            if((data[12])!=-1){
                                children[data[12]].anims.play('AmalgamaDeath',true);
                                children[data[12]].body.gravity.y=-490;
                                for(var l=data[12];l<data[16]-1;l++)
                                    {
                                        children[l] = children[l + 1];
                                    }
                                    Killbala1();
                            }
                            if((data[13])!=-1){
                                children[data[13]].anims.play('AmalgamaDeath',true);
                                children[data[13]].body.gravity.y=-490;
                                       for(l=data[13];l<data[16]-1;l++)
                                    {
                                        children[l] = children[l + 1];
                                    }
                                    Killbala1();
                            }
                        // implement collapsable plats update for online gaming
                        if(data[11]==true){
                                collapsableConexionOnline=true;
                            }
                                    
                 
                    }
                }
                        if(player1ReadyToPlay==true){
                            players.player1.body.position.x=posxnew1;
                            players.player1.body.position.y=posynew1;
                        }
                
                
                connection.onclose = function(){
                    console.log("Se ha cerrado el servidor");
                }
                
            }
        }   
    }
}


  

