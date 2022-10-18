import React from "react";
import { useEffect } from "react";
import Phaser, {GameObjects} from "phaser";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import getKeyDatas from "./getKeyDatas";
import Ground, { rotateGround } from "./Ground";

const Game = ({mousePos}) => {
  const phaserGameRef = React.useRef(null);
  const windowH = window.innerHeight
  const windowW = window.innerWidth
  let line, graphics
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
              const inputs = getKeyDatas(this)
              keyA = inputs.keyA
              keyS = inputs.keyS

              graphics = this.add.graphics();
            },
            update: function(time, delta) {
              graphics.clear();;

              rotateGround(graphics, keyA, keyS, windowW, windowH)

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