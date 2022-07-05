import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <main className="App">
      <h1 className="text-red-300 text-6xl">dinopedia</h1>
      <Outlet />
    </main>
  );
}

export default App;
