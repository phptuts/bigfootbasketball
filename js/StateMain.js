var bigFootSprite, cursors, direction, hoop, spaceKey, shootingBall, 
score = 0, camera, cameraDirection = 'down', 
scoreText, timerText = 0, seconds = 120, canStartGame = false, inProgress = false;

WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, StateMain.createText, StateMain); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Chewy']
    }

};
var StateMain={ 

   createText: function() {
        var style = { fontSize: "40px", fill: "#9b2400", align: "center"};
        var titleText = game.add.text(game.world.centerX, game.world.centerY-200, "Score", style);
        titleText.anchor.setTo(.5,.5);
        titleText.font = 'Chewy';
        scoreText = game.add.text(game.world.centerX, game.world.centerY-160, "0", style);
        scoreText.anchor.setTo(.5, .5);
        scoreText.font = 'Chewy';
        timerText = game.add.text(20, 300, "Time: " + seconds , style);
        timerText.font = 'Chewy';
        canStartGame = true;

   }, 
    
   preload:function()
    {
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.image('background','images/forest.png');
        game.load.image('basketball', 'images/basketball.png');
        game.load.atlas('bigfoot', 'images/bigfoot.png', 'json/bigfoot.json');   
        game.load.image('hoop', 'images/hoop.png');
        game.load.image('back-hoop', 'images/backhoop.png');
        game.load.image('camera', 'images/camera.png');
     },
    
    create:function()
    {
        backgroundImage = game.add.image(-30,0,'background');
        backgroundImage.width = game.width + 30;
        backgroundImage.height = game.height;

        bigFootSprite = game.add.sprite(300, 500, 'bigfoot');
        bigFootSprite.scale.setTo(2, 2);
        bigFootSprite.anchor.setTo(.5, .5);
        bigFootSprite.animations.add('walk', Phaser.Animation.generateFrameNames('bigfoot', 21, 26), 5, true);
        
        basketball = game.add.sprite(100, 100, 'basketball');
        basketball.scale.setTo(.2, .2);
        
        camera = game.add.sprite(110, 100, 'camera');
        camera.name = 'camera';

        hoop = game.add.sprite(60, 180, 'hoop');
        hoop.name = 'hoop';
        hoop.scale.setTo(.2, .2);
        hoop.anchor.setTo(.5, .5);

        backhoop = game.add.sprite(0, 70, 'back-hoop');
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable([bigFootSprite, basketball, hoop, backhoop, camera], Phaser.Physics.ARCADE);
        
        // Set Physics for sprites
        bigFootSprite.body.collideWorldBounds=true;
        basketball.body.collideWorldBounds = true;
        camera.body.collideWorldBounds = true;
        basketball.outOfBoundsKill = true;
        bigFootSprite.body.gravity.y = 1000;
    
        basketball.body.onCollide = new Phaser.Signal();
        basketball.body.onCollide.add(this.hitBasketBall, this);
        camera.body.immovable = true;
        hoop.body.immovable = true;
        
        // Controls
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
	    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        cursors = game.input.keyboard.createCursorKeys();
        
    },

    loops: function() {

        game.time.events.loop(Phaser.Timer.SECOND , function() {
            seconds -= 1;
            timerText.setText("Time: " + seconds);
            if (seconds < 0) {
                game.state.start("StateMain");
            }
        }, this);
        game.time.events.loop(Phaser.Timer.SECOND * .0002, this.moveCamera, this);
        inProgress = true;
    },
    
    update:function()
    {     
        if (canStartGame && !inProgress) {
            this.loops();
        }
        game.physics.arcade.collide(basketball, hoop);
        game.physics.arcade.collide(basketball, camera);
        this.controls();
    },

    controls: function() 
    {
        if (basketball.y > 420) { 
            shootingBall = false;
        }

        if (cursors.right.isDown) {
            bigFootSprite.scale.setTo(2, 2);
            bigFootSprite.body.velocity.x = 200;
            bigFootSprite.animations.play('walk');
            direction = 'right';
        }

        if (bigFootSprite.x < 250) {
            bigFootSprite.body.velocity.x = 0;
            bigFootSprite.animations.stop();
            bigFootSprite.x = 250;
        }

        if (cursors.left.isDown && bigFootSprite.x > 250) {
            bigFootSprite.scale.setTo(-2, 2);
            bigFootSprite.body.velocity.x = -200;
            bigFootSprite.animations.play('walk');
            direction = 'left';
        }

        if (cursors.down.isDown) {
            bigFootSprite.body.velocity.x = 0;
            bigFootSprite.animations.stop();
        }
        
        if (cursors.up.isDown && bigFootSprite.y > 300) {
            bigFootSprite.body.velocity.y = -500;
            bigFootSprite.animations.stop();
        }

        if (spaceKey.downDuration(4000) && !shootingBall) {
            shootingBall = true;
            basketball.body.velocity.x = ((direction === 'right') ?  1 : -1 ) * 450;
            basketball.body.bounce.setTo(.4);
            basketball.body.gravity.y = 400;
            basketball.body.velocity.y = -650;
        }

        if (!shootingBall) {
            this.ballBackToBigFoot();
        }
    },

    hitBasketBall: function(basketball, object) {
        if (object.name == 'hoop') {
            if (basketball.y + basketball.height + 30 < object.y && basketball.x < 40 ) {
                basketball.x = 30;
                basketball.y = 150;
                basketball.body.velocity.x = -10;
                score += bigFootSprite.x > 500 ? 3 : 2;
                scoreText.setText(score);
            }
            shootingBall = false;
            game.time.events.add(Phaser.Timer.SECOND * .3, this.ballBackToBigFoot, this).autoDestroy = true;
        }
    }, 

    ballBackToBigFoot: function() {
            var ballXPixels = (direction === 'right') ? 20 : -60;
            basketball.body.velocity.x = 0;
            basketball.body.bounce.setTo(0);
            basketball.body.gravity.y = 0;
            basketball.body.velocity.y = 0;
            basketball.x = bigFootSprite.x + ballXPixels;
            basketball.y = bigFootSprite.y - 20;
            shootingBall = false;
    },    


    moveCamera: function() {
        if (camera.y > 150) {
            cameraDirection = 'up';
        }

        if (camera.y < 20) {
            cameraDirection = 'down';
        }

        camera.y +=  (cameraDirection === 'up') ? -2 : 2;

    },

    
}