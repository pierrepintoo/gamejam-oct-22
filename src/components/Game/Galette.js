const getGalette = (game) => {
    const body = game.matter.add.circle(200, 0, 200)
    const galetteImage = game.add.image(100, 0, 'galette')
    let galette = game.matter.add.gameObject(galetteImage, body)
    galette.setScale(0.09)
    galette.setDepth(1)

    return galette
}

export { getGalette }