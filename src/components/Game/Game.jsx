import React, { useState } from "react";
import Phaser from "phaser";
import getKeyDatas from "./getKeyDatas";
import { rotateGround, resetAngle, switchRotationPlatform } from "./Ground";
import { loadImages, loadSounds } from "./Loader";
import { getGalette, getGaletteImage } from "./Galette";
import { setBackground } from "./Background";
import Axis from "axis-api";
import SoundFadePlugin from 'phaser3-rex-plugins/plugins/soundfade-plugin.js';
import { setAmbianceAudioOnStart } from "./Audio";
import { getAbeille } from "./Abeille";
import { createNoise2D } from 'simplex-noise';
import alea from 'alea';
import { getRandomArbitrary  } from "../Utils";
import Time from "../Time/Time";

const Game = ({mousePos}) => {

  const score = {
    time: 0,
    timeWithString: ""
  }

  const phaserGameRef = React.useRef(null);
  const windowH = window.innerHeight
  const windowW = window.innerWidth
  let line, ground, galette, galetteImage, platform1, platform2, platform3, platform4, platform5, platform6, platform7, platform8, platform9, platform10
  let isPlatform1Actived = false, isPlatform2Actived = false, isPlatform3Actived = false, isPlatform4Actived = false
  let isPlatform5Actived = false, isPlatform6Actived = false, isPlatform7Actived = false, isPlatform8Actived = false
  let isPlatform9Actived = false, isPlatform10Actived = false
  let keyA, keyS, keyD, keySPACE
  let abeilles = []
  let activePlatform = ""
  let timeText
  let scaleXY = 0.15
  let scaleX = 0.15
  let scaleY = 0.15
  const positionPlatform1 = {x: -100, y: -900}
  const positionPlatform2 = {x: 800, y: -800}
  const positionPlatform3 = {x: 1400, y: -500}
  const positionPlatform4 = {x: 900, y: -100}
  const positionPlatform5 = {x: 100, y: -400}
  const positionPlatform6 = {x: -200, y: 300}
  const positionPlatform7 = {x: 500, y: 800}
  const positionPlatform8 = {x: 200, y: 1300}
  const positionPlatform9 = {x: -200, y: 1800}
  const positionPlatform10 = {x: 250, y: 2200}
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
    }
  }

  let jumpingCount = 0

  // create a new random function based on the seed
  const prng = alea('seed');
  // use the seeded random function to initialize the noise function
  const noise2D = createNoise2D(prng);

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
              showStaticBody: true,
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
              // timeText = initTimer(this)
              // console.log(timeText)
              console.log('add rectangle', this.add.rectangle)
              // const retangleBody = this.matter.add.rectangle(-600, -1000, 1000, 10000, 0xFFFF)
              // retangleBody.allowGravity = false
              // const rectangle = this.add.rectangle(-600, -1000, 1000, 10000, 0xFFFF)
              // let rectangle = this.matter.add.gameObject(retangleBody)
              // retangleBody.setStatic(false) 
              // retangleBody.setDepth(5)

              // const retangleBody2 = this.matter.add.rectangle(0, 1000, 10000)
              // const rectangleImage2 = this.add.rectangle(2300, 1000, 1000, 10000, '#fff')
              // let rectangle2 = this.matter.add.gameObject(rectangleImage2, retangleBody2)
              // rectangle2.setDepth(5)


              const inputs = getKeyDatas(this)
              keyA = inputs.keyA
              keyS = inputs.keyS
              keyD = inputs.keyD

              let positionAbeilleX
              let positionAbeilleY

              const abeilleCount = 3
              for (let i = 0; i <= abeilleCount; i++) {
                positionAbeilleX = getRandomArbitrary(-100, 600)
                positionAbeilleY = getRandomArbitrary(-200, 200)
                const newAbeille = getAbeille(this, 0.03, positionAbeilleX, positionAbeilleY)
                abeilles.push(newAbeille)
              }

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
              score.time = time
              // console.log(score.time)

              const abeilleCount = 4
              for (let i = 0; i < abeilleCount; i++) {
                let abeillePosition = {x: abeilles[i].x , y: abeilles[i].y}
                let galettePosition = {x: galette.x, y: galette.y}
                let direction = new Phaser.Math.Vector2(galettePosition.x - abeillePosition.x, galettePosition.y - abeillePosition.y).normalize()
  
                abeilles[i].flipX = direction.x > 0
  
                const abeilleSpeed = direction.multiply(new Phaser.Math.Vector2(0.1 * delta, 0.1 * delta))
  
                abeilles[i].body.position.x += abeilleSpeed.x
                abeilles[i].body.position.y += abeilleSpeed.y
                // abeilles[i].setPosition(abeilles[i].x + abeilleSpeed.x)
                // abeilles[i].setPosition(abeilles[i].y + abeilleSpeed.y)
              }
              

              // Galette that rotate with velocity (because friction = 0)
              setRotationWithVelocity()

              if (galette.body.velocity) {
                galetteImage.scaleX = scaleX * (Math.abs(galette.body.velocity.x * 0.03) + 1 )
                galetteImage.scaleY = scaleY * (Math.abs(galette.body.velocity.y * 0.03) + 1 )
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
                platform5,
                platform6,
                platform7,
                platform8,
                platform9,
                platform10,
                keyA,
                keyS,
                positionPlatform1,
                positionPlatform2,
                positionPlatform3,
                positionPlatform4,
                positionPlatform5,
                positionPlatform6,
                positionPlatform7,
                positionPlatform8,
                positionPlatform9,
                positionPlatform10,
                joystick
              )
            },
            render: function() {
            }
        },
    };

    const setPlatformOnScene = (game) =>  {
      platform1 = createPlatform(game, positionPlatform1.x, positionPlatform1.y, 'platform_1')
      platform2 = createPlatform(game, positionPlatform2.x, positionPlatform2.y, 'platform_2')
      platform3 = createPlatform(game, positionPlatform3.x, positionPlatform3.y, 'platform_3')
      platform4 = createPlatform(game, positionPlatform4.x, positionPlatform4.y, 'platform_4')
      platform5 = createPlatform(game, positionPlatform5.x, positionPlatform5.y, 'platform_5')
      platform6 = createPlatform(game, positionPlatform6.x, positionPlatform6.y, 'platform_6')
      platform7 = createPlatform(game, positionPlatform7.x, positionPlatform7.y, 'platform_7')
      platform8 = createPlatform(game, positionPlatform8.x, positionPlatform8.y, 'platform_8')
      platform9 = createPlatform(game, positionPlatform9.x, positionPlatform9.y, 'platform_9')
      platform10 = createPlatform(game, positionPlatform10.x, positionPlatform10.y, 'platform_10', true)

    }

    const createWallsOfGameOver = (positionX, positionY, width, height) => {
      const retangleBody2 = this.matter.add.rectangle(0, 1000, 10000)
      const rectangleImage2 = this.add.rectangle(2300, 1000, 1000, 10000, '#fff')
      let rectangle2 = this.matter.add.gameObject(rectangleImage2, retangleBody2)
      rectangle2.setDepth(5)
    }

    const setRotationWithVelocity = () => {
      if (galette.body.velocity) {
        const rotation = Math.min(new Phaser.Math.Vector2(galette.body.velocity).length() * Math.sign(galette.body.velocity.x) * 0.05, 0.3)
        galette.rotation += rotation
      }
    }

    const createPlatform = (game, positionX, positionY, name, isLast) => {
      let platformToReturn
      platformToReturn = game.matter.add.image(positionX, positionY, name, null, { isStatic: true })
      if (isLast) {
        // Last platform scale
        platformToReturn.setScale(0.8, 0.4)

      } else {
        // All platforms scale
        platformToReturn.setScale(0.4)
      }

      return platformToReturn
    }

    const setCamerasParams = (game, objectToFollow) => {
      game.cameras.main.startFollow(objectToFollow) 
      game.cameras.main.zoom = 1
      // game.cameras.main.zoom = 0.2
    }

    const jumpGalette = () => {
      if (jumpingCount < 2) {
        jumpingCount += 1
        galette.setVelocityY(-10.5)
      }
    }

    const galetteCollideListener = () => {
      galette.setOnCollide((e) => {
        handleCollideWithAbeille(e)

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
        } else if (platformName === "platform_5" && isPlatform5Actived === false) {
          isPlatform5Actived = true
          activePlatform = 'platform_5'
          jumpingCount = 0
        } else if (platformName === "platform_6" && isPlatform6Actived === false) {
          isPlatform6Actived = true
          activePlatform = 'platform_6'
          jumpingCount = 0
        } else if (platformName === "platform_7" && isPlatform7Actived === false) {
          isPlatform7Actived = true
          activePlatform = 'platform_7'
          jumpingCount = 0
        } else if (platformName === "platform_8" && isPlatform8Actived === false) {
          isPlatform8Actived = true
          activePlatform = 'platform_8'
          jumpingCount = 0
        } else if (platformName === "platform_9" && isPlatform9Actived === false) {
          isPlatform9Actived = true
          activePlatform = 'platform_9'
          jumpingCount = 0
        } else if (platformName === "platform_10" && isPlatform10Actived === false) {
          isPlatform10Actived = true
          activePlatform = 'platform_10'
          jumpingCount = 0
        } else if (platformName === "platform_1") {
          jumpingCount = 0
        } else if (platformName === "platform_2") {
          jumpingCount = 0
        } else if (platformName === "platform_3") {
          jumpingCount = 0
        } else if (platformName === "platform_4") {
          jumpingCount = 0
        } else if (platformName === "platform_5") {
          jumpingCount = 0
        } else if (platformName === "platform_6") {
          jumpingCount = 0
        } else if (platformName === "platform_7") {
          jumpingCount = 0
        } else if (platformName === "platform_8") {
          jumpingCount = 0
        } else if (platformName === "platform_9") {
          jumpingCount = 0
        } else if (platformName === "platform_10") {
          jumpingCount = 0
        }
      })
    }

    const handleCollideWithAbeille = (e) => {
      const objectCollided = e.bodyB.gameObject.texture.key
      if (objectCollided === "abeille") {
        console.log("abeille collided")
      }
    }

    usePhaserGame(config)

  function updateForArcadeBorne() {
    gamepadEmulator.update();
    requestAnimationFrame(updateForArcadeBorne);
  }
  updateForArcadeBorne();

    return (
        <div className="game">
            <Time 

            />
        </div>
    )
}

export default Game;