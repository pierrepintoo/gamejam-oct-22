let angleCount = 0

export const rotateGround = (game, graphics, keyA, keyS, windowW, windowH, joystickData) => {
    const anchorLineX = windowW / 2
    const anchorLineY = windowH / 2 + 300 // + 300 to put down the platform
    const startLineX = -anchorLineX - 400
    const endLineX = anchorLineX + 400

    if(keyA.isDown) {
        angleCount += 1
    } else if(keyS.isDown) {
        angleCount -= 1
    }

    angleCount += joystickData.x * 3
    graphics.angle = angleCount

    // var tween = game.tweens.add({
    //     targets: graphics,
    //     x: angleCount,
    //     ease: 'Power1',
    //     duration: 3000,
    //     yoyo: false,
    //     repeat: 1,
    //     onStart: function () { console.log('onStart'); console.log(arguments); },
    //     onComplete: function () { console.log('onComplete'); console.log(arguments); },
    //     onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
    //     onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
    // });
}

export const resetAngle = () => {
    console.log('resetAngle')
    angleCount = 0
}


