let fog1, fog2

const setBackground = (game, windowW, windowH) => {
    const bg = game.add.image(0, 0, 'bg')
    bg.setPosition(windowW / 2, windowH)
    bg.setScale(1.25)
    bg.setDepth(2)

    const moutain = game.add.image(0, 0, 'moutain')
    moutain.setPosition(windowW / 2, windowH)
    moutain.setScale(1.25)
    moutain.alpha = 0.1
    moutain.setDepth(0)
}

const setFog1 = (game,) => {
    fog1 = game.add.image(100, 100, 'fog_1')
    fog1.setPosition(0, 0)
    fog1.alpha = 1
    fog1.setScale(3, 2)
    fog1.setDepth(6)
}

const setFog2 = (game) => {
    fog2 = game.add.image(100, 100, 'fog_2')
    fog2.setPosition(0, -1000)
    fog2.setScale(3)
    fog2.setDepth(6)
}

const moveFog1 = (time) => {
    fog1.x = 0 + Math.sin(time * 0.0003) * 2000
}

const moveFog2 = (time) => {
    fog2.x = 0 + Math.sin(time * 0.00003) * 2000
}
// const setFog = (game) => {
//     setFog1(game)
// }
export { setBackground, setFog1, setFog2, moveFog1, moveFog2 }