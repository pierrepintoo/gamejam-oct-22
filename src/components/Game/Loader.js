const loadImages = (game) => {
    const galette = game.load.image('galette', 'assets/galettes/galette.png');
    const platform = game.load.image('platform_1', 'assets/platforms/plateforme_1.png')
    const platform2 = game.load.image('platform_2', 'assets/platforms/plateforme_1.png')
    const platform3 = game.load.image('platform_3', 'assets/platforms/plateforme_1.png')
    const platform4 = game.load.image('platform_4', 'assets/platforms/plateforme_1.png')
    const bg = game.load.image('bg', 'assets/bg/montagne.png')
}

const loadSounds = (game) => {
    const ambiance = game.load.audio('ambiance', ['assets/audio/ambiance/ambiance.mp3']);

}

export { loadImages, loadSounds }