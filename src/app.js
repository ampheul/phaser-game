// The order of imports matter apparently
import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';




var PokeCard = {
    image_file: "",
    health: 100,
    hunger: 1,  // decimal value from 0 to 1
    happiness: 0.5, // decimal value from 0 to 1
    level: 1, // level goes from 1 to 10
    phaser_object: null
};
var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload () {

    game.load.spritesheet('logo', '../assets/squirtle_animated_189x199.png', 189, 199);

}

var logo;
var cursors;
function create () {

    game.world.setBounds(0, 0, 2000, 2000);
    game.stage.backgroundColor = '#222222';
    cursors = game.input.keyboard.createCursorKeys();

    var updateFunction = function(frequency, yAmplitude, xAmplitude) {
        this.time = this.time || 1;
        this.originX = this.originX || this.centerX;
        this.originY = this.originY || this.centerY;
        this.centerY = this.originY + yAmplitude*Math.sin(frequency*this.time);
        this.centerX = this.originX + xAmplitude*Math.cos(frequency*this.time);

        this.time++;
    };



    var cameraSpeed = 4;

    for (var i = 0; i < 150; i++)
    {
        var squirt = game.add.sprite(game.world.randomX, game.world.randomY, 'logo');

        squirt.animations.add(
            'idle',
            [0,1,2,3,4,5,6,7,8,9,10,11,12],
            3 + 3 * Math.random(),
            true);

        squirt.animations.play('idle');
        squirt.time = 0;
        squirt.update = updateFunction.bind(
            squirt,
            1/100*(1 + Math.random()),
            0.1*(1+Math.random())*(game.world.height - squirt.height)/2,
            0.1*(1+Math.random())*(game.world.width - squirt.width)/2);
        squirt.tint = 0xFFFFFF*Math.random();
    }

    cursors = game.input.keyboard.createCursorKeys();

    var lemniscate = function (t) {
        if (this.time === undefined) {
            this.time = t;
        }
        var frequency = 0.03;
        var c = Math.cos(frequency*this.time);
        var s = Math.sin(frequency*this.time);
        this.centerX = game.camera.x + game.camera.width/2 + 300*c;
        this.centerY = game.camera.y + game.camera.height/2 + 300*s/2*c;
        this.time++;
    }

    for (var i = 0; i < 200; i++) {
        var squirt = game.add.sprite(game.world.randomX, game.world.randomY, 'logo');

        squirt.animations.add(
            'idle',
            [0,1,2,3,4,5,6,7,8,9,10,11,12],
            3 + 3 * Math.random(),
            true);

        squirt.animations.play('idle');
        squirt.update = lemniscate.bind(squirt, -i);
        squirt.tint = 0xFFFFFF*Math.random();
    }


    logo = game.add.sprite(400, 400, 'logo');

    logo.update = updateFunction.bind(
        logo,
        1/10,
        0*0.1*(game.world.height - logo.height)/2,
        0*0.1*(game.world.width - logo.width)/2);
    logo.animations.add('idle', [0,1,2,3,4,5,6,7,8,9,10,11,12], 4, true);
    logo.animations.play('idle');
}

function update() {
    if (cursors.up.isDown)
    {
        game.camera.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 4;
    }

    if (cursors.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 4;
    }
    logo.originX = game.camera.x + game.camera.width/2;
    logo.originY = game.camera.y + game.camera.height/2;
}

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);

}
