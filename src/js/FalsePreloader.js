class FalsePreloader extends Phaser.Scene {
  constructor() {
    super({ key: 'FalsePreloader' });
  }

  preload() {

    //Barra de Carga
      var progressBar = this.add.graphics();
      var progressBox = this.add.graphics();
      progressBox.fillStyle(0x222222, 0.8);
      progressBox.fillRect(430, 395, 320, 50);

      var width = this.cameras.main.width;
      var height = this.cameras.main.height;
      var loadingText = this.make.text({
          x: width / 2,
          y: height / 2 - 50,
          text: 'Loading...',
          style: {
            font: '20px monospace',
            fill: '#ffffff'
          }
      });
      loadingText.setOrigin(0.5, 0.5);

      var percentText = this.make.text({
          x: width / 2,
          y: height / 2 - 5,
          text: '0%',
          style: {
            font: '18px monospace',
            fill: '#ffffff'
          }
      });
      percentText.setOrigin(0.5, 0.5);

      var continueText = this.make.text({
          x: width / 2,
          y: 2 * height / 3,
          text: 'Pulsa ENTER para continuar',
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
        progressBar.fillRect(440, 405, 300 * value, 30);
        percentText.setText(parseInt(value * 100) + '%');
      });

      this.load.on('complete', function () {
          continueText.setVisible(true);
          progressBar.destroy();
          progressBox.destroy();
          loadingText.destroy();
          percentText.destroy();
      });
      for (var i = 0; i < 50; i++) {
          this.load.image('car' + i, '../../assets/Images/Enviroment/LabTileset/Backgrounds/fondo.png');
    }
}
create(){
  controls1.continueKey = this.input.keyboard.addKey('ENTER');

}

update() {
  if (controls1.continueKey.isDown) {
    this.scene.start('Level');
  }
}
}
