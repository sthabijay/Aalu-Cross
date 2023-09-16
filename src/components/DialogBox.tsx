import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";

type props = {
  setVisible: Function;
  gameMode: string;
};

function DialogBox({ setVisible, gameMode }: props) {
  const [nickName, setNickName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [field, setField] = useState("");
  const navigate = useNavigate();

  const handleForm = (e: any) => {
    e.preventDefault();

    if (!nickName) {
      setNickName(field);
      setField("");
      return;
    }

    if (!roomCode) {
      setRoomCode(field);
      setField("");
      return;
    }
  };

  useEffect(() => {
    if (nickName && roomCode) {
      sessionStorage.setItem("nickName", nickName);
      gameMode === "aalu"
        ? sessionStorage.setItem("roomCode", roomCode.toUpperCase())
        : sessionStorage.setItem("roomCode", roomCode.toLowerCase());

      navigate(`/online/${gameMode}`);
      setVisible(false);
    }
  }, [nickName, roomCode]);

  const createRoom = () => {
    sessionStorage.setItem("nickName", nickName);
    gameMode === "aalu"
      ? sessionStorage.setItem("roomCode", roomCode.toUpperCase())
      : sessionStorage.setItem("roomCode", roomCode.toLowerCase());

    navigate(`/online/${gameMode}`);
    setVisible(false);
  };

  return (
    <>
      <div
        className={`sm:w-[400px] w-[90%] bg-gradient-to-tr from-green-500 to-blue-500 bg-clip-text text-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 font-display gap-4 text-4xl p-4 flex flex-col items-center text-center rounded-md`}
      >
        <form className="flex flex-col gap-2" onSubmit={(e) => handleForm(e)}>
          <label>
            {!nickName
              ? "Enter a Nickname"
              : !roomCode
              ? "Enter a Room Code"
              : ""}
          </label>

          <div className="h-[80px] bg-gradient-to-tr from-green-500 to-blue-500 p-1 rounded-md focus-within:hue-rotate-30 focus-within:scale-105 transition-all">
            <div className="bg-white h-full rounded-md">
              <input
                type="text"
                className="w-full h-full bg-gradient-to-tr from-green-500 to-blue-500 bg-clip-text text-transparent rounded-md text-center outline-none"
                onChange={(e) =>
                  nickName
                    ? setField(e.target.value.toUpperCase())
                    : setField(e.target.value)
                }
                value={field}
              ></input>
            </div>
          </div>

          <div className="w-full h-[80px] text-4xl">
            <Button onClick={(e) => handleForm(e)} selected type="submit">
              Enter
            </Button>
          </div>
        </form>

        {nickName ? (
          <>
            <div>OR</div>
            <div className="w-full h-[80px] text-4xl">
              <Button onClick={createRoom}>Create Room</Button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
export default DialogBox;
