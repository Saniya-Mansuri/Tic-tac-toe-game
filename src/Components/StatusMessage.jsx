const StatusMessage = ({ winner, gamingBoard }) => {
  const { squares, isXNext } = gamingBoard;

  const noMovesLeft = squares.every(squareValue => squareValue !== null);
  const nextPlayer = isXNext ? 'O' : 'X';

  const renderStatusMessage = () => {
    if (winner) {
      return (
        <h2>
          Winner is <span className="text-green">{winner}</span>
        </h2>
      );
    }
    if (!winner && noMovesLeft) {
      return (
        <div>
          <span className="text-orange">O and X is tied</span>
        </div>
      );
    }
    if (!winner && !noMovesLeft) {
      return (
        <div>
          Next Player is <span className="text-orange">{nextPlayer}</span>
        </div>
      );
    }
    return null;
  };
  return <h1 className="status-message">{renderStatusMessage()}</h1>;
};

export default StatusMessage;
