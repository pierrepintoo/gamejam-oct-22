import logo from './logo.svg';
import './App.css';
import Game from './components/Game/Game';
import GameOver from './components/GameOver/GameOver.jsx';
import { useState } from 'react';

function App() {
  const [mousePos, setMousePos] = useState({x: 0, y: 0})

  const handleMouseMove = (e) => {
    // console.log(e.clientX)
    let newMousePos = {
      x: e.clientX,
      y: e.clientY
    }
    setMousePos(newMousePos)
  }
  return (
    <div 
      className="App"
      onMouseMove={(e) => handleMouseMove(e)}
      >
      <Game 
        mousePos={mousePos}
      />
      {/* <GameOver/> */}
    </div>
  );
}

export default App;
