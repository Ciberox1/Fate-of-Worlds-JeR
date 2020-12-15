class Creditos extends Phaser.Scene {
  constructor() {
    super({ key: 'Creditos' });
  }

  preload(){

    this.load.image("fondo" , "../../assets/Images/Enviroment/Lab/Fondo laboratorio infinito.png");
    this.load.image("back" , "../../assets/Images/Menu/back.png");
    this.load.image("hback" , "../../assets/Images/Menu/backh.png");
    this.load.image("team" , "../../assets/Images/Menu/team.png");
    this.load.image("hteam" , "../../assets/Images/Menu/teamh.png");
    this.load.image("acknowledgment" , "../../assets/Images/Menu/acknowledgment.png");
    this.load.image("hacknowledgment" , "../../assets/Images/Menu/acknowledgmenth.png");

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

    let team = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2, "team").setDepth(1);

    team.setScale(0.5);

    let Hteam = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2, "hteam").setDepth(1);

    Hteam.setScale(0.5);
    Hteam.setVisible(false);

    team.setInteractive();

    team.on("pointerover",()=>{
      Hteam.setVisible(true);
      Hteam.x = team.x;
      Hteam.y = team.y;
    })

    team.on("pointerout",()=>{
      Hteam.setVisible(false);
    })

    team.on("pointerup",()=>{
      this.scene.start('Desarrolladores');
    })

    let acknowledgment = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2+200, "acknowledgment").setDepth(1);

    acknowledgment.setScale(0.5);

    let Hacknowledgment = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2, "hacknowledgment").setDepth(1);

    Hacknowledgment.setScale(0.5);
    Hacknowledgment.setVisible(false);

    acknowledgment.setInteractive();

    acknowledgment.on("pointerover",()=>{
      Hacknowledgment.setVisible(true);
      Hacknowledgment.x = acknowledgment.x;
      Hacknowledgment.y = acknowledgment.y;
    })

    acknowledgment.on("pointerout",()=>{
      Hacknowledgment.setVisible(false);
    })

    acknowledgment.on("pointerup",()=>{
      this.scene.start('Agradecimientos');
    })
  }
}
