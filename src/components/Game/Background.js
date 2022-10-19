const setBackground = (game, windowW, windowH) => {
    const bg = game.add.image(0, 0, 'bg')
    bg.setPosition(windowW / 2, windowH)
    bg.setScale(0.7)
}

export { setBackground }