import "pixi";
import "p2";
import Phaser from 'phaser-ce';


var PokeCard = {
    image_file: "",
    health: 100,
    hunger: 1,  // decimal value from 0 to 1
    happiness: 0.5, // decimal value from 0 to 1
    level: 1, // level goes from 1 to 10
    phaser_object: null
};
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

function preload () {

    game.load.image('logo', './phaser.png');

}


function create () {

    var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);

}

function update() {

}
