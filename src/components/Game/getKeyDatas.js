
import Phaser from "phaser";

let keyA, keyS, keyD, keyW, keySPACE
const getKeyDatas = (scene) => {
    keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keySPACE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    return {keyA, keyS, keyD, keyW, keySPACE}
}

export default getKeyDatas;


