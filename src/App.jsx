import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonList from "./pages/PokemonList/PokemonList";
import PokemonDetail from "./pages/PokemonDetail/PokemonDetail";
import "./App.css";
const App = () => {
  return (
    <div className="App">
      <h1>Pokémon List</h1>
      <Router>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
