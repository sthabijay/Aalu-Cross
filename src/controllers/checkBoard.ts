import { Player } from "../pages/Local";

const checkBoard = (boxes: Player[]) => {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];

    if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
      return boxes[a];
    }
  }

  if (!boxes.filter((box) => !box).length) {
    return "draw";
  }

  return null;
};

export default checkBoard;
