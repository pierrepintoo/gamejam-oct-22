let angleCount = 0

export const rotateGround = (graphics, keyA, keyS, windowW, windowH) => {
    const anchorLineX = windowW / 2
    const anchorLineY = windowH / 2 + 300 // + 300 to put down the platform
    const startLineX = -anchorLineX - 400
    const endLineX = anchorLineX + 400

    if(keyA.isDown) {
        angleCount += 1
    } else if(keyS.isDown) {
        angleCount -= 1
    }
    graphics.angle = angleCount * 0.3
}

export const resetAngle = () => {
    console.log('resetAngle')
    angleCount = 0
}


