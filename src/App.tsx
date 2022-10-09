import { BrowserRouter, Route, Routes } from "react-router-dom";
import DataDetails from "./components/SpellsDetails";
import Spells from "./components/Spells";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Spells />} />
        <Route path="/:id" element={<DataDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
