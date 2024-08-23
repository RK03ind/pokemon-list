import { Link } from "react-router-dom";
import "./styles/PokemonCard.css";

const PokemonCard = ({ pokemon }) => {
  return (
    <Link to={`/pokemon/${pokemon.id}`} className="pokemon-card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
    </Link>
  );
};

export default PokemonCard;
