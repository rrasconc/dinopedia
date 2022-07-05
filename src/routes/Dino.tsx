import { useParams } from "react-router-dom";

export function Dino() {
  const params = useParams();

  return <div>{params.dinoName}</div>;
}
