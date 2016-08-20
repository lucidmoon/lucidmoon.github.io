// pongField v1.0
// author: lucidmoon
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'pongField', {preload: preload, create: create, update: update, render: render});
         
var bulat;
var bulatSpeed_x = 5, bulatSpeed_y = 5;
var skorP1,skorP2, sekor1=0,sekor2=0;
var red,blue;
var player1,player2;

function preload(){
    game.load.image('field', 'img/pongField-dummy.jpg');
    game.load.atlasXML('red-idle', 'img/red/red-idle.png', 'img/red/red-idle.xml');
    game.stage.backgroundColor = '#000000';
    
}
            
function create(){
    //field
    game.add.image(0, 0, 'field');
    
    //player-1
    red = game.add.sprite(10,10, 'red-idle');
    red.scale.x =  red.scale.y = .5;
    red.animations.add('redIdle');
    red.animations.play('redIdle',8,true);
    
    //player-2
    blue = game.add.sprite(780,10, 'red-idle');
    blue.scale.x = -0.5;
    blue.scale.y = 0.5;
    blue.animations.add('blueIdle');
    blue.animations.play('blueIdle',8,true);
    
    //bola
    bulat = new Phaser.Circle(200, 200, 20);
    
    //debug hitBox
    player1 = new Phaser.Rectangle(red.x+90,red.y,10,110);
    player2 = new Phaser.Rectangle(blue.x-100,blue.y,10,110);

    //skor
    skorP1 = game.add.text (300, 10, sekor1);
    skorP1.fontSize = 50;
    
    skorP2 = game.add.text (500, 10, sekor2);
    skorP2.fontSize = 50;
}
            
function update(){
    
    updateBola();
    controlPlayer1();
    controlPlayer2();
    checkCollition();
    
    
}
            
function render(){
    game.debug.geom(bulat, '#ffff00');
    game.debug.geom(player1, '#ff0000');
    game.debug.geom(player2, '#ff0000');
}

//=================================================

function updateBola(){    
    if (bulat.y >= 590 || bulat.y <= 10){
        bulatSpeed_y *= -1;
    }
    
    bulat.x += bulatSpeed_x;
    bulat.y += bulatSpeed_y;
}

function controlPlayer1(){
    // =============== p1 ==================
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
        player1.y +=10;
        red.y +=10;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
        player1.y -=10;
        red.y -=10;
    }
}

function controlPlayer2(){
    // =============== p2 ==================
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        player2.y +=10;
        blue.y +=10;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        player2.y -=10;
        blue.y -=10;
    }
}

function checkCollition(){
    
    //check if hit by player1
    if ((bulat.x <= red.x+110) && (bulat.x >= red.x+100) && (bulat.y >= red.y) && (bulat.y <= red.y+110) && bulatSpeed_x < 0){
        bulatSpeed_x *= -1;
    }
    
    //check if hit by player2
    if ((bulat.x >= blue.x-110) && (bulat.x <= blue.x-100) && (bulat.y >= blue.y) && (bulat.y <= blue.y+110) && bulatSpeed_x > 0){
        bulatSpeed_x *= -1;
    }
    
    //check if ball hit wall
    if (bulat.x <= 10){
        bulatSpeed_x *= -1;
        sekor2 += 1;
        skorP2.text = sekor2;
    }
    else if (bulat.x >= 790){
        bulatSpeed_x *= -1;
        sekor1 += 1;
        skorP1.text = sekor1;
    }
    
}