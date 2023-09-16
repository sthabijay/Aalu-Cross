import { Player } from "../pages/Local";
import checkBoard from "./checkBoard";

const checkBoard_KaluMode = (boxes: Player[], firstPlayer: Player) => {
  const winner = checkBoard(boxes);

  if (winner === "draw") {
    return firstPlayer;
  }

  if (winner) {
    return winner === "X" ? "O" : "X";
  }

  return null;
};

export default checkBoard_KaluMode;
