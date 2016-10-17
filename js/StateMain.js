var bigFootSprite;

var StateMain={    
    
   preload:function()
    {
        game.load.image('background','images/forest.png');
        game.load.atlasXML('bigfoot', 'images/Yeti.png', 'xml/yeti.xml');   
     },
    
    create:function()
    {
        backgroundImage = game.add.image(-30,0,'background');
        backgroundImage.width = game.width + 30;
        backgroundImage.height = game.height;

        bigFootSprite = game.add.sprite(100, 100, 'bigfoot');
        bigFootSprite.scale.setTo(2, 2);
        var walk = bigFootSprite.animations.add('walk');
        bigFootSprite.animations.play('walk', 6, true);

    },
    
    update:function()
    {       
        
    }    
    
}