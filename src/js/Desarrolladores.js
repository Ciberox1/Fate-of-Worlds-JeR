class Desarrolladores extends Phaser.Scene {
  constructor() {
    super({ key: 'Desarrolladores' });
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

    var Alejandro = this.make.text({
        x: width / 2 - 550,
        y: height / 2 - 125,
        text: 'Alejandro García-Muñoz Muñoz: ',
        style: {
          font: '25px monospace',
          fill: '#ffffff'
        }
    });

    var AlejandroRoles = this.make.text({
        x: width / 2 - 550,
        y: height / 2 - 85,
        text: 'Menu Programmer & Designer, Lead Artist, Programmer, Github Master Manager & Bruce Willis\' Stunt Double',
        style: {
          font: '15px monospace',
          fill: '#ffffff'
        }
    });

    var Adrian = this.make.text({
        x: width / 2 - 550,
        y: height / 2 - 35,
        text: 'Adrián Salgado Jimeno: ',
        style: {
          font: '25px monospace',
          fill: '#ffffff'
        }
    });

    var AdrianRoles = this.make.text({
        x: width / 2 - 550,
        y: height / 2 + 5,
        text: 'Lead Programmer, Web Designer & Programmer, Beta Tester, Bug Fixer & Atom Religious Leader',
        style: {
          font: '15px monospace',
          fill: '#ffffff'
        }
    });

    var Mario = this.make.text({
        x: width / 2 - 550,
        y: height / 2 + 55,
        text: 'Mario Simón Soto: ',
        style: {
          font: '25px monospace',
          fill: '#ffffff'
        }
    });

    var MarioRoles = this.make.text({
        x: width / 2 - 550,
        y: height / 2 + 95,
        text: 'Game Designer, Lead Level Designer, Programmer & Wizard',
        style: {
          font: '15px monospace',
          fill: '#ffffff'
        }
    });

    var Jonas = this.make.text({
        x: width / 2 - 550,
        y: height / 2 + 145,
        text: 'Jonás Martín Carasa: ',
        style: {
          font: '25px monospace',
          fill: '#ffffff'
        }
    });

    var JonasRoles = this.make.text({
        x: width / 2 - 550,
        y: height / 2 + 185,
        text: 'Artist, Camera Manager, Level Programmer, Game Designer, Beta Tester & Proud Duck Owner',
        style: {
          font: '15px monospace',
          fill: '#ffffff'
        }
    });

    var Aless = this.make.text({
        x: width / 2 - 550,
        y: height / 2 + 235,
        text: 'Alejandro García Ochoa: ',
        style: {
          font: '25px monospace',
          fill: '#ffffff'
        }
    });

    var AlessRoles = this.make.text({
        x: width / 2 - 550,
        y: height / 2 + 275,
        text: 'Programmer, Artist, Sound Designer & Sexiest Man Alive',
        style: {
          font: '15px monospace',
          fill: '#ffffff'
        }
    });
  }
}
