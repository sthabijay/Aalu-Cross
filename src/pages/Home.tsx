import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogBox from "../components/DialogBox";
import Button from "../components/Button";

// const ENDPOINT = "http://localhost:3000/";
const ENDPOINT = "https://aalu-cross-server.onrender.com/";

function Home() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<"local" | "online">("local");
  const [dialogBoxVisible, setDialogBoxVisible] = useState(false);
  const [gameMode, setGameMode] = useState("");
  const [isOnline, setIsOnline] = useState(false);

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

  useEffect(() => {
    sessionStorage.setItem("nickName", "");
    sessionStorage.setItem("roomCode", "");

    fetch(ENDPOINT)
      .then((res) => {
        console.log({ res });
        setIsOnline(true);
        setGameState("online");
      })
      .catch((err) => {
        console.log(err);
        setIsOnline(false);
        setGameState("local");
      });

    const polling = setInterval(() => {
      fetch(ENDPOINT)
        .then((res) => {
          console.log({ res });
          setIsOnline(true);
        })
        .catch((err) => {
          console.log(err);
          setIsOnline(false);
        });
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
        <div
          className={`sm:w-[400px] w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 font-display text-5xl`}
        >
          <div className="w-full h-[216px] flex flex-col justify-evenly gap-4">
            <Button onClick={() => handleRequests("aalu")}>
              Play Aalu Cross
            </Button>
            <Button onClick={() => handleRequests("kalu")}>
              Play Kalu Brush
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
      )}
    </>
  );
}
export default Home;
