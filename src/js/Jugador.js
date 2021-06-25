class Jugador extends Phaser.Scene {
    constructor() {
      super({ key: 'Jugador' });
    }
  
    preload(){
  
      this.load.image("fondo" , "../../assets/Images/Enviroment/Lab/Fondo laboratorio infinito.png");
      this.load.image("back" , "../../assets/Images/Menu/back.png");
      this.load.image("hback" , "../../assets/Images/Menu/backh.png");
      this.load.image("player1" , "../../assets/Images/Menu/player1.png");
      this.load.image("Hplayer1" , "../../assets/Images/Menu/player1h.png");
      this.load.image("player2" , "../../assets/Images/Menu/player2.png");
      this.load.image("Hplayer2" , "../../assets/Images/Menu/player2h.png");
  
    }
  
    create() {
      this.add.image(0,0, "fondo").setOrigin(0).setDepth(0);
      var width = this.cameras.main.width;
      var height = this.cameras.main.height;

      let back = this.add.image(150,50, "back").setDepth(1);

      back.setScale(0.5);

      let Hback = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2, "hback").setDepth(1);

      Hback.setScale(0.5);
      Hback.setVisible(false);

      back.setInteractive();

      back.on("pointerover",()=>{
        Hback.setVisible(true);
        Hback.x = back.x;
        Hback.y = back.y;
      })

      back.on("pointerout",()=>{
        Hback.setVisible(false);
      })

      back.on("pointerup",()=>{
        this.scene.start('MainMenu');
      })
  
      let player1 = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2 +200, "player1").setDepth(1);

      player1.setScale(0.5);

      let Hplayer1 = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2, "Hplayer1").setDepth(1);

      Hplayer1.setScale(0.5);
      Hplayer1.setVisible(false);

      player1.setInteractive();

      player1.on("pointerover",()=>{
        Hplayer1.setVisible(true);
        Hplayer1.x = player1.x;
        Hplayer1.y = player1.y;
      })

      player1.on("pointerout",()=>{
        Hplayer1.setVisible(false);
      })

      player1.on("pointerup",()=>{
        idJugador=1;
        this.scene.start('Preloader');
      })

      let player2 = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2, "player2").setDepth(1);

      player2.setScale(0.5);

      let Hplayer2 = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2 - 200, "Hplayer2").setDepth(1);

      Hplayer2.setScale(0.5);
      Hplayer2.setVisible(false);

      player2.setInteractive();

      player2.on("pointerover",()=>{
        Hplayer2.setVisible(true);
        Hplayer2.x = player2.x;
        Hplayer2.y = player2.y;
      })

      player2.on("pointerout",()=>{
        Hplayer2.setVisible(false);
      })

      player2.on("pointerup",()=>{
        idJugador=2;
        this.scene.start('Preloader');
      })
  
    }
  }
  