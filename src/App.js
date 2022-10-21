import logo from './logo.svg';
import './App.css';
import Game from './components/Game/Game';
import GameOver from './components/GameOver/GameOver';
import Notice from './components/Notice/Notice';
import Accueil from './components/Accueil/Accueil';
import { useState } from 'react';

function App() {
  const [mousePos, setMousePos] = useState({x: 0, y: 0})
  const [isGameOverScreenVisible, setIsGameOverScreenVisible] = useState(false)

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
  return (
    <div 
      className="App"
      onMouseMove={(e) => handleMouseMove(e)}
      >
        {/* <Accueil/> */}
      {!isGameOverScreenVisible && <Game 
        mousePos={mousePos}
        handleGameOver={() => handleGameOver()}
      />} 
      {isGameOverScreenVisible && <GameOver/>}
      {/* <Notice/>  */}
    </div>
  );
}

export default App;
