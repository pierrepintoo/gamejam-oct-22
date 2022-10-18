let angleCount = 0

export const rotateGround = (graphics, keyA, keyS, windowW, windowH) => {
    const anchorLineX = windowW / 2
    const anchorLineY = windowH / 2 + 300
    const startLineX = -anchorLineX
    const endLineX = anchorLineX

    if(keyA.isDown) {
        console.log('A key pressed')
        angleCount += 1
    } else if(keyS.isDown) {
        console.log('S key pressed')
        angleCount -= 1
    }
    
    graphics.setPosition(anchorLineX, anchorLineY)
    graphics.lineStyle(6, 0x000000, 1);
    graphics.beginPath();

    graphics.moveTo(startLineX, 0)
    graphics.lineTo(endLineX, 0);

    graphics.strokePath();
    graphics.closePath();

    graphics.angle = angleCount
}


