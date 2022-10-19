import React from "react";
import Phaser from "phaser";
import getKeyDatas from "./getKeyDatas";
import { rotateGround, resetAngle, switchRotationPlatform } from "./Ground";
import { loadImages, loadSounds } from "./Loader";
import { getGalette, getGaletteImage } from "./Galette";
import { setBackground } from "./Background";
import Axis from "axis-api";
import SoundFadePlugin from 'phaser3-rex-plugins/plugins/soundfade-plugin.js';
import { setAmbianceAudioOnStart } from "./Audio";

const Game = ({mousePos}) => {
  const phaserGameRef = React.useRef(null);
  const windowH = window.innerHeight
  const windowW = window.innerWidth
  let line, ground, galette, galetteImage, platform1, platform2, platform3, platform4
  let isPlatform1Actived = false, isPlatform2Actived = false, isPlatform3Actived = false, isPlatform4Actived = false
  let keyA, keyS, keyD, keySPACE
  let activePlatform = ""
  let scaleXY = 0.09
  let scaleX = 0.09
  let scaleY = 0.09
  const positionPlatform1 = {x: 500, y: 100}
  const positionPlatform2 = {x: 800, y: 500}
  const positionPlatform3 = {x: 400, y: 900}
  const positionPlatform4 = {x: 700, y: 1400}
  const joystick = {x: 0, y: 0}
  let ambiance
  const ambianceVolume = 0.5
  // Map key axis
  Axis.registerKeys(" ", "a", 1); // keyboard key "q" to button "a" from group 1

  // For Joystick
  const gamepadEmulator = Axis.createGamepadEmulator(0)
  Axis.joystick1.setGamepadEmulatorJoystick(gamepadEmulator, 0)
  const joystickMoveHandler = (e) => {
    // Get the joystick id in the event payload object
    if (e.id === 1) {
        joystick.x = e.position.x
        joystick.y = e.position.y
        // if (e.position.x === 1) console.log('1')
    }
  }

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
          global: [{
            key: 'rexSoundFade',
            plugin: SoundFadePlugin,
            start: true
          }]
        },
        scene: {
            preload: function() {
              loadImages(this)
              loadSounds(this)
            },
            create: function() {
              const inputs = getKeyDatas(this)
              keyA = inputs.keyA
              keyS = inputs.keyS
              keyD = inputs.keyD


              galette = getGalette(this, scaleXY)

              galetteCollideListener()

              setBackground(this, windowW, windowH)
              
              setPlatformOnScene(this)

              setCamerasParams(this, galette)

              Axis.addEventListener("joystick:move", joystickMoveHandler);
              Axis.addEventListener("keydown", (e) => {
                if (e.key === "a") {
                  jumpGalette()
                }
              })
              ambiance = this.sound.add('ambiance', {loop: true, volume: ambianceVolume})
              galetteImage = getGaletteImage()
            },
            update: function(time, delta) {
              // Galette that rotate with velocity (because friction = 0)
              setRotationWithVelocity()
              // console.log(galetteImage.scaleX)
              // galetteImage.scaleX = Math.abs(galette.body.velocity.x) * 10
              // galetteImage.scaleX = 1
              // console.log(galette.scale)
              if (galette.body.velocity) {
                galetteImage.scaleX = scaleX * (Math.abs(galette.body.velocity.x * 0.1) + 1 )
                galetteImage.scaleY = scaleY * (Math.abs(galette.body.velocity.y * 0.1) + 1 )
              }   
              
              // Audio
              setAmbianceAudioOnStart(this, ambiance, ambianceVolume)

              // Set active platforms that can rotate
              switchRotationPlatform(
                this,
                activePlatform,
                platform1,
                platform2,
                platform3,
                platform4,
                keyA,
                keyS,
                positionPlatform1,
                positionPlatform2,
                positionPlatform3,
                positionPlatform4,
                joystick
              )

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

    const setRotationWithVelocity = () => {
      if (galette.body.velocity) {
        galette.rotation += galette.body.velocity.x * 0.03
      }
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
      game.cameras.main.startFollow(objectToFollow) 
      game.cameras.main.zoom = 2
      // game.cameras.main.zoom = 0.5
    }

    const jumpGalette = () => {
      console.log(jumpingCount)
      if (jumpingCount < 2) {
        jumpingCount += 1
        galette.setVelocityY(-7.5)
      }
    }

    const galetteCollideListener = () => {
      galette.setOnCollide((e) => {
        const platformName = e.bodyB.gameObject.texture.key
        if (platformName === "platform_1" && isPlatform1Actived === false) {
          isPlatform1Actived = true
          jumpingCount = 0
          activePlatform = 'platform_1'
        } else if (platformName === "platform_2" && isPlatform2Actived === false) {
          isPlatform2Actived = true
          jumpingCount = 0
          activePlatform = 'platform_2'
        } else if (platformName === "platform_3" && isPlatform3Actived === false) {
          isPlatform3Actived = true
          jumpingCount = 0
          activePlatform = 'platform_3'
        } else if (platformName === "platform_4" && isPlatform4Actived === false) {
          isPlatform4Actived = true
          activePlatform = 'platform_4'
          jumpingCount = 0
        } else if (platformName === "platform_1") {
          jumpingCount = 0
        } else if (platformName === "platform_2") {
          jumpingCount = 0
        } else if (platformName === "platform_3") {
          jumpingCount = 0
        } else if (platformName === "platform_4") {
          jumpingCount = 0
        }
      })
    }

    usePhaserGame(config)

  function updateForArcadeBorne() {
    gamepadEmulator.update();
    requestAnimationFrame(updateForArcadeBorne);
  }
  updateForArcadeBorne();

    return (
        <div>
            
        </div>
    )
}

export default Game;