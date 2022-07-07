import { useEffect, useState, useMemo } from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { dinosaur } from "../types";
import imgUrl from "../assets/dino.png";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function Dinos() {
  const [homeDinos, setHomeDinos] = useState<dinosaur[]>([]);
  const [dinosAll, setDinosAll] = useState<string[]>([]);
  const [showDinosAll, setShowDinosAll] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("A");
  const [searchValue, setSearchValue] = useState<string>("");

  const searchList = useMemo(
    () =>
      dinosAll.filter((dinoName) =>
        dinoName.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [searchValue]
  );

  const filteredDinos = useMemo(
    () => dinosAll.filter((dino) => dino.startsWith(selectedFilter)),
    [selectedFilter]
  );

  const fetchDinos = async () => {
    const response = await fetch("/api/category/all/");
    const dinosRes = await response.json();
    setDinosAll(dinosRes);

    const dinosRandom = [...dinosRes]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

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
      <section
        style={{
          height: "70vh",
        }}
        className="flex flex-col mb-12 items-center bg-slate-200"
      >
        <img className="h-36 mt-32 drop-shadow-lg" src={imgUrl} />
        <h1 className="text-7xl  text-slate-700 font-bold">dinopedia</h1>
        <form
          className={`flex ${
            searchValue &&
            searchList.length > 0 &&
            "border-b-0 rounded-b-none hover:border-slate-300"
          } items-center w-11/12 md:w-8/12 mt-12 py-2 px-4 border-t-2 border-x-2 border-b-2 rounded-b-lg hover:border-slate-700 rounded-t-lg border-slate-300 bg-zinc-100`}
        >
          <FontAwesomeIcon
            className="mr-4 text-slate-400"
            icon={faMagnifyingGlass}
          />
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder={`Search for one of the ${dinosAll.length} dinosaurs`}
            className="w-full text-xl  text-slate-700 bg-zinc-100 focus:outline-none"
          />
        </form>
        {searchValue && searchList.length > 0 && (
          <div className="flex flex-col overflow-auto overflow-x-hidden shadow-xl bg-zinc-100 border-x-2 border-b-2 border-slate-300  rounded-b-lg relative z-10 w-11/12 md:w-8/12">
            {searchList.map((dino) => (
              <span
                onClick={(e) => {
                  setSearchValue(dino);
                }}
                className="w-full text-left text-xl text-slate-700 px-4 py-2 border-t-2 border-slate-200 hover:cursor-pointer hover:bg-gray-200"
              >
                {dino}
              </span>
            ))}
          </div>
        )}
      </section>
      <section className="flex flex-col justify-center items-center my-12">
        <div className="flex flex-wrap justify-center my-12">
          {homeDinos.map((dino) => (
            <div
              key={dino.name}
              className="flex flex-col items-center group hover:scale-105 transition delay-75 ease-out duration-200"
            >
              <h1 className=" bg-slate-200 rounded-md p-2 mb-2 w-72 text-center ">
                {dino.name}
              </h1>
              <Link
                className=" border-2 rounded-md w-72 h-72 py-2 mx-4 mb-4 group-hover:border-slate-700"
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
        </div>
        {!showDinosAll ? (
          <span
            onClick={() => {
              setShowDinosAll(!showDinosAll);
            }}
            className={`flex flex-col items-center mb-12 text-xl font-bold border-2 border-slate-300 text-slate-700 hover:border-slate-700 hover:cursor-pointer hover:scale-105 transition delay-75 ease-out duration-200 bg-slate-50 p-2 rounded-md animate-bounce  drop-shadow-2xl `}
          >
            show more
          </span>
        ) : (
          <select
            value={selectedFilter}
            onChange={(e) => {
              setSelectedFilter(e.target.value);
            }}
            name="select"
            className={`mb-12 w-42 border-2 border-slate-300 font-bold text-slate-700 hover:border-slate-700 hover:cursor-pointer bg-slate-50 p-2 rounded-md`}
          >
            <option value="" selected disabled>
              Filter by letter{" "}
            </option>
            {alphabet.split("").map((letter) => (
              <option value={letter}>{letter}</option>
            ))}
          </select>
        )}
        <div className="flex flex-wrap justify-center items-center w-10/12">
          {showDinosAll &&
            filteredDinos.map((dino) => (
              <h1 className=" bg-slate-200 rounded-md p-2 m-2 text-center ">
                {dino}
              </h1>
            ))}
        </div>
      </section>
    </div>
  );
}
