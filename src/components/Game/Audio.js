import SoundFade from 'phaser3-rex-plugins/plugins/soundfade.js';

let isPlaying = false

const setAmbianceAudioOnStart = (game, ambiance, ambianceForet, ambianceVolume) => {

    if (isPlaying === false) {
        SoundFade.fadeIn(game, ambiance, 30000, ambianceVolume, 0, {loop:true});
        // ambiance.play('ambiance')
        // console.log('ambianceForet', ambianceForet)
        SoundFade.fadeIn(game, ambianceForet, 30000, ambianceVolume, 0, {loop:true});
        game.sound.unlock();
        isPlaying = true
    }

}

const playSound = (game, sound, ambianceVolume) => {
    SoundFade.fadeIn(game, sound, 0, ambianceVolume, ambianceVolume);

}
export { setAmbianceAudioOnStart, playSound }