import { useEffect } from "react";

import checkBoard from "../controllers/checkBoard";
import { GameStatus, Player } from "../pages/Online";
import checkBoard_KaluMode from "../controllers/checkBoard_KaluMode";

type props = {
  currentPlayer: Player;
  setCurrentPlayer: Function;
  winner: Player;
  setWinner: Function;
  tiles: Player[];
  setTiles: Function;
  gameMode: string | undefined;
  gameStatus: GameStatus;
  firstPlayer: Player;
};

function Board({
  currentPlayer,
  setCurrentPlayer,
  winner,
  setWinner,
  tiles,
  setTiles,
  gameMode,
  gameStatus,
  firstPlayer,
}: props) {
  useEffect(() => {
    const winner =
      gameMode === "aalu"
        ? checkBoard(tiles)
        : gameMode === "kalu"
        ? checkBoard_KaluMode(tiles, firstPlayer)
        : null;

    winner ? setWinner(winner) : null;
  }, [tiles]);

  const setNewTiles = (index: number) => {
    const newTiles = tiles.map((tile, i) => {
      return index === i ? currentPlayer : tile;
    });

    setTiles(newTiles);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
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
                  gameStatus === "ready"
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

        {/* <div className="bg-transparent w-full h-full rounded-md absolute top-0 left-0 p-8 opacity-50 z-10">
          <div className="bg-gradient-to-tr from-green-500 to-blue-500 w-full h-full grid grid-cols-3 gap-1">
            {tiles.map((_, index) => {
              return (
                <button
                  className={`bg-inherit text-4xl aspect-square`}
                  key={index}
                ></button>
              );
            })}
          </div>
        </div> */}
      </div>
    </>
  );
}
export default Board;
