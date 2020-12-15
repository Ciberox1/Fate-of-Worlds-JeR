class FalseMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'FalseMenu' });
  }

  preload(){

    //Assets del MainMenu
    this.load.image("fondo" , "../../assets/Images/Enviroment/Lab/Fondo laboratorio infinito.png");

  }

  create() {
    this.add.image(0,0, "fondo").setOrigin(0).setDepth(0);

    var title = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2 - 50, "title").setDepth(1);

    title.setScale(3,2);

    let playButton = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2 + 100, "play").setDepth(1);

    playButton.setScale(2);

    let HplayButton = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2, "Hplay").setDepth(1);

    HplayButton.setScale(2);
    HplayButton.setVisible(false);

    let optionsButton = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2 + 200, "options").setDepth(1);

    optionsButton.setScale(2);

    let HoptionsButton = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2, "Hoptions").setDepth(1);

    HoptionsButton.setScale(2);
    HoptionsButton.setVisible(false);

    playButton.setInteractive();

    playButton.on("pointerover",()=>{
      HplayButton.setVisible(true);
      HplayButton.x = playButton.x;
      HplayButton.y = playButton.y;
    })

    playButton.on("pointerout",()=>{
      HplayButton.setVisible(false);
    })

    playButton.on("pointerup",()=>{
      this.scene.start('FalsePreloader');
    })

    optionsButton.setInteractive();

    optionsButton.on("pointerover",()=>{
      HoptionsButton.setVisible(true);
      HoptionsButton.x = optionsButton.x;
      HoptionsButton.y = optionsButton.y;
    })

    optionsButton.on("pointerout",()=>{
      HoptionsButton.setVisible(false);
    })

    optionsButton.on("pointerup",()=>{
      this.scene.start('Creditos');
    })
  }
}
