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

var enterKey;
var StateTitle={

   createText: function() {
        var style = { fontSize: "80px", fill: "#9b2400", align: "center"};
        var titleText = game.add.text(game.world.centerX, game.world.centerY-130, "BigFoot BasketBall", style);
        titleText.anchor.setTo(.5,.5);
        titleText.font = 'Chewy';
        var startText = game.add.text(game.world.centerX, game.world.centerY-30, "Start", style);
        startText.anchor.setTo(.5,.5);
        startText.font = 'Chewy';
        startText.inputEnabled = true;
        startText.events.onInputDown.add(this.startGame, this);
        if (typeof score !== 'undefined' && score > -1) {
            var lastScore = game.add.text(game.world.centerX, game.world.centerY+60, "Latest Score: " + score, style);
            lastScore.anchor.setTo(.5,.5);
            lastScore.fontSize = '60px';
            lastScore.font = 'Chewy';
        }
   }, 

   startGame: function () {
       score = 0;
       game.state.start('StateMain');
   },

    preload:function()
    {
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.image('background','images/forest.png');
        game.load.atlas('bigfoot', 'images/bigfoot.png', 'json/bigfoot.json');   
        enterKey =game.input.keyboard.addKey(Phaser.Keyboard.ENTER)

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
        if (enterKey.isDown) {
            this.startGame();
        }
    }
};