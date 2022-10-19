import SoundFade from 'phaser3-rex-plugins/plugins/soundfade.js';

let isPlaying = false

const setAmbianceAudioOnStart = (game, ambiance, ambianceVolume) => {

    if (isPlaying === false) {
        SoundFade.fadeIn(game, ambiance, 30000, ambianceVolume, 0, {loop:true});
        game.sound.unlock();
        isPlaying = true
    }

}

export { setAmbianceAudioOnStart }