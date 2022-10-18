import React from "react";
import { useEffect } from "react";
import Phaser, {GameObjects} from "phaser";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

const Game = () => {
  const phaserGameRef = React.useRef(null);
  const windowH = window.innerHeight
  const windowW = window.innerWidth
  let handle1, handle2, line
  let mouse = {
    x: 0,
    y: 0
  }

  

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
        type: Phaser.AUTO,
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
          scene: [
            {
              plugin: PhaserMatterCollisionPlugin,
              key: 'matterCollision',
              mapping: 'matterCollision',
            },
          ],
        },
        scene: {
            preload: function() {
            },
            create: function() {
              const lineWidth = 100
              const positionX = windowW / 2
              const positionY = windowH / 2  - (lineWidth / 2)

              line = this.add.line(positionX, positionY, 0, 100, 1000, 100, 0x000);
              console.log(line)
            },
            update: function() {
              // line.lineWidth = 10
              
              // line1.fromSprite(handle1, handle2, false);
            }
        },
    };

    usePhaserGame(config)


    return (
        <div>
            
        </div>
    )
}

export default Game;