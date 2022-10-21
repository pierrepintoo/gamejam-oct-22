import './gameover.css'
import Axis from "axis-api";
import { useEffect } from 'react';

const GameOver = () => {

    Axis.registerKeys("e", "s", 1); // keyboard key "e" to button "s" from group 1

    useEffect(() => {
        Axis.addEventListener("keydown", (e) => {
            if (e.key === "s") {
                window.location.reload();
            }
          })
    }, [])

    return (
        <div className="game-over">
            <h1>Game over</h1>
            <a href=''>Rejouer</a>
            <img className='platform' src="assets\platforms\plateforme-go.png" alt="platform" />
        </div>
    )
}

export default GameOver;