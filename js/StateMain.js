var bigFootSprite, cursors, direction, hoop, spaceKey, shootingBall, score = 0, camera;

var StateMain={    
    
   preload:function()
    {
        game.load.image('background','images/forest.png');
        game.load.image('basketball', 'images/basketball.png');
        game.load.atlas('bigfoot', 'images/bigfoot.png', 'json/bigfoot.json');   
        game.load.image('hoop', 'images/hoop.png');
        game.load.image('back-hoop', 'images/backhoop.png');
        game.load.image('camera', 'images/camera.png');
     },
    
    create:function()
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        backgroundImage = game.add.image(-30,0,'background');
        
        backgroundImage.width = game.width + 30;
        backgroundImage.height = game.height;


        bigFootSprite = game.add.sprite(300, 500, 'bigfoot');
        bigFootSprite.scale.setTo(2, 2);
        bigFootSprite.anchor.setTo(.5, .5);
        bigFootSprite.animations.add('walk', Phaser.Animation.generateFrameNames('bigfoot', 21, 26), 5, true);

        basketball = game.add.sprite(100, 100, 'basketball');
        basketball.scale.setTo(.2, .2);
        cursors = game.input.keyboard.createCursorKeys();
        camera = game.add.sprite(100, 100, 'camera');
        camera.name = 'camera';

        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
	    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        hoop = game.add.sprite(60, 180, 'hoop');
        hoop.name = 'hoop';
        hoop.scale.setTo(.2, .2);
        hoop.anchor.setTo(.5, .5);

        backhoop = game.add.sprite(0, 70, 'back-hoop');

        game.physics.enable([bigFootSprite, basketball, hoop, backhoop, camera], Phaser.Physics.ARCADE);
        bigFootSprite.body.collideWorldBounds=true;
        basketball.body.collideWorldBounds = true;
        camera.body.collideWorldBounds = true;
        basketball.outOfBoundsKill = true;
        bigFootSprite.body.gravity.y = 1000;
    
        basketball.body.onCollide = new Phaser.Signal();
        basketball.body.onCollide.add(this.hitBasketBall, this);
        camera.body.immovable = true;
        hoop.body.immovable = true;

    },
    
    update:function()
    {     
        game.physics.arcade.collide(basketball, hoop);
        game.physics.arcade.collide(basketball, camera);
        this.controls();
    },

    hitBasketBall: function(basketball, object) {
        if (object.name == 'hoop') {
            if (basketball.y + basketball.height + 30 < object.y && basketball.x < 40 ) {
                basketball.x = 30;
                basketball.y = 150;
                basketball.body.velocity.x = -10;
                score += 1;
            }
            console.log("SCORE = " + score);
            shootingBall = false;
            game.time.events.add(Phaser.Timer.SECOND * .3, this.ballBackToBigFoot, this).autoDestroy = true;

        }
        

        
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

        if (cursors.left.isDown) {
            bigFootSprite.scale.setTo(-2, 2);
            bigFootSprite.body.velocity.x = -200;
            bigFootSprite.animations.play('walk');
            direction = 'left';
        }

        if (cursors.down.isDown) {
            bigFootSprite.body.velocity.x = 0;
            bigFootSprite.animations.stop();
        }

        if (cursors.up.isDown) {
            bigFootSprite.body.velocity.y = -500;
            bigFootSprite.animations.stop();
        }

        if (spaceKey.downDuration(4000) && !shootingBall) {
            shootingBall = true;
            basketball.body.velocity.x = ((direction === 'right') ?  1 : -1 ) * 300;
            basketball.body.bounce.setTo(.4);
            basketball.body.gravity.y = 400;
            basketball.body.velocity.y = -500;
        }

        if (!shootingBall) {
            this.ballBackToBigFoot();
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
    }    
    
}