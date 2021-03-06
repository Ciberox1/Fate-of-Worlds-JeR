class Preloader extends Phaser.Scene {
    constructor() {
        super({
            key: 'Preloader'
        });
    }

    preload() {

        
        connection = new WebSocket('ws://127.0.0.1:8080/game'); 
        this.add.image(0,0, "load").setOrigin(0).setDepth(0);
        var title = this.add.image(780,100, "title").setOrigin(0).setDepth(1);
        title.setScale(1,2);

        //Barra de Carga
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(840, 765, 320, 50);

        var loadingText = this.make.text({
            x: 1000,
            y: 750,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: 1000,
            y: 790,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var continueText = this.make.text({
            x: 1000,
            y: 800,
            text: 'Press ENTER to continue',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        continueText.setOrigin(0.5, 0.5);
        continueText.setVisible(false);

          this.load.on('progress', function (value) {
              progressBar.clear();
              progressBar.fillStyle(0xffffff, 1);
              progressBar.fillRect(850, 775, 300 * value, 30);
              percentText.setText(parseInt(value * 100) + '%');
          });

          this.load.on('complete', function () {
              continueText.setVisible(true);
              progressBar.destroy();
              progressBox.destroy();
              loadingText.destroy();
              percentText.destroy();
          });

          //Carga de assets
          this.load.image('lab', '../../assets/Images/Enviroment/LabTileset/Backgrounds/fondo.png');
          this.load.image('lab2', '../../assets/Images/Enviroment/LabTileset/Backgrounds/fondo2R.png');
          this.load.image('ground', '../../assets/Images/Test/platform.png');
          this.load.image('collapsable', '../../assets/Images/Enviroment/Subway/Plataforma horizontal colapsable2.png');
          this.load.image('collapsed', '../../assets/Images/Enviroment/Subway/Plataforma horizontal colapsada2.png');

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
          this.load.image('vPipe', '../../assets/Images/Enviroment/Warped city/Tubería vertical.png'); /*placa metálica*/
          this.load.image('diagonalBeamB', '../../assets/Images/Enviroment/Space runner/Viga diagonal 1.png'); /*viga diagonal*/
          this.load.image('diagonalBeamB2', '../../assets/Images/Enviroment/Space runner/Viga diagonal 2.png'); /*viga diagonal*/
          this.load.image('machine', '../../assets/Images/Enviroment/Warped city/Máquina con pantalla.png');
          this.load.image('redBeamD', '../../assets/Images/Enviroment/Subway/Viga roja diagonal 1.png');
          this.load.image('redBeamD2', '../../assets/Images/Enviroment/Subway/Viga roja diagonal 2.png');
          this.load.image('exit', '../../assets/Images/Enviroment/Subway/Salida emergencia.png');
          /*Fin imágenes necesarias para los sprites del mundo*/

          //sprites del personaje y relacionados
          this.load.image('heart', '../../assets/Images/Protagonista/Mario 1/Heart.png');
          this.load.image('bala', '../../assets/Images/Protagonista/Mario 1/bala.png');

          /*-------------------------------------- MARIO 1 -----------------------------------------------*/
          this.load.spritesheet('Mario1Walk', '../../assets/Images/Protagonista/Mario 1/Run.png', {

              frameWidth: 64,
              frameHeight: 48
          });

          this.load.spritesheet('Mario1Aim', '../../assets/Images/Protagonista/Mario 1/Aim.png', {
              frameWidth: 64,
              frameHeight: 48
          });

          this.load.spritesheet('Mario1idle', '../../assets/Images/Protagonista/Mario 1/Idle.png', {
              frameWidth: 64,
              frameHeight: 48
          });

          this.load.spritesheet('Mario1Shoot', '../../assets/Images/Protagonista/Mario 1/Shoot.png', {
              frameWidth: 64,
              frameHeight: 48
          });

          this.load.spritesheet('Mario1Jump', '../../assets/Images/Protagonista/Mario 1/Jump.png', {
              frameWidth: 64,
              frameHeight: 48
          });


          /*-------------------------------------- MARIO 2 -----------------------------------------------*/

          this.load.spritesheet('Mario2Walk','../../assets/Images/Protagonista/Mario 2/Run.png', {
              frameWidth: 50,
              frameHeight: 40
          });

          this.load.spritesheet('Mario2idle', '../../assets/Images/Protagonista/Mario 2/Idle.png', {
              frameWidth: 50,
              frameHeight: 40
          });

          this.load.spritesheet('Mario2Shoot','../../assets/Images/Protagonista/Mario 2/Shoot.png', {
              frameWidth: 50,
              frameHeight: 40
          });

          this.load.spritesheet('Mario2Jump','../../assets/Images/Protagonista/Mario 2/Jump.png', {
              frameWidth: 50,
              frameHeight: 41
          });



          this.load.spritesheet('heartAnim', '../../assets/Images/Protagonista/Mario 1/Heart.png', {
              frameWidth: 18,
              frameHeight: 18
          });
          this.load.spritesheet('Amalgama', '../../assets/Images/Enemies/Amalgama/Trash Monster-Sprite sheet.png', {
              frameWidth: 64,
              frameHeight: 64
          });
          this.load.audio('shootSound', [
          '../../assets/Music/shoot.wav'
          ]);
          this.load.audio('hitSound', [
          '../../assets/Music/hit.mp3'
          ]);
          this.load.audio('JumpSound', [
          '../../assets/Music/jump.ogg'
          ]);
          this.load.audio('AmalgamaDeathSound', [
          '../../assets/Music/deathAmalgama.wav'
          ]);
          this.load.audio('CollapseSound', [
          '../../assets/Music/teleport.mp3'
          ]);
          this.load.audio('BackgroundSound', [
          '../../assets/Music/LabBackground.mp3'
          ]);
          notLoad = false;
          console.log("cargado");

      }

    create() {
        controls1.continueKey = this.input.keyboard.addKey('ENTER');
    }

    update() {
        
        if (controls1.continueKey.isDown) {
            if(connection.readyState==1){
                if(idJugador==null)
                    idJugador=window.prompt("¿Qué jugador quieres? ");  
                if(idJugador==2){
                    player2Ready=true;
                    connection.send(JSON.stringify(player2Ready));
                    connection.onmessage= function(msg){
                        JSON.parse(msg.data);
                        player1Ready=msg.data;
                    }
                }
                else if(idJugador==1){
                        player1Ready=true;
                        connection.send(JSON.stringify(player1Ready));
                        connection.onmessage= function(msg){
                            JSON.parse(msg.data);
                            player2Ready=msg.data;
                        }
                }
            }
        }
            if(player1Ready && player2Ready)
                            this.scene.start('Level');
                
            
        
    }
}