const setBackground = (game, windowW, windowH) => {
    const bg = game.add.image(0, 0, 'bg')
    bg.setPosition(windowW / 2, windowH)
    bg.setScale(1.5)
}

export { setBackground }