var bigFootSprite, cursors;

var StateMain={    
    
   preload:function()
    {
        game.load.image('background','images/forest.png');
        game.load.atlas('bigfoot', 'images/bigfoot.png', 'json/bigfoot.json');   
     },
    
    create:function()
    {
        backgroundImage = game.add.image(-30,0,'background');
        backgroundImage.width = game.width + 30;
        backgroundImage.height = game.height;

        bigFootSprite = game.add.sprite(100, 100, 'bigfoot');
        bigFootSprite.scale.setTo(2, 2);
        bigFootSprite.animations.add('walk', Phaser.Animation.generateFrameNames('bigfoot', 21, 29), 5, true);
        bigFootSprite.animations.play('walk');
    
        cursors = game.input.keyboard.createCursorKeys();

    },
    
    update:function()
    {       
        this.controls();
    },

    controls: function() 
    {
        if (cursors.right.isDown) {

        }

        if (cursors.left.isDown) {
            
        }
    }    
    
}