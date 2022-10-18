import React from "react";
import Phaser from "phaser";
import getKeyDatas from "./getKeyDatas";
import { rotateGround } from "./Ground";
import { loadImages } from "./Loader";

const Game = ({mousePos}) => {
  const phaserGameRef = React.useRef(null);
  const windowH = window.innerHeight
  const windowW = window.innerWidth
  let line, ground
  let keyA;
  let keyS;

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
        backgroundColor: "#fff",
        physics: {
          default: 'arcade',
          arcade: {
              debug: false,
              gravity: {
                  y: 10
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

              ground = this.add.graphics();

              this.physics.add.image(100, 100, 'galette')
              
            },
            update: function(time, delta) {
              ground.clear();

              rotateGround(ground, keyA, keyS, windowW, windowH)

            },
            render: function() {
              this.game.debug.geom(line)
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