// pokemonUtils.ts
import axios from "axios";
import Pokemon from "../interface/IPokemon";

export async function loadPokemons(url: string): Promise<Pokemon[]> {
    const response = await axios.get(url);
    const data = response.data;
    const newPokemons: Pokemon[] = [];
    for (const pokemon of data.results) {
        const pokemonDataResponse = await axios.get(pokemon.url);
        const pokemonData = pokemonDataResponse.data;
        const statsResponse = await axios.get(pokemonData.stats[0].stat.url);
        const statsData = statsResponse.data;
        const newPokemon: Pokemon = {
            name: pokemonData.name,
            image: pokemonData.sprites.front_default,
            types: pokemonData.types.map((type: { type: { name: string } }) => type.type.name),
            height: pokemonData.height,
            weight: pokemonData.weight,
            sex: pokemonData.gender_rate === -1 ? "Genderless" :
                pokemonData.gender_rate >= 4 ? "Female" : "Male",
            stats: {
                hp: pokemonData.stats[0].base_stat,
                attack: pokemonData.stats[1].base_stat,
                defense: pokemonData.stats[2].base_stat,
                specialAttack: pokemonData.stats[3].base_stat,
                specialDefense: pokemonData.stats[4].base_stat,
                speed: pokemonData.stats[5].base_stat,
            }
        };
        newPokemons.push(newPokemon);
    }
    return newPokemons;
}

// You can define other helper methods here as well.
