class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  preload(){

    //Assets del MainMenu
    this.load.image("fondo" , "../../assets/Images/Enviroment/Lab/Fondo laboratorio infinito.png");
    this.load.image('load','../../assets/Images/Menu/Loading.png');
    this.load.image("title" , "../../assets/Images/Menu/Título.png")
    this.load.image("play" , "../../assets/Images/Menu/play.png");
    this.load.image("Hplay" , "../../assets/Images/Menu/playh.png");
    this.load.image("options" , "../../assets/Images/Menu/credits.png");
    this.load.image("Hoptions" , "../../assets/Images/Menu/creditsh.png");

  }

  create() {
    this.add.image(0,0, "fondo").setOrigin(0).setDepth(0);

    var title = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2 - 50, "title").setDepth(1);

    title.setScale(3,2);

    let playButton = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2 + 150, "play").setDepth(1);

    playButton.setScale(0.5);

    let HplayButton = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2, "Hplay").setDepth(1);

    HplayButton.setScale(0.5);
    HplayButton.setVisible(false);

    let optionsButton = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2 + 250, "options").setDepth(1);

    optionsButton.setScale(0.5);

    let HoptionsButton = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2, "Hoptions").setDepth(1);

    HoptionsButton.setScale(0.5);
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
      if (notLoad) {
        this.scene.start('Preloader');
      } else if (!notLoad){
        this.scene.start('Level');
      }
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
