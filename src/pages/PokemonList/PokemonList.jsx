import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../../components/PokemonCard";
import "./PokemonList.css";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 16;

  useEffect(() => {
    const fetchTotalCount = async () => {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=1"
      );
      const count = response.data.count;
      setTotalPages(Math.ceil(count / itemsPerPage));
    };

    fetchTotalCount();
  }, []);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      const offset = (currentPage - 1) * itemsPerPage;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`
      );
      const data = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokemonDetail = await axios.get(pokemon.url);
          return pokemonDetail.data;
        })
      );
      setTimeout(() => {
        setPokemons(data);
        setLoading(false);
      }, 650); // 650ms delay to test loading animation
    };

    fetchPokemons();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokémon..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="pokemon-list">
          {filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
