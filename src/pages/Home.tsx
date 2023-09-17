import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogBox from "../components/DialogBox";
import Button from "../components/Button";

const ENDPOINT = "http://localhost:3000/";
// const ENDPOINT = "https://aalu-cross-server.onrender.com/";

function Home() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<"local" | "online">("local");
  const [dialogBoxVisible, setDialogBoxVisible] = useState(false);
  const [gameMode, setGameMode] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [roomCount, setRoomCount] = useState<number>(0);

  const handleRequests = (gameMode: string) => {
    if (gameState === "local") {
      navigate(`/local/${gameMode}`);
      return;
    }

    if (gameState === "online") {
      setGameMode(gameMode);
      setDialogBoxVisible(true);
    }
  };

  const pingServer = () => {
    fetch(ENDPOINT)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsOnline(true);
        setGameState("online");
        setRoomCount(data.rooms);
      })
      .catch((err) => {
        setIsOnline(false);
        setGameState("local");
        console.log(err);
      });
  };

  useEffect(() => {
    sessionStorage.setItem("nickName", "");
    sessionStorage.setItem("roomCode", "");

    pingServer();

    const polling = setInterval(() => {
      pingServer();
    }, 20000);

    return () => {
      clearInterval(polling);
    };
  }, []);

  return (
    <>
      {dialogBoxVisible ? (
        <DialogBox setVisible={setDialogBoxVisible} gameMode={gameMode} />
      ) : (
        <>
          <div
            className={`sm:w-[400px] w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 font-display text-5xl`}
          >
            <div className="w-full h-[216px] flex flex-col justify-evenly gap-4">
              <Button onClick={() => handleRequests("aalu")}>
                Play Aalu Cross
              </Button>
              <Button onClick={() => handleRequests("kalu")}>
                Play Talu Brush
              </Button>
            </div>

            <div className="w-full h-[100px] flex gap-3">
              <Button
                selected={gameState === "online" ? true : false}
                onClick={() => setGameState("online")}
                disabled={!isOnline}
              >
                Online
              </Button>
              <Button
                selected={gameState === "local" ? true : false}
                onClick={() => setGameState("local")}
              >
                Local
              </Button>
            </div>
          </div>

          <div className="fixed bottom-0 w-full h-[80px] flex justify-center items-cente">
            {isOnline ? (
              <>
                <div className="flex justify-center items-center gap-3">
                  <div className="bg-green-500 h-4 aspect-square rounded-full blur-sm brightness-125"></div>

                  <span className="bg-gradient-to-tr from-green-500 to-blue-500  bg-clip-text text-transparent bottom-0 h-full flex flex-col justify-center items-center font-display text-xl">
                    {roomCount > 0
                      ? roomCount < 2
                        ? `${roomCount} Room Online`
                        : `${roomCount} Rooms Online`
                      : `Server online`}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="text-gray-500 bottom-0 h-full flex justify-center items-center font-display text-xl gap-2">
                  <div className="bg-gradient-to-r from-gray-500 to-black  to-80% h-6 aspect-square p-1 rounded-full animate-spin">
                    <div className="bg-black h-full w-full rounded-full"></div>
                  </div>
                  <span>Server spinning up</span>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
export default Home;
