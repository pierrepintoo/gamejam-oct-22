import logo from './logo.svg';
import './App.css';
import Game from './components/Game/Game';
import GameOver from './components/GameOver/GameOver';
import Notice from './components/Notice/Notice';
import Accueil from './components/Accueil/Accueil';
import { useState } from 'react';
import EndScreen from './components/EndScreen/EndScreen';

function App() {
  const [mousePos, setMousePos] = useState({x: 0, y: 0})
  const [isGameOverScreenVisible, setIsGameOverScreenVisible] = useState(false)
  const [isEndScreenVisible, setIsEndScreenVisible] = useState(false)

  const handleMouseMove = (e) => {
    // console.log(e.clientX)
    let newMousePos = {
      x: e.clientX,
      y: e.clientY
    }
    setMousePos(newMousePos)
  }

  const handleGameOver = () => {
    console.log('go')
    setIsGameOverScreenVisible(true)
  }

  const handleEndGame = () => {
    setIsEndScreenVisible(true)
  }

  const DisplayGame = () => {
    console.log(isEndScreenVisible, isGameOverScreenVisible)
    if (isEndScreenVisible === false && isGameOverScreenVisible === true) {
      return (
       <>
        <Game 
            mousePos={mousePos}
            handleGameOver={() => handleGameOver()}
            handleEndGame={() => handleEndGame()}
          />
       </>
        
      )
    } else {
      return ""
    }
  }
  return (
    <div 
      className="App"
      onMouseMove={(e) => handleMouseMove(e)}
      >
        {/* <Accueil/> */}
      {isGameOverScreenVisible === false && <Game 
            mousePos={mousePos}
            handleGameOver={() => handleGameOver()}
            handleEndGame={() => handleEndGame()}
          />}
      {isGameOverScreenVisible && <GameOver/>}
      {isEndScreenVisible && <EndScreen />}
      {/* <Notice/>  */}
    </div>
  );
}

export default App;
