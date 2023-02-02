import { useGameContext } from "../contexts/game";

export const GameEndDialog = () => {
  const { game, newGame } = useGameContext();

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex">
      <div className="m-auto bg-tripod-900 rounded-lg shadow px-8 py-4 text-white flex flex-col text-center space-y-4">
        <div className="text-xl">Game Over!</div>
        <div>Your Points: {game.state.points}</div>
        <button
          type="button"
          className="px-2 py-1 uppercase border border-tripod/80 font-bold rounded"
          onClick={newGame}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};
