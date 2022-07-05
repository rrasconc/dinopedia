import "./App.css";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <main className="App flex flex-1 flex-col items-center bg-zinc-100">
      <nav className="flex items-center justify-between p-5 mt-2 w-11/12 h-12">
        <Link to={"/"}>home</Link>
      </nav>
      <section className="p-4 w-full">
        <Outlet />
      </section>
    </main>
  );
}

export default App;
