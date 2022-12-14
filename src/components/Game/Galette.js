let galetteImage

const getGalette = (game, scale) => {
    const body = game.matter.add.circle(650, -1400, 300)
    galetteImage = game.add.image(100, 0, 'galette')
    let galette = game.matter.add.gameObject(galetteImage, body)
    galette.setScale(scale)
    galette.setFriction(0)
    galette.setDepth(1)

    return galette
}

const getGaletteImage = () => {
    return galetteImage
}

export { getGalette, getGaletteImage }