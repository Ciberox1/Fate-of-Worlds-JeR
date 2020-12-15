class Creditos extends Phaser.Scene {
  constructor() {
    super({ key: 'Creditos' });
  }

  preload(){

    this.load.image("fondo" , "../../assets/Images/Enviroment/Lab/Fondo laboratorio infinito.png");

  }

  create() {
    this.add.image(0,0, "fondo").setOrigin(0).setDepth(0);
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    var Jonas = this.make.text({
        x: width / 2 - 550,
        y: height / 2 - 50,
        text: 'Jonas Martin Carasa: ',
        style: {
          font: '25px monospace',
          fill: '#ffffff'
        }
    });

    var Mario = this.make.text({
        x: width / 2 - 550,
        y: height / 2 - 75,
        text: 'Mario Simon Soto: ',
        style: {
          font: '25px monospace',
          fill: '#ffffff'
        }
    });

    var Adrian = this.make.text({
        x: width / 2 - 550,
        y: height / 2 - 100,
        text: 'Adrian Salgado Jimeno: ',
        style: {
          font: '25px monospace',
          fill: '#ffffff'
        }
    });

    var Alejandro = this.make.text({
        x: width / 2 - 550,
        y: height / 2 - 125,
        text: 'Alejandro Garcia-Muñoz Muñoz: ',
        style: {
          font: '25px monospace',
          fill: '#ffffff'
        }
    });

    var Aless = this.make.text({
        x: width / 2 - 550,
        y: height / 2 - 25,
        text: 'Aless Garcia Ochoa: ',
        style: {
          font: '25px monospace',
          fill: '#ffffff'
        }
    });

    var Agradecimientos = this.make.text({
        x: width / 2,
        y: height / 2 + 25,
        text: 'Agradecimientos: ',
        style: {
          font: '25px monospace',
          fill: '#ffffff'
        }
    });
    Agradecimientos.setOrigin(0.5, 0.5);
  }
}
