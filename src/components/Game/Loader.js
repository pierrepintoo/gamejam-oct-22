const loadImages = (game) => {
    const galette = game.load.image('galette', 'assets/galettes/galette.png');
    console.log('galette.setGravity', galette.setGravity)
}

export { loadImages }