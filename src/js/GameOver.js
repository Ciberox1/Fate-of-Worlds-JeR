class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
  }

  preload(){

    this.load.image("fondo" , "../../assets/Images/Enviroment/Lab/Fondo laboratorio infinito.png");
    controls1.continueKey = this.input.keyboard.addKey('ENTER');

  }

  create() {
    this.add.image(0,0, "fondo").setOrigin(0).setDepth(0);
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    var Box = this.add.graphics().setDepth(1);
    Box.fillStyle(0x222222, 0.8);
    Box.fillRect(25, 25, width-50, height-50);

    var die = this.make.text({
      x: width/2,
      y: height/2,
      text: 'YOU DIED',
      style: {
        font: '200px monospace',
        fill: '#ff0000'
      }
    });

    die.setOrigin(0.5, 0.5).setDepth(3);

    var enter = this.make.text({
      x: width/2,
      y: height/2 + 225,
      text: 'Press ENTER to continue',
      style: {
      font: '40px monospace',
      fill: '#ff0000'
      }
    });

    enter.setOrigin(0.5, 0.5).setDepth(3);
  }

  update(){
    if (controls1.continueKey.isDown) {
        this.scene.start('MainMenu');
    }
  }
}
