import React, { useEffect, useState } from "react";
import Phaser from "phaser";
import getKeyDatas from "./getKeyDatas";
import { rotateGround, resetAngle, switchRotationPlatform } from "./Ground";
import { loadImages, loadSounds } from "./Loader";
import { getGalette, getGaletteImage } from "./Galette";
import { moveFog1, moveFog2, setBackground, setFog1, setFog2 } from "./Background";
import Axis from "axis-api";
import SoundFadePlugin from 'phaser3-rex-plugins/plugins/soundfade-plugin.js';
import { playSound, setAmbianceAudioOnStart } from "./Audio";
import { getAbeille } from "./Abeille";
import { createNoise2D } from 'simplex-noise';
import alea from 'alea';
import { getRandomArbitrary  } from "../Utils";
import Time from "../Time/Time";
import Notice from "../Notice/Notice";
import { CSSTransition } from "react-transition-group";
import './style.css'

const Game = ({mousePos, handleGameOver, handleEndGame}) => {

  let countHit = 0
  let previousCounthit = 0

  const [isStarted, setIsStarted] = useState(false)
  const [isEnded, setIsEnded] = useState(false)
  let [onHit, setOnHit] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setIsStarted(false)
    }, 5000)
  }, [])

  const score = {
    time: 0,
    timeWithString: ""
  }

  const phaserGameRef = React.useRef(null);
  const windowH = window.innerHeight
  const windowW = window.innerWidth
  let canMoveCamera = false
  let unzoomCameraTimeout
  let line, ground, galette, galetteImage, platform1, platform2, platform3, platform4, platform5, platform6, platform7, platform8, platform9, platform10
  let platform11, platform12, platform13, platform14, platform15, platform16, platform17
  let isPlatform1Actived = false, isPlatform2Actived = false, isPlatform3Actived = false, isPlatform4Actived = false
  let isPlatform5Actived = false, isPlatform6Actived = false, isPlatform7Actived = false, isPlatform8Actived = false
  let isPlatform9Actived = false, isPlatform10Actived = false
  let isPlatform11Actived = false, isPlatform12Actived = false, isPlatform13Actived = false, isPlatform14Actived = false
  let isPlatform15Actived = false, isPlatform16Actived = false, isPlatform17Actived = false

  let keyA, keyS, keyD, keySPACE
  let abeilles = []
  let activePlatform = ""
  let timeText
  let scaleXY = 0.15
  let scaleX = 0.15
  let scaleY = 0.15
  const positionPlatform1 = {x: -100, y: -1000}
  const positionPlatform2 = {x: 800, y: -800}
  const positionPlatform3 = {x: 1400, y: -500}
  const positionPlatform4 = {x: 900, y: -100}
  const positionPlatform5 = {x: 100, y: -400}
  const positionPlatform6 = {x: -200, y: 300}
  const positionPlatform7 = {x: 500, y: 800}
  const positionPlatform8 = {x: -100, y: 1300}
  const positionPlatform9 = {x: -200, y: 1800}
  const positionPlatform10 = {x: -550, y: 2200}
  const positionPlatform11 = {x: 500, y: 2200}
  const positionPlatform12 = {x: 1200, y: 1800}
  const positionPlatform13 = {x: 1100, y: 1350}
  const positionPlatform14 = {x: 1300, y: 600}
  const positionPlatform15 = {x: -1100, y: -100}
  const positionPlatform16 = {x: 2100, y: 100}
  const positionPlatform17 = {x: 600, y: -1300}
  let joystick = {x: 0, y: 0}
  let ambiance
  let ambianceForet
  let sautSound
  let choc
  const ambianceVolume = 0.5
  const rotationSpeed = 0.0005

  let cat1, cat2
  // Map key axis
  Axis.registerKeys(" ", "a", 1); // keyboard key "q" to button "a" from group 1
  Axis.registerKeys("d", "x", 1); // keyboard key "d" to button "x" from group 1
  Axis.registerKeys("w", "w", 1); // keyboard key "q" to button "a" from group 1

  // For Joystick
  const gamepadEmulator = Axis.createGamepadEmulator(0)
  Axis.joystick1.setGamepadEmulatorJoystick(gamepadEmulator, 0)
  const joystickMoveHandler = (e) => {
    // console.log(e.id, e.position)
    // Get the joystick id in the event payload object
    if (e.id === 1) {
        joystick.x = e.position.x
        joystick.y = e.position.y
        // console.log('joystick.x', joystick.x)
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
        type: Phaser.AUTO,
        zoom: 1,
        width: 2560,
        height: 1440,
        scale: {
            mode: Phaser.Scale.FIT,
            parent: 'phaser-example',
            autoCenter: Phaser.Scale.CENTER_BOTH,

        },
        backgroundColor: "#DEFAF4",
        // transparent: true,
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
              this.load.spritesheet('renard', 'assets/spritesheet/renard.gif', { frameWidth: 104, frameHeight: 104, endFrame: 38 });
            },
            create: function() {
              setFog1(this, windowW, windowH)

              let halo = this.add.image(-300, 2200, 'halo')
              halo.setDepth(2)

              // setFog2(this)
              // timeText = initTimer(this)
              // console.log(timeText)
              // console.log('add rectangle', this.add.rectangle)
              // const retangleBody = this.matter.add.rectangle(-600, -1000, 1000, 10000, 0xFFFF)
              // retangleBody.allowGravity = false
              // const rectangle = this.add.rectangle(-600, -1000, 1000, 10000, 0xFFFF)
              // let rectangle = this.matter.add.gameObject(retangleBody)
              // retangleBody.setDepth(5)
              // retangleBody.setOnCollide((e) => {
              //   console.log('collide rectangle')
              // })
              // retangleBody.setStatic(false) 
              // retangleBody.setDepth(5)

              // const retangleBody2 = this.matter.add.rectangle(0, 1000, 10000)
              // const rectangleImage2 = this.add.rectangle(2600, 1000, 1000, 10000, '#fff')
              // let rectangle2 = this.matter.add.gameObject(rectangleImage2, retangleBody2)
              // rectangle2.setDepth(5)

              initCategories(this)


              const inputs = getKeyDatas(this)
              keyA = inputs.keyA
              keyS = inputs.keyS
              keyD = inputs.keyD

              let positionAbeilleX
              let positionAbeilleY

              // for (let i = 0; i <= abeilleCount; i++) {
              //   positionAbeilleX = getRandomArbitrary(-300, 300)
              //   positionAbeilleY = getRandomArbitrary(-1300, -700)
              //   const newAbeille = getAbeille(this, 0.03, positionAbeilleX, positionAbeilleY)
              //   newAbeille.setCollisionCategory(cat2)
              //   abeilles.push(newAbeille)

              // }
              createAbeille(this, {x: 100, y: -900})
              createAbeille(this, {x: 700, y: -650})
              createAbeille(this, {x: 100, y: 200})
              createAbeille(this, {x: -100, y: 1200})
              createAbeille(this, {x: 2100, y: 0})

              galette = getGalette(this, scaleXY)
              galette.setCollisionCategory(cat1)

              galetteCollideListener(this)

              setBackground(this, windowW, windowH)
              
              setPlatformOnScene(this)

              setCamerasParams(this, galette)


              Axis.addEventListener("joystick:move", joystickMoveHandler);
              Axis.addEventListener("keydown", (e) => {
                if (e.key === "a") {
                  jumpGalette(this)
                }

                if (e.key === "w") {
                  console.log('FDNOOFKSDN')
                  showGameOverScreen()
                }

                if (e.key === "") {
                }
              })

              galetteImage = getGaletteImage()

              let moreHit = collisonListener(this)

              // const sao1 = [ 2, 3, 5, 6, 12, 13, 14, 20, 21, 22, 27, 28, 29, 34, 35, 36, 37 ];
              // let frames
              // //  And insert the frames into the array:
              // for (var i = 0; i <= 50; i++)
              // {

              //         frames.push({ key: 'sao10', frame: i.toString() });
              // }

              console.log(this.anims.generateFrameNumbers('renard'))

              let config = {
                key: 'renardDance',
                frames: this.anims.generateFrameNumbers('renard'),
                frameRate: 25,
                repeat: -1
              };
        
              // this.anims.create(config);
              // // const bodyRenard = this.matter.add.rectangle(200, 200, 500)
              const renard = this.matter.add.sprite(-200, 2100 , 'renard').play('renardDance');

            },
            update: function(time, delta) {
              if (activePlatform === "platform_10" && isEnded === false) {
                setIsEnded(true)
              }
              // gamepadEmulator.update();
              // // console.log(joystick.x)
              // if (joystick.x > 0) {
              //   console.log(joystick)
              // }
              moveFog1(time)
              // moveFog2(time)
              if (countHit !== previousCounthit) {
                setOnHit(countHit)
                previousCounthit += 1
              }
              // score.time = time

              const abeilleCount = 4
              for (let i = 0; i < abeilleCount; i++) {
                let abeillePosition = {x: abeilles[i].object.x , y: abeilles[i].object.y}
                let galettePosition = {x: galette.x, y: galette.y}
                let direction = new Phaser.Math.Vector2(galettePosition.x - abeillePosition.x, galettePosition.y - abeillePosition.y).normalize()
                let directionToSpawn = new Phaser.Math.Vector2(abeilles[i].spawnPosition.x - abeillePosition.x, abeilles[i].spawnPosition.y - abeillePosition.y).normalize()
                const distanceGaletteAbeilleSpawn = new Phaser.Math.Vector2(galettePosition.x - abeilles[i].spawnPosition.x, galettePosition.y - abeilles[i].spawnPosition.y).length()
                
                if (distanceGaletteAbeilleSpawn < 700) {
                  const abeilleSpeed = direction.multiply(new Phaser.Math.Vector2(0.2 * delta, 0.2 * delta))
    
                  abeilles[i].object.x += abeilleSpeed.x
                  abeilles[i].object.y += abeilleSpeed.y

                  abeilles[i].object.flipX = direction.x > 0

                } else if (parseInt(abeillePosition.x) !== abeilles[i].spawnPosition.x) {
                  const abeilleSpeed = directionToSpawn.multiply(new Phaser.Math.Vector2(0.1 * delta, 0.1 * delta))
    
                  abeilles[i].object.x += abeilleSpeed.x
                  abeilles[i].object.y += abeilleSpeed.y
                  
                  abeilles[i].object.flipX = directionToSpawn.x > 0
                } else {
                  abeilles[i].object.y = abeilles[i].spawnPosition.y + Math.sin(time * 0.005) * 10
                }
              }
              
              // Moving platforms
              platform5.x = 200 + Math.sin(time * 0.001) * 200
              platform12.x = 1200 + Math.cos((time + 3500)* 0.001) * 300
              platform14.x = 1400 + Math.cos((time + 3500)* 0.001) * 600

              platform1.rotation = (time + 67189) * (-rotationSpeed)
              platform3.rotation = (time + 7814) * rotationSpeed
              platform6.rotation = time * rotationSpeed
              platform8.rotation = (time + 1000) * (-rotationSpeed)
              platform13.rotation = (time + 3000) * rotationSpeed

              // Galette that rotate with velocity (because friction = 0)
              setRotationWithVelocity()

              if (galette.body.velocity) {
                galetteImage.scaleX = scaleX * (Math.abs(galette.body.velocity.x * 0.03) + 1 )
                galetteImage.scaleY = scaleY * (Math.abs(galette.body.velocity.y * 0.03) + 1 )
              }
            
              // Audio
              // choc = this.sound.add('choc', { volume: ambianceVolume});
              sautSound = this.sound.add('sautGalette', { volume: ambianceVolume });
              ambiance = this.sound.add('ambiance', {loop: true, volume: ambianceVolume})
              ambianceForet = this.sound.add('ambianceForet', {loop: true, volume: ambianceVolume})

              setAmbianceAudioOnStart(this, ambiance, ambianceForet, ambianceVolume)
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
                platform11,
                platform12,
                platform13,
                platform14,
                platform15,
                platform16,
                platform17,
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
                positionPlatform11,
                positionPlatform12,
                positionPlatform13,
                positionPlatform14,
                positionPlatform15,
                positionPlatform16,
                positionPlatform17,
                joystick,
                canMoveCamera
              )
            },
            render: function() {
            }
        },
    };

    const createAbeille = (game, spawnPosition) => {
      const newAbeille = getAbeille(game, 0.1, spawnPosition.x, spawnPosition.y)
      newAbeille.setCollisionCategory(cat2)
      abeilles.push({
        spawnPosition: spawnPosition, 
        object: newAbeille
      })
    }

    const showGameOverScreen = () => {
      handleGameOver()
    }

    const collisonListener = (game) => {

      game.matter.world.on('collisionstart',  (event) => {
        if (event.pairs[0].bodyA.gameObject){
        if (event.pairs[0].bodyB.gameObject.texture.key == "galette") {
          if (event.pairs[0].bodyA.gameObject.texture.key == "abeille") {
            // console.log('player is hit')
            // console.log(countHit)
            countHit += 1
            return (countHit)
          }
       }		
          }		
      })
    }

    const initCategories = (game) => {
      cat1 = game.matter.world.nextCategory();
      cat2 = game.matter.world.nextCategory();
    }

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
      platform10 = createPlatform(game, positionPlatform10.x, positionPlatform10.y, 'platform_10')
      platform11 = createPlatform(game, positionPlatform11.x, positionPlatform11.y, 'platform_11')
      platform12 = createPlatform(game, positionPlatform12.x, positionPlatform12.y, 'platform_12')
      platform13 = createPlatform(game, positionPlatform13.x, positionPlatform13.y, 'platform_13')
      platform14 = createPlatform(game, positionPlatform14.x, positionPlatform14.y, 'platform_14')
      platform15 = createPlatform(game, positionPlatform15.x, positionPlatform15.y, 'platform_15')
      platform16 = createPlatform(game, positionPlatform16.x, positionPlatform16.y, 'platform_16')
      platform17 = createPlatform(game, positionPlatform17.x, positionPlatform17.y, 'platform_17')

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
      // game.cameras.main.zoom = 1
      // console.log(game.cameras.main.shake)
      // game.cameras.main.y = 200
      
      // game.cameras.main.zoom = 0.2

      // ON START CAMERA
      // game.cameras.main.setBounds(0, 400, 2560, 1440)
      game.cameras.main.zoom = 0.7
      game.cameras.main.centerOn(galette.x, 1500)
      setTimeout(() => {
        game.cameras.main.pan(galette.x, galette.y, 4000, 'Quart.easeInOut', false, (ctx) => {
        });
        setTimeout(() => {
          game.cameras.main.zoomTo(1.65, 1000, "Quart.easeInOut")
          setTimeout(() => {
            canMoveCamera = true
            game.cameras.main.startFollow(objectToFollow)
          }, 1050)
        }, 4050)

      }, 1000)


      // game.cameras.main.zoom = 0.6
      // game.cameras.main.pan(galette.x + 100, galette.y - 800, 1000, 'Power2');
      // game.cameras.main.y += 200
        // console.log(game.cameras.main.startFollow(objectToFollow))

    }

    const accelerateGalette = () => {
      if (canMoveCamera) {
        if (galette.body.velocity.x > 0) {
          galette.setVelocityX(galette.body.velocity.x + 7.5)
          galette.setVelocityY(galette.body.velocity.y - 6)
        } else if (galette.body.velocity.x < 0) {
          galette.setVelocityX(galette.body.velocity.x - 7.5)
          galette.setVelocityY(galette.body.velocity.y - 6)
        }
      }
    }

    const jumpGalette = async (game) => {
      if (jumpingCount < 2 && canMoveCamera) {
        jumpingCount += 1
        galette.setVelocityY(-13.5)
        sautSound.play()
        // console.log(game.cameras.main.zoomEffect.isRunning)
        // if (game.cameras.main.zoomEffect.isRunning === false && canMoveCamera) {
        //   game.cameras.main.zoomTo(0.7, 400, "Quad.easeOut")
        //   setTimeout(() => {
        //     game.cameras.main.zoomTo(1, 400, "Quad.easeOut")
        //   }, 450)
          
          
        // }
      }
    }

    const galetteCollideListener = (game) => {
      galette.setOnCollide((e) => {
        game.cameras.main.shake(3, 1, 1)
        // choc.play()
        
        // handleCollideWithAbeille(e)
        
        const platformName = e.bodyB.gameObject.texture.key
        if (platformName === "platform_1") {
          isPlatform1Actived = true
          jumpingCount = 0
          activePlatform = 'platform_1'
        } else if (platformName === "platform_2") {
          isPlatform2Actived = true
          jumpingCount = 0
          activePlatform = 'platform_2'
        } else if (platformName === "platform_3") {
          isPlatform3Actived = true
          jumpingCount = 0
          activePlatform = 'platform_3'
        } else if (platformName === "platform_4") {
          isPlatform4Actived = true
          activePlatform = 'platform_4'
          jumpingCount = 0
        } else if (platformName === "platform_5") {
          isPlatform5Actived = true
          activePlatform = 'platform_5'
          jumpingCount = 0
        } else if (platformName === "platform_6") {
          isPlatform6Actived = true
          activePlatform = 'platform_6'
          jumpingCount = 0
        } else if (platformName === "platform_7") {
          isPlatform7Actived = true
          activePlatform = 'platform_7'
          jumpingCount = 0
        } else if (platformName === "platform_8") {
          isPlatform8Actived = true
          activePlatform = 'platform_8'
          jumpingCount = 0
        } else if (platformName === "platform_9") {
          isPlatform9Actived = true
          activePlatform = 'platform_9'
          jumpingCount = 0
        } else if (platformName === "platform_10") {
          isPlatform10Actived = true
          activePlatform = 'platform_10'
          jumpingCount = 0
        } else if (platformName === "platform_11") {
          isPlatform11Actived = true
          activePlatform = 'platform_11'
          jumpingCount = 0
        } else if (platformName === "platform_12") {
          isPlatform12Actived = true
          activePlatform = 'platform_12'
          jumpingCount = 0
        } else if (platformName === "platform_13") {
          isPlatform13Actived = true
          activePlatform = 'platform_13'
          jumpingCount = 0
        } else if (platformName === "platform_14") {
          isPlatform14Actived = true
          activePlatform = 'platform_14'
          jumpingCount = 0
        } else if (platformName === "platform_15") {
          isPlatform15Actived = true
          activePlatform = 'platform_15'
          jumpingCount = 0
        } else if (platformName === "platform_16") {
          isPlatform16Actived = true
          activePlatform = 'platform_16'
          jumpingCount = 0
        } else if (platformName === "platform_17") {
          isPlatform17Actived = true
          activePlatform = 'platform_17'
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
        jumpingCount = 0
      })
    }

    usePhaserGame(config)

  function updateForArcadeBorne() {
    gamepadEmulator.update();
    requestAnimationFrame(updateForArcadeBorne);
  }
  updateForArcadeBorne();

    return (
        <div className="game">
            {!isStarted && <Time
              onHit={onHit}
              isEnded={isEnded}
              handleEndGame={handleEndGame}
            />}
            <CSSTransition
              in={isStarted}
              timeout={300}
              classNames="notice__transition"
              unmountOnExit
            >
              <Notice />
            </CSSTransition>
            {/* {isEnded && <EndScreen />} */}
          </div>
    )
}

export default Game;