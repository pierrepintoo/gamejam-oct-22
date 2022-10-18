import React from "react";
import { useEffect } from "react";
import Phaser, {GameObjects} from "phaser";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

const Game = ({mousePos}) => {
  const phaserGameRef = React.useRef(null);
  const windowH = window.innerHeight
  const windowW = window.innerWidth
  let handle1, handle2, line, graphics
  let mouse = {
    x: 0,
    y: 0
  }
  let keyA;
  let keyS;
  let keyD;
  let keyW;
  
  let lineWidth = 200
  let lineHeight = 10

  const x2 = 1000
  const y2 = 10

  let countLeftPush = 0
  let countRightPush = 0
  let angleCount = 0

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

    const createGround = () => {
        // game.physics.startSystem(Phaser.Physics.ARCADE);
    }

    const config = {
        // width: window.innerWidth,
        // height: window.innerHeight,
        type: Phaser.WEBGL,
        scale: {
            mode: Phaser.Scale.FIT,
            parent: 'phaser-example',
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: window.innerWidth,
            height: window.innerHeight
        },
        backgroundColor: "#fff",
        physics: {
          default: 'arcade',
          matter: {
              debug: false,
              gravity: {
                  y: 0.3
              },
          }
        },
        plugins: {
        },
        scene: {
            preload: function() {
            },
            create: function() {
              keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
              keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
              keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
              keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

              graphics = this.add.graphics();
            },
            update: function(time, delta) {
              graphics.clear();;

              rotateGround()

            },
            render: function() {
              this.game.debug.geom(line)
            }
        },
    };

    usePhaserGame(config)

    const rotateGround = () => {
      const anchorLineX = windowW / 2
      const anchorLineY = windowH / 2 + 300
      const startLineX = -anchorLineX
      const endLineX = anchorLineX

      if(keyA.isDown) {
          console.log('A key pressed')
          angleCount += 1
      } else if(keyS.isDown) {
          console.log('S key pressed')
          angleCount -= 1
      }
      
      graphics.setPosition(anchorLineX, anchorLineY)
      graphics.lineStyle(6, 0x000000, 1);
      graphics.beginPath();

      graphics.moveTo(startLineX, 0)
      graphics.lineTo(endLineX, 0);

      graphics.strokePath();
      graphics.closePath();

      graphics.angle = angleCount
    }


    return (
        <div>
            
        </div>
    )
}

export default Game;