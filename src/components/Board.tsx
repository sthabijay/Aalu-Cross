import { useEffect } from "react";

import checkBoard from "../controllers/checkBoard";
import { Counter, GameStatus, Player, WholePlayer } from "../pages/Online";

import { io } from "socket.io-client";
import checkBoard_KaluMode from "../controllers/checkBoard_KaluMode";

const socket = io("https://aalu-cross-server.onrender.com/");
// const socket = io("http://localhost:3000/");

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
};

function Board({
  currentPlayer,
  winner,
  setWinner,
  tiles,
  setTiles,
  gameMode,
  gameStatus,
  you,
  firstPlayer,
}: props) {
  useEffect(() => {
    let winner;

    if (gameMode === "aalu") {
      winner = checkBoard(tiles);
    }

    if (gameMode === "kalu") {
      winner = checkBoard_KaluMode(tiles, firstPlayer);
    }

    // if (winner) {
    //   winner === "draw"
    //     ? setCounter((prev: Counter) => {
    //         console.log("draw");
    //         return { ...prev, draws: prev.draws + 1 };
    //       })
    //     : null;
    //   winner === "X"
    //     ? setCounter((prev: Counter) => {
    //         console.log("x");
    //         return { ...prev, p1: prev.p1 + 1 };
    //       })
    //     : null;
    //   winner === "O"
    //     ? setCounter((prev: Counter) => {
    //         console.log("o");
    //         return { ...prev, p2: prev.p2 + 1 };
    //       })
    //     : null;
    // }

    winner ? setWinner(winner) : null;
  }, [tiles]);

  const setNewTiles = (index: number) => {
    const newTiles = tiles.map((tile, i) => {
      return index === i ? currentPlayer : tile;
    });

    setTiles(newTiles);

    socket.emit("SEND_CHANGES", {
      roomCode: sessionStorage.getItem("roomCode"),
      tiles: newTiles,
      currentPlayer,
      winner,
    });
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
