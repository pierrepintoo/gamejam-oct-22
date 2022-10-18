import logo from './logo.svg';
import './App.css';
import Game from './components/Game/Game';
import { useState } from 'react';

function App() {
  const [mousePos, setMousePos] = useState({x: 0, y: 0})

  const handleMouseMove = (e) => {
    console.log(e)
  }
  return (
    <div 
      className="App"
      onMouseMove={(e) => handleMouseMove(e)}
      >
      <Game />
    </div>
  );
}

export default App;
