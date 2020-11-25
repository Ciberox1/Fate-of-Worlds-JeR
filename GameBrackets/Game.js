var config={
    width:800,
    height:600,
    parent:"container",
    type: Phaser.AUTO,
    scene:{
        preload:preload,
        create:create,
        update:update
    }
}

var game= new Phaser.Game(config);

function preload(){
    this.load.image('','');
    
    
    /*this.load.spritesheet(){ frameWidth: 32, frameHeight:48 }
    Esto carga un conjunto de sprites en un array, por lo que el nombre clave del array que pongamos seguido de un [x] nos mostrará distintos sprites de un mismo personaje. Así se usarán para animar.
*/
}
function create(){
    this.add.image(400,300,'');
}
function update(){
    
}
