WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, StateTitle.createText, StateTitle); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Chewy']
    }

};


var StateTitle={

   createText: function() {


   }, 

    preload:function()
    {
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.image('background','images/forest.png');
        game.load.atlas('bigfoot', 'images/bigfoot.png', 'json/bigfoot.json');   

    },

    create: function() {
        backgroundImage = game.add.image(-30,0,'background');
        backgroundImage.width = game.width + 30;
        backgroundImage.height = game.height;

        bigFootSprite = game.add.sprite(300, 400, 'bigfoot');
        bigFootSprite.scale.setTo(2, 2);
        bigFootSprite.anchor.setTo(.5, .5);

    },

    update: function() {

    }
};