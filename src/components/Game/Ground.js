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


let isPlatform1Resetted = false, isPlatform2Resetted = false, isPlatform3Resetted = false, isPlatform4Resetted = false

export const switchRotationPlatform = (
    game,
    activePlatform,
    platform1,
    platform2,
    platform3,
    platform4,
    keyA,
    keyS,
    positionPlatform1,
    positionPlatform2,
    positionPlatform3,
    positionPlatform4,
    joystick
) => {
    switch(activePlatform) {
        case 'platform_1':
          if (isPlatform1Resetted === false) {
            resetAngle()
            isPlatform1Resetted = true
          }
          rotateGround(game, platform1, keyA, keyS, positionPlatform1.x, positionPlatform1.y, joystick)
        break
        case 'platform_2':
          if (isPlatform2Resetted === false) {
            resetAngle()
            isPlatform2Resetted = true
          }
          rotateGround(game, platform2, keyA, keyS, positionPlatform2.x, positionPlatform2.y, joystick)
        break
        case 'platform_3':
          if (isPlatform3Resetted === false) {
            resetAngle()
            isPlatform3Resetted = true
          }
          rotateGround(game, platform3, keyA, keyS, positionPlatform3.x, positionPlatform3.y, joystick)
        break
        case 'platform_4':
          if (isPlatform4Resetted === false) {
            resetAngle()
            isPlatform4Resetted = true
          }
          rotateGround(game, platform4, keyA, keyS, positionPlatform4.x, positionPlatform4.y, joystick)
        break
        default:
          break
      }
}

