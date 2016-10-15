var StateMain={    
    
   preload:function()
    {
        game.load.image('background','images/forest.png');
        game.load.image('bigfoot', 'images/bigfoot21x32_forward.png');
    },
    
    create:function()
    {
        backgroundImage = game.add.image(-30,0,'background');
        backgroundImage.width = game.width + 30;
        backgroundImage.height = game.height;


    },
    
    update:function()
    {       
        
    }    
    
}