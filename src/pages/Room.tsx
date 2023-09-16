import { useParams } from "react-router-dom";

function Room() {
  const params = useParams();

  return <div>{params.roomId}</div>;
}
export default Room;
