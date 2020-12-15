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

    var programadores = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Programadores: ',
        style: {
          font: '20px monospace',
          fill: '#ffffff'
        }
    });
    programadores.setOrigin(0.5, 0.5);

    var artistas = this.make.text({
        x: width / 2,
        y: height / 2 - 75,
        text: 'Artistas: ',
        style: {
          font: '20px monospace',
          fill: '#ffffff'
        }
    });
    artistas.setOrigin(0.5, 0.5);

    var diseñador = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Diseñador de Niveles: ',
        style: {
          font: '20px monospace',
          fill: '#ffffff'
        }
    });
    diseñador.setOrigin(0.5, 0.5);
  }
}
