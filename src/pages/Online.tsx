import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Board from "../components/Board";
import Header from "../components/Header";
import Footer from "../components/Footer";

// const ENDPOINT = "http://localhost:3000/";
const ENDPOINT = "https://aalu-cross-server.onrender.com/";

import { io } from "socket.io-client";
const socket = io(ENDPOINT);

export type Player = "X" | "O" | "draw" | null;
export type GameStatus = string | null;
export type WholePlayer = {
  nickName: string | null;
  plays?: Player;
  isHost?: boolean;
  points: number;
};
export type Counter = {
  p1: number;
  p2: number;
  draws: number;
};

function Online() {
  const params = useParams();
  const navigate = useNavigate();

  const [currentPlayer, setCurrentPlayer] = useState<Player>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [tiles, setTiles] = useState<Player[]>(Array(9).fill(null));
  const [gameStatus, setGameStatus] = useState<GameStatus>(null);
  const [gameMode] = useState(params.gameMode);
  const [firstPlayer, setFirstPlayer] = useState<Player>(null);
  const [counter, setCounter] = useState<Counter>({ p1: 0, p2: 0, draws: 0 });
  const [you, setYou] = useState<WholePlayer>({
    nickName: sessionStorage.getItem("nickName"),
    plays: null,
    isHost: false,
    points: 0,
  });
  const [opponent, setOpponent] = useState<WholePlayer>({
    nickName: null,
    points: 0,
  });

  const startGame = () => {
    socket.emit("START_GAME", { roomCode: sessionStorage.getItem("roomCode") });
  };

  const leaveRoom = () => {
    socket.emit("LEAVE_ROOM", {
      roomCode: sessionStorage.getItem("roomCode"),
      nickName: sessionStorage.getItem("nickName"),
    });

    sessionStorage.setItem("nickName", "");
    sessionStorage.setItem("roomCode", "");
    navigate("/");
  };

  useEffect(() => {
    !sessionStorage.getItem("nickName") ? navigate("/") : null;
    params.gameMode !== "aalu" && params.gameMode !== "kalu"
      ? navigate("/error")
      : null;

    fetch(ENDPOINT)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });

    if (!sessionStorage.getItem("roomCode"))
      socket.emit("CREATE_ROOM", {
        nickName: sessionStorage.getItem("nickName"),
        gameMode: params.gameMode,
      });
    else
      socket.emit("JOIN_ROOM", {
        nickName: sessionStorage.getItem("nickName"),
        roomCode: sessionStorage.getItem("roomCode"),
      });
  }, []);

  useEffect(() => {
    if (winner) {
      socket.emit("END_GAME", {
        roomCode: sessionStorage.getItem("roomCode"),
        winner,
      });
    }
  }, [winner]);

  useEffect(() => {
    if (gameStatus === "playing") {
      setFirstPlayer(currentPlayer);
    }

    if (gameStatus === "ended") {
      socket.emit("GET_POINTS", {
        winner,
        roomCode: sessionStorage.getItem("roomCode"),
      });

      // winner === "draw"
      //   ? setCounter((prev: Counter) => {
      //       console.log("draw");
      //       return { ...prev, draws: prev.draws + 1 };
      //     })
      //   : null;
      // winner === "X"
      //   ? setCounter((prev: Counter) => {
      //       console.log("x");
      //       return { ...prev, p1: prev.p1 + 1 };
      //     })
      //   : null;
      // winner === "O"
      //   ? setCounter((prev: Counter) => {
      //       console.log("o");
      //       return { ...prev, p2: prev.p2 + 1 };
      //     })
      //   : null;
    }
  }, [gameStatus]);

  useEffect(() => {
    socket.on("ERROR", ({ message }) => {
      navigate("/");
      console.log(message);
    });

    socket.on("RECEIVE_ROOM", ({ room }) => {
      sessionStorage.setItem("roomCode", room.roomCode);

      console.log(room.players[0].nickName, you.nickName);

      room.players[0].nickName === you.nickName
        ? setYou({ ...you, plays: "X", isHost: true })
        : setYou({ ...you, plays: "O", isHost: false });

      setCounter({ p1: 0, p2: 0, draws: 0 });

      socket.emit("INIT_ROOM", { roomCode: room.roomCode });
    });

    socket.on(
      "RECEIVE_CHANGES",
      ({ currPlayer, gameStatus, tiles, winner, room }) => {
        console.log(
          `RECEIVE_CHANGES" \n currPlayer ${currPlayer} \n gameStatus ${gameStatus} \n winner ${winner} \n ${you.plays}`
        );

        setGameStatus(gameStatus);

        if (gameStatus === "ready") {
          room.players[0].nickName === you.nickName
            ? setOpponent({ nickName: room.players[1].nickName, points: 0 })
            : setOpponent({ nickName: room.players[0].nickName, points: 0 });
          return;
        }

        if (gameStatus === "playing") {
          setCurrentPlayer(currPlayer);
          setTiles(tiles);
          setWinner(winner);
          return;
        }

        if (gameStatus === "ended") {
          console.log("RECEIVE_CHANGES ended");
          setWinner(winner);
        }
      }
    );

    socket.on("RECEIVE_POINTS", ({ points }) => {
      setCounter(points);
    });
  }, [socket]);

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
          you={you}
          opponent={opponent}
          leaveRoom={leaveRoom}
          gameMode={gameMode}
          firstPlayer={firstPlayer}
        />
        <Board
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          winner={winner}
          setWinner={setWinner}
          tiles={tiles}
          setTiles={setTiles}
          gameMode={params.gameMode}
          gameStatus={gameStatus}
          you={you}
          firstPlayer={firstPlayer}
          counter={counter}
          setCounter={setCounter}
        />
        <Footer
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          currentPlayer={currentPlayer}
          winner={winner}
          setWinner={setWinner}
          counter={counter}
          setCounter={setCounter}
          you={you}
          opponent={opponent}
          startGame={startGame}
          leaveRoom={leaveRoom}
        />
      </div>
    </>
  );
}
export default Online;
