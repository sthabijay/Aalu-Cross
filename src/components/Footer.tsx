import { useEffect, useState } from "react";

import { Counter, GameStatus, Player, WholePlayer } from "../pages/Online";
import Button from "./Button";
import TextBox from "./TextBox";

import { io } from "socket.io-client";
const socket = io("https://aalu-cross-server.onrender.com/");
// const socket = io("http://localhost:3000/");

import leave from "../assets/leave.svg";
import replay from "../assets/refresh.svg";

type props = {
  gameStatus: GameStatus;
  setGameStatus: Function;
  currentPlayer: Player;
  winner: string | null;
  setWinner: Function;
  counter: Counter;
  you: WholePlayer;
  opponent: WholePlayer;
  startGame: Function;
  leaveRoom: Function;
  setCounter: Function;
};

const time = 30000;
const minus = 100;

function Footer({
  gameStatus,
  currentPlayer,
  setWinner,
  counter,
  you,
  opponent,
  startGame,
  leaveRoom,
}: props) {
  const [timeX, setTimeX] = useState(time);
  const [timeO, setTimeO] = useState(time);

  useEffect(() => {
    let timerX: any;
    let timerO: any;

    if (gameStatus === "playing") {
      timerX = setInterval(() => {
        setTimeX((prev) => prev - minus);
      }, 100);

      timerO = setInterval(() => {
        setTimeO((prev) => prev - minus);
      }, 100);
    }

    if (!gameStatus || gameStatus === "ended") {
      setTimeX(time);
      setTimeO(time);
    }

    if (timeX <= 0) {
      setWinner("O");
      // setCounter((prev: Counter) => {
      //   console.log("o");
      //   return { ...prev, p2: prev.p2 + 1 };
      // });
      clearInterval(timerX);
    }

    if (timeO <= 0) {
      setWinner("X");
      // setCounter((prev: Counter) => {
      //   console.log("x");
      //   return { ...prev, p1: prev.p1 + 1 };
      // });
      clearInterval(timerO);
    }

    if (currentPlayer === "X") {
      clearInterval(timerO);
    } else {
      clearInterval(timerX);
    }

    return () => {
      clearInterval(timerX);
      clearInterval(timerO);
    };
  }, [currentPlayer, timeX, timeO, gameStatus]);

  return (
    <>
      <div className="w-full h-[96px] flex gap-4 justify-between">
        {(gameStatus === "waiting" || gameStatus === "ready") && (
          <>
            <div className="w-full text-5xl">
              <Button
                onClick={() => startGame()}
                disabled={gameStatus === "ready" && you.isHost ? false : true}
              >
                {you.isHost ? (
                  "Start"
                ) : (
                  <div className="text-3xl">Waiting for host to start</div>
                )}
              </Button>
            </div>
          </>
        )}

        {gameStatus === "playing" && (
          <TextBox>
            <div className="w-full flex flex-row gap-11 justify-evenly p-4 text-5xl">
              <div className="w-full flex flex-col">
                <div className="w-full flex justify-evenly items-center">
                  <big className="w-full">
                    X{/* {you.isHost ? you.nickName : opponent.nickName} */}
                  </big>
                  <small className="w-full">
                    {timeX > 10000 ? Math.floor(timeX / 1000) : timeX / 1000}s
                  </small>
                </div>
                <div
                  className={`h-1 w-full origin-left rounded transition-colors duration-1000 ${
                    timeX < 0.2 * time
                      ? "bg-red-500"
                      : timeX < 0.4 * time
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                  style={{ transform: `scaleX(${timeX / (time / 100)}%)` }}
                ></div>
              </div>

              <div className="w-full flex flex-col">
                <div className="w-full flex justify-evenly items-center">
                  <small className="w-full">
                    {timeO > 10000 ? Math.floor(timeO / 1000) : timeO / 1000}s
                  </small>
                  <big className="w-full">
                    O{/* {you.isHost ? opponent.nickName : you.nickName} */}
                  </big>
                </div>
                <div
                  className={`h-1 w-full -bottom-2 origin-right rounded transition-colors duration-1000 ${
                    timeO < 0.2 * time
                      ? "bg-red-500"
                      : timeO < 0.4 * time
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                  style={{ transform: `scaleX(${timeO / (time / 100)}%)` }}
                ></div>
              </div>
            </div>
          </TextBox>
        )}

        {gameStatus === "ended" && (
          <>
            <TextBox>
              <div className="w-full flex flex-row justify-evenly text-5xl">
                <div className="flex flex-col">
                  <label className="text-2xl">{counter.p1}</label>
                  <small>{you.isHost ? you.nickName : opponent.nickName}</small>
                </div>
                <div className="flex flex-col">
                  <label className="text-2xl">{counter.p2}</label>
                  <small>
                    {!you.isHost ? you.nickName : opponent.nickName}
                  </small>
                </div>
                <div className="flex flex-col">
                  <label className="text-2xl">{counter.draws}</label>
                  <small>Draw</small>
                </div>
              </div>
            </TextBox>
          </>
        )}
      </div>
      {gameStatus != "playing" && (
        <div className="flex w-full h-[88px] justify-center gap-4  ">
          <button
            className={`bg-gradient-to-r from-green-500 to-blue-500 bg-inherit h-full w-full rounded-md p-1 flex justify-center items-center hover:scale-105 hover:hue-rotate-30 active:scale-95 transition-all disabled:opacity-25 disabled:scale-100 disabled:hue-rotate-0`}
            onClick={() => leaveRoom()}
          >
            <img
              src={leave}
              alt="refresh icon"
              className="h-full w-full p-4 invert rotate-180"
            />
          </button>
          <button
            onClick={() =>
              socket.emit("RESET_BOARD", {
                roomCode: sessionStorage.getItem("roomCode"),
              })
            }
            disabled={you.isHost ? false : true}
            className={`bg-gradient-to-r from-green-500 to-blue-500 h-full w-full rounded-md p-1 flex justify-center items-center hover:scale-105 hover:hue-rotate-30 active:scale-95 transition-all disabled:opacity-25 disabled:scale-100 disabled:hue-rotate-0 ${
              gameStatus === "waiting" || gameStatus === "ready" ? "hidden" : ""
            }`}
          >
            <img
              src={replay}
              alt="refresh icon"
              className="h-full w-full p-4 invert"
            />
          </button>
        </div>
      )}
    </>
  );
}
export default Footer;
