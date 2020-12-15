class Agradecimientos extends Phaser.Scene {
  constructor() {
    super({ key: 'Agradecimientos' });
  }

  preload(){

    this.load.image("fondo" , "../../assets/Images/Enviroment/Lab/Fondo laboratorio infinito.png");
    this.load.image("back" , "../../assets/Images/Menu/back.png");
    this.load.image("hback" , "../../assets/Images/Menu/backh.png");

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
      this.scene.start('Creditos');
    })

    var Agradecimientos = this.make.text({
        x: width / 2,
        y: height / 2 - 125,
        text: 'Agradecimientos: ',
        style: {
          font: '25px monospace',
          fill: '#ffffff'
        }
    });
    Agradecimientos.setOrigin(0.5, 0.5);

    var Agradecidos1 = this.make.text({
        x: width / 2 - 550,
        y: height / 2 - 85,
        text: 'Lab y warped city-> ansimuz',
        style: {
          font: '20px monospace',
          fill: '#ffffff'
        }
    });

    var Agradecidos2 = this.make.text({
        x: width / 2 - 550,
        y: height / 2 - 45,
        text: 'LabTileset -> Novus Gem',
        style: {
          font: '20px monospace',
          fill: '#ffffff'
        }
    });

    var Agradecidos3 = this.make.text({
        x: width / 2 - 550,
        y: height / 2 - 5,
        text: 'Space runner -> MattWalkden',
        style: {
          font: '20px monospace',
          fill: '#ffffff'
        }
    });

    var Agradecidos4 = this.make.text({
        x: width / 2 - 550,
        y: height / 2 + 35,
        text: 'Personaje -> Hugues laborde',
        style: {
          font: '20px monospace',
          fill: '#ffffff'
        }
    });

    var Agradecidos5 = this.make.text({
        x: width / 2 - 550,
        y: height / 2 + 75,
        text: 'Laser Fire Sound-> dklon',
        style: {
          font: '20px monospace',
          fill: '#ffffff'
        }
    });

    var Agradecidos6 = this.make.text({
        x: width / 2 - 550,
        y: height / 2 + 115,
        text: 'Jump Sound -> IgnasD',
        style: {
          font: '20px monospace',
          fill: '#ffffff'
        }
    });

    var Agradecidos7 = this.make.text({
        x: width / 2 - 550,
        y: height / 2 + 155,
        text: 'Hit Sound -> thebardofblasphemy',
        style: {
          font: '20px monospace',
          fill: '#ffffff'
        }
    });

    var Agradecidos8 = this.make.text({
        x: width / 2 - 550,
        y: height / 2 + 195,
        text: 'Monster Sound -> Michel Baradi',
        style: {
          font: '20px monospace',
          fill: '#ffffff'
        }
    });

    var Agradecidos9 = this.make.text({
        x: width / 2 - 550,
        y: height / 2 + 235,
        text: 'Collision Sound -> diego200052',
        style: {
          font: '20px monospace',
          fill: '#ffffff'
        }
    });

    var Agradecidos10 = this.make.text({
        x: width / 2 - 550,
        y: height / 2 + 275,
        text: 'Music -> remaxim',
        style: {
          font: '20px monospace',
          fill: '#ffffff'
        }
    });

    var Agradecidos11 = this.make.text({
        x: width / 2 - 550,
        y: height / 2 + 315,
        text: 'Subway -> This assets was crafted by @Anokolisa and @al_MSantos, and published by Vaca Roxa.',
        style: {
          font: '20px monospace',
          fill: '#ffffff'
        }
    });
  }
}
