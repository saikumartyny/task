import { BrowserRouter, Route, Routes } from "react-router-dom";
import DataDetails from "./SpellsDetails";
import Spells from "./Spells";
import Favourites from "./Favourites";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Spells />} />
        <Route path={"/favourites"} element={<Favourites />} />
        <Route path="/:id" element={<DataDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
