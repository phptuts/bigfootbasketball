var bigFootSprite, cursors, direction, hoop, spaceKey, shootingBall;

var StateMain={    
    
   preload:function()
    {
        game.load.image('background','images/forest.png');
        game.load.image('basketball', 'images/basketball.png');
        game.load.atlas('bigfoot', 'images/bigfoot.png', 'json/bigfoot.json');   
        game.load.image('hoop', 'images/hoop.png');
        game.load.image('back-hoop', 'images/backhoop.png');
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



        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
	    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        hoop = game.add.sprite(60, 180, 'hoop');
        hoop.scale.setTo(.2, .2);
        hoop.anchor.setTo(.5, .5);

        backhoop = game.add.sprite(0, 70, 'back-hoop');

        game.physics.enable([bigFootSprite, basketball, hoop, backhoop], Phaser.Physics.ARCADE);
        bigFootSprite.body.collideWorldBounds=true;
        basketball.body.collideWorldBounds = true;
        basketball.outOfBoundsKill = true;
        bigFootSprite.body.gravity.y = 1000;
    
        basketball.body.onCollide = new Phaser.Signal();
        basketball.body.onCollide.add(this.hitBasketBall, this);
        hoop.body.immovable = true;

    },
    
    update:function()
    {     
        game.physics.arcade.collide(basketball, hoop);
        this.controls();
    },

    hitBasketBall: function(basketball, hoop) {
        if (basketball.y < hoop.y) {
            basketball.x = 30;
            basketball.y = 150;
            basketball.body.velocity.x = -10;
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
            basketball.body.velocity.x = -300;
            basketball.body.bounce.setTo(.4);
            basketball.body.gravity.y = 400;
            basketball.body.velocity.y = -500;
        }

        if (!shootingBall) {
            var ballXPixels = (direction === 'right') ? 20 : -60;
            basketball.body.velocity.x = 0;
            basketball.body.bounce.setTo(0);
            basketball.body.gravity.y = 0;
            basketball.body.velocity.y = 0;
            basketball.x = bigFootSprite.x + ballXPixels;
            basketball.y = bigFootSprite.y - 20;
        }
    }    
    
}