import './style.scss';
import { useState } from 'react';
import Board from './Components/Board';
import { calculateWinner } from './Winner';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setisXNext] = useState(false);

  const winner = calculateWinner(squares);
  const nextPlayer = isXNext ? 'O' : 'X';
  const statusMessage = winner
    ? `Winner is ${winner}`
    : `Next Player is ${nextPlayer}`;

  const handleSquareClick = clickedPosition => {
    if (squares[clickedPosition] || winner) {
      return;
    }

    setSquares(currentSquares => {
      return currentSquares.map((squareValue, position) => {
        if (clickedPosition === position) {
          return isXNext ? 'O' : 'X';
        }

        return squareValue;
      });
    });
    setisXNext(currentisXNext => !currentisXNext);
  };
  return (
    <div className="app">
      <h2>{statusMessage}</h2>
      <Board squares={squares} handleSquareClick={handleSquareClick} />
    </div>
  );
}

export default App;
