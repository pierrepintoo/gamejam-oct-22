import { useEffect } from 'react';
import './style.css'
import Axis from "axis-api";

const EndScreen = ({timeString}) => {
    Axis.registerKeys("e", "s", 1); // keyboard key "e" to button "s" from group 1

    useEffect(() => {
        Axis.addEventListener("keydown", (e) => {
            if (e.key === "s") {
                window.location.reload();
            }
          })
    }, [])
    return (
        <div
            className="end_screen"
        > 
            <h1
                className="end_screen__title"
            >
                Bravo !
            </h1>
            <p
             className="end_screen__time"
            >Votre temps : {timeString}</p>
            <a className="end_screen__button" href=''>Rejouer</a>
        </div>
    )
    
}

export default EndScreen;