const loadImages = (game) => {
    const galette = game.load.image('galette', 'assets/galettes/Galette_v2.png');
    const platform = game.load.image('platform_1', 'assets/platforms/plateformev2.png')
    const platform2 = game.load.image('platform_2', 'assets/platforms/plateformev2.png')
    const platform3 = game.load.image('platform_3', 'assets/platforms/plateformev2.png')
    const platform4 = game.load.image('platform_4', 'assets/platforms/plateformev2.png')
    const platform5 = game.load.image('platform_5', 'assets/platforms/plateformev2.png')
    const platform6 = game.load.image('platform_6', 'assets/platforms/plateformev2.png')
    const platform7 = game.load.image('platform_7', 'assets/platforms/plateformev2.png')
    const platform8 = game.load.image('platform_8', 'assets/platforms/plateformev2.png')
    const platform9 = game.load.image('platform_9', 'assets/platforms/plateformev2.png')
    const platform10 = game.load.image('platform_10', 'assets/platforms/plateformev2.png')
    game.load.image('platform_11', 'assets/platforms/plateformev2.png')
    game.load.image('platform_12', 'assets/platforms/plateformev2.png')
    game.load.image('platform_13', 'assets/platforms/plateformev2.png')
    game.load.image('platform_14', 'assets/platforms/plateformev2.png')
    game.load.image('platform_15', 'assets/platforms/plateformev2.png')
    game.load.image('platform_16', 'assets/platforms/plateformev2.png')
    game.load.image('platform_17', 'assets/platforms/plateformev2.png')
    const abeille = game.load.image('abeille', 'assets/ennemis/abeille_fachee.png')
    const bg = game.load.image('bg', 'assets/bg/decors_v2_sf.png')
    const moutain = game.load.image('moutain', 'assets/bg/montagne.png')
    const bgGo = game.load.image('bg', 'assets/bg/background_gameover.jpg')
    const fog1 = game.load.image('fog_1', 'assets/bg/fog.png')
    const fog2 = game.load.image('fog_2', 'assets/bg/fog.png')
}

const loadSounds = (game) => {
    const ambiance = game.load.audio('ambiance', ['assets/audio/ambiance/ambiance.mp3']);
    const choc = game.load.audio('choc', ['assets/audio/choc.mp3']);
    const ambianceForet = game.load.audio('ambianceForet', ['assets/audio/ambiance/ambiance_foret.mp3']);
    const sautGalette = game.load.audio('sautGalette', ['assets/audio/saut.mp3']);
    const chute = game.load.audio('chute', ['assets/audio/chute.mp3']);

}

export { loadImages, loadSounds }