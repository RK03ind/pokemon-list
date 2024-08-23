/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../../components/PokemonCard";
import "./PokemonList.css";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPokemons, setCurrentPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(1302 / 20));
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 20;

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
      }, 500); // 500ms delay to test loading animation
    };

    fetchPokemons();
  }, [currentPage]);

  useEffect(() => {
    if (search) {
      const fetchPokemon = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${search.trim().toLowerCase()}`
          );
          setCurrentPokemons([response.data]);
        } catch (err) {
          const filteredPokemons = pokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase())
          );
          setCurrentPokemons(filteredPokemons); // No direct pokemon found list filtered
        }
        setLoading(false);
      };

      fetchPokemon();
    } else {
      setCurrentPokemons(pokemons);
    }
  }, [search, pokemons]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

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

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokémon by name or ID..."
        onChange={handleSearch}
        value={search}
      />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="pokemon-list">
          {currentPokemons.length != 0 ? (
            currentPokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
          ) : (
            <h2>No valid matches found :(</h2>
          )}
        </div>
      )}
      {!search && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
