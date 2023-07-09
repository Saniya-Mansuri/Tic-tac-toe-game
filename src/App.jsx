import './style.scss';
import { useState } from 'react';
import Board from './Components/Board';
import { calculateWinner } from './Winner';
import StatusMessage from './Components/StatusMessage';
import History from './Components/History';

const NEW_GAME = [{ squares: Array(9).fill(null), isXNext: false }];
function App() {
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);

  const gamingBoard = history[currentMove];

  const winner = calculateWinner(gamingBoard.squares);

  const handleSquareClick = clickedPosition => {
    if (gamingBoard.squares[clickedPosition] || winner) {
      return;
    }

    setHistory(currentHistory => {
      const isTraversing = currentMove + 1 !== currentHistory.length;
      const lastGamingState = isTraversing
        ? currentHistory[currentMove]
        : currentHistory[currentHistory.length - 1];
      const nextSquaresState = lastGamingState.squares.map(
        (squareValue, position) => {
          if (clickedPosition === position) {
            return lastGamingState.isXNext ? 'O' : 'X';
          }
          return squareValue;
        }
      );

      const base = isTraversing
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory;

      return currentHistory.concat({
        squares: nextSquaresState,
        isXNext: !lastGamingState.isXNext,
      });
    });

    setCurrentMove(move => move + 1);
  };

  const moveTo = move => {
    setCurrentMove(move);
  };
  const restart = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };
  return (
    <div className="app">
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      <Board
        squares={gamingBoard.squares}
        handleSquareClick={handleSquareClick}
      />

      <h2>Game History</h2>
      <button
        type="button"
        onClick={restart}
        className={`btn-reset ${winner ? 'active' : ''}`}
      >
        Restart the Game
      </button>

      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  );
}

export default App;
