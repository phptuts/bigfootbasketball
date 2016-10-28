var game;


window.onload = function()
{
    game=new Phaser.Game(640,480,Phaser.AUTO,"ph_game");
	
    game.state.add("StateMain",StateMain);
    game.state.add("StateTitle",StateTitle);
    game.state.start("StateTitle");
}