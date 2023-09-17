import checkBoard from "../controllers/checkBoard";
import checkBoard_KaluMode from "../controllers/checkBoard_KaluMode";

import { Counter, GameStatus, Player, WholePlayer } from "../pages/Online";

type props = {
  currentPlayer: Player;
  setCurrentPlayer: Function;
  winner: string | null;
  setWinner: Function;
  tiles: Player[];
  setTiles: Function;
  gameMode: string | undefined;
  gameStatus: GameStatus;
  you: WholePlayer;
  firstPlayer: Player;
  counter: Counter;
  setCounter: Function;
  sendChanges: Function;
};

function Board({
  currentPlayer,
  winner,
  tiles,
  gameMode,
  gameStatus,
  you,
  firstPlayer,
  sendChanges,
}: props) {
  const setNewTiles = (index: number) => {
    const newTiles = tiles.map((tile, i) => {
      return index === i ? currentPlayer : tile;
    });

    const winner =
      gameMode === "aalu"
        ? checkBoard(newTiles)
        : checkBoard_KaluMode(newTiles, firstPlayer);

    sendChanges(newTiles, winner);
  };

  return (
    <>
      <div
        className={`w-full aspect-square bg-white rounded-md p-8 relative transition-all ${
          !gameStatus ||
          gameStatus === "ended" ||
          gameStatus === "waiting" ||
          gameStatus === "ready"
            ? "opacity-25"
            : "opacity-100"
        }`}
      >
        <div className="bg-gradient-to-tr from-green-500 to-blue-500 w-full h-full grid grid-cols-3 gap-1 rounded-md">
          {tiles.map((tile, index) => {
            return (
              <button
                className={`bg-white text-4xl font-display aspect-square hover:opacity-75 disabled:opacity-100 transition-all`}
                key={index}
                onClick={() => setNewTiles(index)}
                disabled={
                  tile ||
                  winner ||
                  !gameStatus ||
                  gameStatus === "ended" ||
                  gameStatus === "waiting" ||
                  gameStatus === "ready" ||
                  currentPlayer != you.plays
                    ? true
                    : false
                }
              >
                <div className="bg-gradient-to-tr from-green-500 to-blue-500 h-full flex justify-center items-center bg-clip-text text-transparent">
                  {tile}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Board;
