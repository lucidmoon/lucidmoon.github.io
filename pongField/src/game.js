// pongField v1.0
// author: lucidmoon
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'pongField', {preload: preload, create: create, update: update, render: render});
         
var bulat;
var bulatSpeed_x = 5, bulatSpeed_y = 5;
var skor, sekor=0;

function preload(){
    game.load.image('field', 'img/pongField-dummy.jpg');
    game.stage.backgroundColor = '#ffffff';
    
}
            
function create(){
    game.add.image(0, 0, 'field');
    bulat = new Phaser.Circle(200, 200, 20);
    player1 = new Phaser.Rectangle(30,30,15,70);
    skor = game.add.text (50, 50, sekor);
    skor.fontSize = 200;
}
            
function update(){
    
    if (bulat.x >= 790 || bulat.x <= 10){
        bulatSpeed_x *= -1;
        if (bulat.x >= 790){
            sekor += 1;
            skor.text = sekor;
            
        }
    }
    
    if (bulat.y >= 590 || bulat.y <= 10){
        bulatSpeed_y *= -1;
    }
    
    bulat.x += bulatSpeed_x;
    bulat.y += bulatSpeed_y;
    
    // =============== p1 ==================
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
        player1.y +=10;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
        player1.y -=10;
    }
    
    //check if hit by player1
    if ((bulat.x >= player1.x+15) && (bulat.y >= player1.y) && (bulat.x <= player1.x+15) && (bulat.y <= player1.y+50)){
        bulatSpeed_x *= -1;
    }
    
    
}
            
function render(){
    game.debug.geom(bulat, '#ffff00');
    game.debug.geom(player1, '#ffff00');
}