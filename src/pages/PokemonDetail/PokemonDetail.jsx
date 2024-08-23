import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PokemonDetail.css";

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setPokemon(response.data);
    };

    fetchPokemon();
  }, [id]);

  if (!pokemon) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="pokemon-detail-container">
      <h1>{pokemon.name}</h1>
      <div className="pokemon-detail-header">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <div className="pokemon-info">
          <p>
            <strong>ID:</strong> #{pokemon.id}
          </p>
          <p>
            <strong>Height:</strong> {pokemon.height / 10} m
          </p>
          <p>
            <strong>Weight:</strong> {pokemon.weight / 10} kg
          </p>
          <p>
            <strong>Types:</strong>{" "}
            {pokemon.types.map((type) => type.type.name).join(", ")}
          </p>
          <p>
            <strong>Base Experience:</strong> {pokemon.base_experience}
          </p>
        </div>
      </div>

      <div className="pokemon-stats">
        <h2>Base Stats</h2>
        <ul>
          {pokemon.stats.map((stat) => {
            const percentage = (stat.base_stat / 255) * 100;
            return (
              <li key={stat.stat.name}>
                <span className="stat-name">{stat.stat.name}</span>
                <span className="stat-value">{stat.base_stat}</span>
                <div className="stat-bar-background">
                  <div
                    className="stat-bar"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="pokemon-moves">
        <h2>Moves</h2>
        <ul>
          {pokemon.moves.slice(0, 10).map((move, index) => (
            <li key={index}>{move.move.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetail;
