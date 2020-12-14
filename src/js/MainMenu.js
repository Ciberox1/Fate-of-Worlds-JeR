class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  preload(){

    //Assets del MainMenu
    this.load.image("fondo" , "../../assets/Images/Enviroment/Lab/Fondo laboratorio infinito.png");
    this.load.image("play" , "../../assets/Images/Menu/play_button.png");
    this.load.image("Hplay" , "../../assets/Images/Menu/Hplay_button.png");
    this.load.image("options" , "../../assets/Images/Menu/options_button.png");
    this.load.image("Hoptions" , "../../assets/Images/Menu/Hoptions_button.png");

  }

  create() {
    this.add.image(0,0, "fondo").setOrigin(0).setDepth(0);

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
      this.scene.start('Preloader');
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
      console.log("hola");
    })
  }
}
