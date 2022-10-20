const setGameOver = (game, windowW, windowH) => {
    const bg = game.add.image(0, 0, 'bgGo')
    bg.setPosition(windowW, windowH)
    bg.setScale(100)
    bg.setDepth(10)
    
    game.add.text(windowW/2, windowH/2, 'Game Over', { fontFamily: 'blocus' });

    console.log('game over')


        //add a sprite to be used as a play again button
        // this.playAgain=game.add.sprite(game.width/2,game.height/2,"playAgain");
        // //center the button image
        // this.playAgain.anchor.set(0.5,0.5);
        // //enable for input
        // this.playAgain.inputEnabled=true;
        // //add an event listener
        // this.playAgain.events.onInputDown.add(this.restartGame,this);
}

export { setGameOver }