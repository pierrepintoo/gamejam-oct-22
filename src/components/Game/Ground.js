let angleCount = 0

export const rotateGround = (game, graphics, keyA, keyS, windowW, windowH, joystickData, canMoveCamera) => {
    const anchorLineX = windowW / 2
    const anchorLineY = windowH / 2 + 300 // + 300 to put down the platform
    const startLineX = -anchorLineX - 400
    const endLineX = anchorLineX + 400

    if(keyA.isDown && canMoveCamera) {
      graphics.rotation = graphics.rotation + 0.03
      graphics.rotation = graphics.rotation + joystickData.x * 0.1
  } else if(keyS.isDown && canMoveCamera) {
      graphics.rotation = graphics.rotation - 0.03
      graphics.rotation = graphics.rotation - joystickData.x * 0.1
    }
}

export const resetAngle = () => {
    angleCount = 0
}


let isPlatform1Resetted = false, isPlatform2Resetted = false, isPlatform3Resetted = false, isPlatform4Resetted = false
let isPlatform5Resetted = false, isPlatform6Resetted = false, isPlatform7Resetted = false, isPlatform8Resetted = false
let isPlatform9Resetted = false, isPlatform10Resetted = false
let isPlatform11Resetted = false, isPlatform12Resetted = false, isPlatform13Resetted = false, isPlatform14Resetted = false
let isPlatform15Resetted = false, isPlatform16Resetted = false, isPlatform17Resetted = false

const activationOfPlatform = (game, platform, keyA, keyS, positionPlatform, joystick, isPlatformResetted) => {
    if (isPlatformResetted === false) {
        resetAngle()
        isPlatformResetted = true
    }
    rotateGround(game, platform, keyA, keyS, positionPlatform.x, positionPlatform.y, joystick)
}

export const switchRotationPlatform = (
  game,
  activePlatform,
  platform1,
  platform2,
  platform3,
  platform4,
  platform5,
  platform6,
  platform7,
  platform8,
  platform9,
  platform10,
  platform11,
  platform12,
  platform13,
  platform14,
  platform15,
  platform16,
  platform17,
  keyA,
  keyS,
  positionPlatform1,
  positionPlatform2,
  positionPlatform3,
  positionPlatform4,
  positionPlatform5,
  positionPlatform6,
  positionPlatform7,
  positionPlatform8,
  positionPlatform9,
  positionPlatform10,
  positionPlatform11,
  positionPlatform12,
  positionPlatform13,
  positionPlatform14,
  positionPlatform15,
  positionPlatform16,
  positionPlatform17,
  joystick,
  canMoveCamera
) => {
    switch(activePlatform) {
        case 'platform_1':
          // if (isPlatform1Resetted === false) {
          //   resetAngle()
          //   isPlatform1Resetted = true
          // }
          rotateGround(game, platform1, keyA, keyS, positionPlatform1.x, positionPlatform1.y, joystick, canMoveCamera)
        break
        case 'platform_2':
          // if (isPlatform2Resetted === false) {
          //   resetAngle()
          //   isPlatform2Resetted = true
          // }
          rotateGround(game, platform2, keyA, keyS, positionPlatform2.x, positionPlatform2.y, joystick, canMoveCamera)
        break
        case 'platform_3':
          // if (isPlatform3Resetted === false) {
          //   resetAngle()
          //   isPlatform3Resetted = true
          // }
          rotateGround(game, platform3, keyA, keyS, positionPlatform3.x, positionPlatform3.y, joystick, canMoveCamera)
        break
        case 'platform_4':
          // if (isPlatform4Resetted === false) {
          //   resetAngle()
          //   isPlatform4Resetted = true
          // }
          rotateGround(game, platform4, keyA, keyS, positionPlatform4.x, positionPlatform4.y, joystick, canMoveCamera)
        break
        case 'platform_5':
            // if (isPlatform5Resetted === false) {
            //     resetAngle()
            //     isPlatform5Resetted = true
            // }
          rotateGround(game, platform5, keyA, keyS, positionPlatform5.x, positionPlatform5.y, joystick, canMoveCamera)
        break
        case 'platform_6':
            // if (isPlatform6Resetted === false) {
            //     resetAngle()
            //     isPlatform6Resetted = true
            // }
          rotateGround(game, platform6, keyA, keyS, positionPlatform6.x, positionPlatform6.y, joystick, canMoveCamera)
        break
        case 'platform_7':
            // if (isPlatform7Resetted === false) {
            //   console.log('plateforme 7 actived')
            //     resetAngle()
            //     isPlatform7Resetted = true
            // }
          rotateGround(game, platform7, keyA, keyS, positionPlatform7.x, positionPlatform7.y, joystick, canMoveCamera)
        break
        case 'platform_8':
            // if (isPlatform8Resetted === false) {
            //     resetAngle()
            //     isPlatform8Resetted = true
            // }
          rotateGround(game, platform8, keyA, keyS, positionPlatform8.x, positionPlatform8.y, joystick, canMoveCamera)
        break
        case 'platform_9':
            // if (isPlatform9Resetted === false) {
            //     resetAngle()
            //     isPlatform9Resetted = true
            // }
          rotateGround(game, platform9, keyA, keyS, positionPlatform9.x, positionPlatform9.y, joystick, canMoveCamera)
        break
        case 'platform_10':
            // if (isPlatform10Resetted === false) {
            //     resetAngle()
            //     isPlatform10Resetted = true
            // }
          rotateGround(game, platform10, keyA, keyS, positionPlatform10.x, positionPlatform10.y, joystick, canMoveCamera)
        break
        case 'platform_11':
          // if (isPlatform11Resetted === false) {
          //     resetAngle()
          //     isPlatform11Resetted = true
          // }
          rotateGround(game, platform11, keyA, keyS, positionPlatform11.x, positionPlatform11.y, joystick, canMoveCamera)
        break
        case 'platform_12':
          // if (isPlatform12Resetted === false) {
          //     resetAngle()
          //     isPlatform12Resetted = true
          // }
          rotateGround(game, platform12, keyA, keyS, positionPlatform12.x, positionPlatform12.y, joystick, canMoveCamera)
        break
        case 'platform_13':
          // if (isPlatform13Resetted === false) {
          //     resetAngle()
          //     isPlatform13Resetted = true
          // }
          rotateGround(game, platform13, keyA, keyS, positionPlatform13.x, positionPlatform13.y, joystick, canMoveCamera)
        break
        case 'platform_14':
          // if (isPlatform14Resetted === false) {
          //     resetAngle()
          //     isPlatform14Resetted = true
          // }
          rotateGround(game, platform14, keyA, keyS, positionPlatform14.x, positionPlatform14.y, joystick, canMoveCamera)
        break
        case 'platform_15':
          // if (isPlatform15Resetted === false) {
          //     resetAngle()
          //     isPlatform15Resetted = true
          // }
          rotateGround(game, platform15, keyA, keyS, positionPlatform15.x, positionPlatform15.y, joystick, canMoveCamera)
        break
        case 'platform_16':
          // if (isPlatform16Resetted === false) {
          //     resetAngle()
          //     isPlatform16Resetted = true
          // }
          rotateGround(game, platform16, keyA, keyS, positionPlatform16.x, positionPlatform16.y, joystick, canMoveCamera)
        break
        case 'platform_17':
          // if (isPlatform17Resetted === false) {
          //     resetAngle()
          //     isPlatform17Resetted = true
          // }
          rotateGround(game, platform17, keyA, keyS, positionPlatform17.x, positionPlatform17.y, joystick, canMoveCamera)
        break
        default:
          break
      }
}