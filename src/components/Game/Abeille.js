let abeilleImage

const getAbeille = (game, scale, positionX, positionY) => {
    const body = game.matter.add.circle(200, 0, 400)
    abeilleImage = game.add.image(100, 100, 'abeille')
    let abeille = game.matter.add.gameObject(abeilleImage, body)
    // console.log(abeille.setStatic)
    abeille.setStatic(true)
    abeille.setScale(scale)
    abeille.setPosition(positionX, positionY)
    // abeille.setFriction(0)
    abeille.setDepth(1)

    return abeilleImage
}

export { getAbeille }