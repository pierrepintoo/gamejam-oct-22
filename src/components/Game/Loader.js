const loadImages = (game) => {
    const galette = game.load.image('galette', 'assets/galettes/Galette_v2.png');
    const platform = game.load.image('platform_1', 'assets/platforms/plateforme_1.png')
    const platform2 = game.load.image('platform_2', 'assets/platforms/plateforme_1.png')
    const platform3 = game.load.image('platform_3', 'assets/platforms/plateforme_1.png')
    const platform4 = game.load.image('platform_4', 'assets/platforms/plateforme_1.png')
    const platform5 = game.load.image('platform_5', 'assets/platforms/plateforme_1.png')
    const platform6 = game.load.image('platform_6', 'assets/platforms/plateforme_1.png')
    const platform7 = game.load.image('platform_7', 'assets/platforms/plateforme_1.png')
    const platform8 = game.load.image('platform_8', 'assets/platforms/plateforme_1.png')
    const platform9 = game.load.image('platform_9', 'assets/platforms/plateforme_1.png')
    const platform10 = game.load.image('platform_10', 'assets/platforms/plateforme_1.png')
    const abeille = game.load.image('abeille', 'assets/ennemis/abeille_fachee.png')
    const bg = game.load.image('bg', 'assets/bg/montagne.png')
    const bgGo = game.load.image('bg', 'assets/bg/background_gameover.jpg')
}

const loadSounds = (game) => {
    const ambiance = game.load.audio('ambiance', ['assets/audio/ambiance/ambiance.mp3']);

}

export { loadImages, loadSounds }