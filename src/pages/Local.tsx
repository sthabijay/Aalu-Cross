import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Board from "../LocalComponents/Board";
import Header from "../LocalComponents/Header";
import Footer from "../LocalComponents/Footer";

export type Player = "X" | "O" | "draw" | null;
export type GameStatus = "playing" | "ended" | null;

function Local() {
  const params = useParams();
  const navigate = useNavigate();

  const [currentPlayer, setCurrentPlayer] = useState<Player>(
    Math.random() < 0.5 ? "X" : "O"
  );
  const [winner, setWinner] = useState<Player>(null);
  const [tiles, setTiles] = useState<Player[]>(Array(9).fill(null));
  const [gameMode] = useState(params.gameMode);
  const [gameStatus, setGameStatus] = useState<GameStatus>(null);
  const [counter, setCounter] = useState({ x: 0, o: 0, d: 0 });
  const [firstPlayer, setFirstPlayer] = useState<Player>(null);

  useEffect(() => {
    gameMode !== "aalu" && gameMode !== "kalu" ? navigate("/error") : null;

    winner ? setGameStatus("ended") : null;
  }, [winner]);

  useEffect(() => {
    if (winner) {
      winner === "X"
        ? setCounter((prev) => {
            return { ...prev, x: prev.x + 1 };
          })
        : winner === "O"
        ? setCounter((prev) => {
            return { ...prev, o: prev.o + 1 };
          })
        : winner === "draw"
        ? setCounter((prev) => {
            return { ...prev, d: prev.d + 1 };
          })
        : null;
    }

    if (gameStatus === "playing") {
      setFirstPlayer(currentPlayer);
    }
  }, [gameStatus]);

  return (
    <>
      <div
        className={`w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 sm:w-[400px]`}
      >
        <Header
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          winner={winner}
          setTiles={setTiles}
          setWinner={setWinner}
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          firstPlayer={firstPlayer}
          gameMode={gameMode}
        />
        <Board
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          winner={winner}
          setWinner={setWinner}
          tiles={tiles}
          setTiles={setTiles}
          gameMode={gameMode}
          gameStatus={gameStatus}
          firstPlayer={firstPlayer}
        />
        <Footer
          setTiles={setTiles}
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          setWinner={setWinner}
          counter={counter}
          gameMode={gameMode}
        />
      </div>
    </>
  );
}
export default Local;
