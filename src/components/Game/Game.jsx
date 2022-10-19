import React from "react";
import Phaser from "phaser";
import getKeyDatas from "./getKeyDatas";
import { rotateGround, resetAngle } from "./Ground";
import { loadImages } from "./Loader";
import { getGalette } from "./Galette";
import { setBackground } from "./Background";
import Axis from "axis-api";

const Game = ({mousePos}) => {
  const phaserGameRef = React.useRef(null);
  const windowH = window.innerHeight
  const windowW = window.innerWidth
  let line, ground, galette, platform1, platform2, platform3, platform4
  let keyA, keyS, keyD, keySPACE
  let isPlatform1Resetted = false, isPlatform2Resetted = false, isPlatform3Resetted = false, isPlatform4Resetted = false
  let activePlatform = ""
  const positionPlatform1 = {x: 500, y: 100}
  const positionPlatform2 = {x: 800, y: 500}
  const positionPlatform3 = {x: 400, y: 900}
  const positionPlatform4 = {x: 700, y: 1400}

  // For Joystick
  const gamepadEmulator = Axis.createGamepadEmulator(0)
  Axis.joystick1.setGamepadEmulatorJoystick(gamepadEmulator, 0)
  const joystickMoveHandler = (e) => {
    // Get the joystick id in the event payload object
    if (e.id === 1) {
        console.log(e.position.x, e.position.y)
        // if (e.position.x === 1) console.log('1')
    } 
  }
  Axis.addEventListener("joystick:move", joystickMoveHandler);

  let jumpingCount = 0

  const usePhaserGame = (config) => {
      React.useEffect(() => {
        if (phaserGameRef.current) {
          return;
        }
        phaserGameRef.current = new Phaser.Game(config);
        return () => {
          phaserGameRef.current.destroy(true);
          phaserGameRef.current = null;
        };
      }, [] /* only run once; config ref elided on purpose */);
      return phaserGameRef.current;
    }

    const config = {
        type: Phaser.WEBGL,
        scale: {
            mode: Phaser.Scale.FIT,
            parent: 'phaser-example',
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: window.innerWidth,
            height: window.innerHeight
        },
        // backgroundColor: "#ffffff00",
        transparent: true,
        physics: {
          default: 'matter',
          matter: {
              debug: false,
              gravity: {
                  y: 1
              },
          }
        },
        plugins: {
        },
        scene: {
            preload: function() {
              loadImages(this)
            },
            create: function() {
              const inputs = getKeyDatas(this)
              keyA = inputs.keyA
              keyS = inputs.keyS
              keyD = inputs.keyD


              galette = getGalette(this, galette)

              galetteCollideListener()

              jumpingGaletteListiner(this, galette)

              setBackground(this, windowW, windowH)
              
              setPlatformOnScene(this)

              setCamerasParams(this, galette)

            },
            update: function(time, delta) {
              gamepadEmulator.update();
              switch(activePlatform) {
                case 'platform_1':
                  if (isPlatform1Resetted === false) {
                    resetAngle()
                    isPlatform1Resetted = true
                  }
                  rotateGround(platform1, keyA, keyS, positionPlatform1.x, positionPlatform1.y)
                break
                case 'platform_2':
                  if (isPlatform2Resetted === false) {
                    resetAngle()
                    isPlatform2Resetted = true
                  }
                  rotateGround(platform2, keyA, keyS, positionPlatform2.x, positionPlatform2.y)
                break
                case 'platform_3':
                  if (isPlatform3Resetted === false) {
                    resetAngle()
                    isPlatform3Resetted = true
                  }
                  rotateGround(platform3, keyA, keyS, positionPlatform3.x, positionPlatform3.y)
                break
                case 'platform_4':
                  if (isPlatform4Resetted === false) {
                    resetAngle()
                    isPlatform4Resetted = true
                  }
                  rotateGround(platform4, keyA, keyS, positionPlatform4.x, positionPlatform4.y)
                break
                default:
                  break
              }
            },
            render: function() {
              this.game.debug.geom(line)
            }
        },
    };

    const setPlatformOnScene = (game) =>  {
      platform1 = createPlatform(game, positionPlatform1.x, positionPlatform1.y, 'platform_1')
      platform2 = createPlatform(game, positionPlatform2.x, positionPlatform2.y, 'platform_2')
      platform3 = createPlatform(game, positionPlatform3.x, positionPlatform3.y, 'platform_3')
      platform4 = createPlatform(game, positionPlatform4.x, positionPlatform4.y, 'platform_4', true)
    }

    const createPlatform = (game, positionX, positionY, name, isLast) => {
      let platformToReturn
      platformToReturn = game.matter.add.image(positionX, positionY, name, null, { isStatic: true })
      if (isLast) {
        // Last platform scale
        platformToReturn.setScale(1.5, 0.4)

      } else {
        // All platforms scale
        platformToReturn.setScale(0.4)
      }

      return platformToReturn
    }

    const setCamerasParams = (game, objectToFollow) => {
      // game.cameras.main.startFollow(objectToFollow) 
      // game.cameras.main.zoom = 2
      game.cameras.main.zoom = 0.5
    }

    const jumpingGaletteListiner = (game, galette) => {
      game.input.keyboard.on('keydown-SPACE', () => {
          if (jumpingCount < 2) {
            jumpingCount += 1
            galette.setVelocityY(-7.5)
          }
        });
    }

    const galetteCollideListener = () => {
      galette.setOnCollide((e) => {
        const platformName = e.bodyB.gameObject.texture.key
        if (platformName === "platform_1") {
          jumpingCount = 0
          activePlatform = 'platform_1'
        } else if (platformName === "platform_2") {
          jumpingCount = 0
          activePlatform = 'platform_2'
        } else if (platformName === "platform_3") {
          jumpingCount = 0
          activePlatform = 'platform_3'
        } else if (platformName === "platform_4") {
          activePlatform = 'platform_4'
          jumpingCount = 0
        }
      })
    }

    usePhaserGame(config)

    return (
        <div>
            
        </div>
    )
}

export default Game;