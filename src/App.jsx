import { useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      searchPokemon();
    }
  };
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [PokeInfo, setPokeInfo] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });
  const searchPokemon = () => {
    Axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    ).then((response) => {
      setPokeInfo({
        name: pokemonName,
        species: response.data.species.name,
        img: response.data.sprites.front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name,
      });
      setPokemonChosen(true);
    });
  };
  return (
    <div className="App">
      <div className="Title">
        <h1>Hello Pokemon</h1>
        <input
          type="text"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
          onKeyPress={handleEnter}
        ></input>
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className="DisplayPokemon">
        {!pokemonChosen ? (
          <h1>Choose your Pokemon</h1>
        ) : (
          <>
            <h1>{PokeInfo.name}</h1>
            <img src={PokeInfo.img} />
            <h3>species :{PokeInfo.species}</h3>
            <h3>Type : {PokeInfo.type}</h3>
            <h4>Hp : {PokeInfo.hp}</h4>
            <h4>attack : {PokeInfo.attack}</h4>
            <h4>defense : {PokeInfo.defense}</h4>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
