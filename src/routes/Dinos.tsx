import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Dinos() {
  const [dinos, setDinos] = useState([]);

  const fetchDinos = async () => {
    const response = await fetch("/api/category/all/");
    const data = await response.json();
    setDinos(data);
  };

  useEffect(() => {
    fetchDinos();
  }, []);
  return (
    <div>
      {dinos.map((dino) => (
        <nav key={dino}>
          <Link to={`dino/${dino}`}>{dino}</Link>
        </nav>
      ))}
    </div>
  );
}
