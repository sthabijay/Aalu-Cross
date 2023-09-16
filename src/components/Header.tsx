import { GameStatus, Player, WholePlayer } from "../pages/Online";
import TextBox from "./TextBox";

type props = {
  currentPlayer: Player;
  setCurrentPlayer: Function;
  winner: string | null;
  setTiles: Function;
  setWinner: Function;
  gameStatus: GameStatus;
  setGameStatus: Function;
  you: WholePlayer;
  opponent: WholePlayer;
  leaveRoom: Function;
  gameMode: string | undefined;
  firstPlayer: Player;
};

function Header({
  currentPlayer,
  winner,
  gameStatus,
  you,
  opponent,
  gameMode,
  firstPlayer,
}: props) {
  return (
    <>
      {gameStatus && (
        <div className="w-full h-24 flex gap-4 justify-between text-5xl">
          {gameStatus === "waiting" || gameStatus === "ready" ? (
            <>
              <TextBox>
                <div className="text-3xl flex flex-col">
                  <small className="text-xl">
                    {gameStatus === "waiting"
                      ? "Waiting for opponent ..."
                      : "Opponent is here"}
                  </small>
                  <big>
                    Room : {sessionStorage.getItem("roomCode")?.toUpperCase()}
                  </big>
                </div>
              </TextBox>
            </>
          ) : (
            <>
              <TextBox>
                <div className="text-4xl flex flex-col">
                  {!you.isHost && gameStatus === "ended" && (
                    <small className="text-xl">Waiting for host</small>
                  )}
                  {gameMode === "kalu" && gameStatus === "playing" && (
                    <small className="text-xl">
                      {firstPlayer === you.plays
                        ? "Objective : Lose or Draw"
                        : "Objective : Lose"}
                    </small>
                  )}
                  <big>
                    {winner
                      ? winner === "draw"
                        ? `Draw`
                        : `${
                            winner === you.plays
                              ? you.nickName
                              : opponent.nickName
                          } won`
                      : `It's ${
                          currentPlayer === you.plays
                            ? "your"
                            : opponent.nickName
                        } turn`}
                  </big>
                </div>
              </TextBox>
            </>
          )}
        </div>
      )}
    </>
  );
}
export default Header;
