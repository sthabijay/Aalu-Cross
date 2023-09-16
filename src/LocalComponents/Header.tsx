import { GameStatus, Player } from "../pages/Local";

import TextBox from "./TextBox";

type props = {
  currentPlayer: Player;
  setCurrentPlayer: Function;
  winner: Player;
  setTiles: Function;
  setWinner: Function;
  gameStatus: GameStatus;
  setGameStatus: Function;
  firstPlayer: Player;
  gameMode: string | undefined;
};

function Header({
  currentPlayer,
  winner,
  gameStatus,
  firstPlayer,
  gameMode,
}: props) {
  return (
    <>
      {gameStatus && (
        <div className="w-full h-24 flex gap-4 justify-between text-5xl">
          {gameMode === "kalu" && (
            <TextBox>
              <div className="flex flex-col text-3xl">
                {gameStatus === "playing" && (
                  <small className="text-xl">
                    {firstPlayer === currentPlayer
                      ? "Objective : Lose or Draw"
                      : "Objective : Lose"}
                  </small>
                )}

                <big className={`${gameStatus === "ended" ? "text-5xl" : ""}`}>
                  {winner
                    ? winner === "draw"
                      ? `Draw`
                      : `${winner} won`
                    : `It's ${currentPlayer === "X" ? "X" : "O"} turn`}
                </big>
              </div>
            </TextBox>
          )}

          {gameMode === "aalu" && (
            <TextBox>
              <div>
                {winner
                  ? winner === "draw"
                    ? `Draw`
                    : `${winner} won`
                  : `It's ${currentPlayer === "X" ? "X" : "O"} turn`}
              </div>
            </TextBox>
          )}
        </div>
      )}
    </>
  );
}
export default Header;
