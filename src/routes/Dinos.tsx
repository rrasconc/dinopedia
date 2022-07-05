import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { dinosaur } from "../types";

export function Dinos() {
  const [homeDinos, setHomeDinos] = useState<dinosaur[]>([]);
  const [dinosAll, setDinosAll] = useState<dinosaur[]>([]);

  const fetchDinos = async () => {
    const response = await fetch("/api/category/all/");
    const dinosAll = await response.json();
    setDinosAll(dinosAll);

    const dinosRandom = dinosAll.sort(() => 0.5 - Math.random()).slice(0, 8);

    const dinoList = await Promise.all(
      dinosRandom.map(async (dino: string) => {
        const dinoRes = await fetch(`api/dinosaur/${dino}`);
        const dinoData = await dinoRes.json();
        return dinoData;
      })
    );
    setHomeDinos(dinoList);
  };

  useEffect(() => {
    fetchDinos();
  }, []);

  return (
    <div className="mb-12">
      <section className="flex flex-col items-center justify-center">
        <h1 className="text-7xl mt-32 text-slate-700 font-bold">dinopedia</h1>
        <form className="flex items-center w-10/12 my-24 py-2 px-4 rounded-lg border-2 bg-zinc-50 focus:border-slate-400">
          <FontAwesomeIcon
            className="mr-4 text-slate-400"
            icon={faMagnifyingGlass}
          />
          <input
            className="w-full text-xl text-slate-700 bg-zinc-50 focus:outline-none"
            type="text"
            placeholder={`Search for one of the ${dinosAll.length} dinosaurs`}
          />
        </form>
      </section>
      <section className="flex flex-wrap justify-center">
        {homeDinos.map((dino) => (
          <div className="flex flex-col items-center hover:scale-105 transition delay-75 ease-out duration-200">
            <h1 className=" bg-slate-200 rounded-md p-2 mb-2 w-96 text-center ">
              {dino.name}
            </h1>
            <Link
              className=" border-2 rounded-md w-96 h-96 py-2 mx-4 mb-4"
              key={dino.name}
              to={`dino/${dino}`}
            >
              <img
                loading="lazy"
                className="h-full w-full object-fit"
                src={dino.pics[0].url}
              />
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
