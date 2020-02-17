import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Board } from './components/board/Board';

function App() {
  return (
    <div className="App">
      <Board size={[10+2, 20+1]}/>
    </div>
  );
}

export default App;
