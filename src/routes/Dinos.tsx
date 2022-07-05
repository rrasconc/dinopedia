import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dinosaur } from "../types";

export function Dinos() {
  const [dinos, setDinos] = useState<dinosaur[]>([]);

  const fetchDinos = async () => {
    const response = await fetch("/api/category/all/");
    const dinosAll = await response.json();

    const dinosRandom = dinosAll.sort(() => 0.5 - Math.random()).slice(0, 6);

    const dinoList = await Promise.all(
      dinosRandom.map(async (dino: string) => {
        const dinoRes = await fetch(`api/dinosaur/${dino}`);
        const dinoData = await dinoRes.json();
        return dinoData;
      })
    );
    setDinos(dinoList);
  };

  useEffect(() => {
    fetchDinos();
  }, []);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-center h-72">
        <h1 className="text-6xl text-slate-700 font-bold">dinopedia</h1>
      </div>
      <div className="flex flex-wrap justify-center">
        {dinos.map((dino) => (
          <Link
            className=" border-2 rounded-md w-96 h-96 py-2 mx-4 my-6 hover:scale-105 transition delay-75 ease-out duration-200"
            key={dino.name}
            to={`dino/${dino}`}
          >
            <h1 className="text-center ">{dino.name}</h1>
            <img
              loading="lazy"
              className="h-full w-full object-fit"
              src={dino.pics[0].url}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
