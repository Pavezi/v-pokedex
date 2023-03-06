<template>
  <div class="page">
    <div class="header">
      <input class="search-input" v-model="search" type="text" placeholder="Search for Pokemon" />
      <button class="search-button" @click="searchPokemon()">Search</button>
    </div>
    <div>
      <div>
        <select v-model="selectedType" @change="filterByType">
          <option value="">All Types</option>
          <option v-for="type in elementTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
        <button class="filter-button" @click="filterByType">Filter</button>
      </div>
    </div>
    <v-container fluid>
      <v-row class="pokemon-row">
        <v-card class="pokemon-card" v-for="(pokemon, index) in pokemons" :key="index" :style="{ backgroundColor: getTypeColor(pokemon.types[0]) }" @click="selectPokemon(pokemon)">
          <div class="pokemon-image">
            <img :src="pokemon.image" :alt="pokemon.name" />
          </div>
          <div class="pokemon-details">
            <h3>{{ pokemon.name }}</h3>
            <ul>
              <li v-for="type in pokemon.types" :key="type">{{ type }}</li>
            </ul>
            <p>Height: {{ pokemon.height }}</p>
            <p>Weight: {{ pokemon.weight }}</p>
            <p>Sex: {{ pokemon.sex }}</p>
          </div>
        </v-card>
      </v-row>
    </v-container>
    <div>
      <div v-if="next" class="Next20">
        <button class="search-button" @click="loadNext()">Next</button>
      </div>
      <div class="GoBack">
        <button class="search-button" @click="goBack()">Go Back</button>
      </div>
    </div>
  </div>
</template>

<style>
.page {
  color: #222222;
  background-color: #f5f5f5;
}

button.search-button {
  background-color: #42b983;
  color: white;
  border-radius: 20px;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  margin-left: 10px;
}
button.filter-button {
  background-color: #79bd05;
  color: white;
  border-radius: 20px;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
}

.Next20 {
  margin: 1.5% 2.5%;
  justify-content: center;
  align-self: botown;
  color: #2c5044;
  font-weight: bold;
}
.pokemon-card {
  width: 20%;
  margin: 0.5% 1.5%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
.pokemon-row {
  justify-content: center;
}
select {
  margin: 0.5% 1.5%;
  border-radius: 5px;
  padding: 8px;
  background-color: #fff;
  border: 1px solid #ccc;
  color: #42b983;
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
  cursor: pointer;
}

/* Style the arrow icon */
select::after {
  content: "\25BC";
  position: absolute;
  top: 12px;
  right: 10px;
  font-size: 16px;
  color: white;
  pointer-events: none;
}

/* Remove default arrow icon in IE 10 and earlier */
select::-ms-expand {
  display: none;
}

.search-input {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 20px;
  color: #333;
  font-size: 16px;
  padding: 10px 20px;
  width: 100%;
  max-width: 400px;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import Pokemon from "./IPokemon"
import { elementTypes, ElementType, typeColors } from "./constants";

export default defineComponent({
  name: "PokemonHome",

  data() {
    return {
      pokemons: [] as Pokemon[],
      selectedType: "",
      selectedPokemon: null as Pokemon | null,
      search: "",
      url: "",
      nextUrl: "",
      previousUrl: "",
      next: false,
      elementTypes,
    };
  },
  async mounted() {
    await this.loadPokemons("https://pokeapi.co/api/v2/pokemon?limit=20");
  },
  methods: {
    handlePokemonSelected(pokemon: Pokemon) {
      this.selectedPokemon = pokemon;
    },
    async loadPokemons(url: string) {
      if (this.url) {
        this.previousUrl = this.url;
      }
      try {
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
        if (this.selectedType) {
          this.pokemons = newPokemons.filter((pokemon) =>
            pokemon.types.includes(this.selectedType)
          );
        } else {
          this.pokemons = newPokemons;
        }
        this.url = data.response
        this.nextUrl = data.next;
        this.next = !!data.next;
      } catch (error) {
        console.error(error);
      }
    },

    async loadNext() {
      if (this.nextUrl) {
        await this.loadPokemons(this.nextUrl);
      }
    },
    async goBack() {
      await this.loadPokemons(this.previousUrl);
      console.log(this.previousUrl);
      if (this.previousUrl) {
        await this.loadPokemons(this.previousUrl);
      }
    },
    getTypeColor(type: string): string {
      return typeColors[type];
    },

    async filterByType() {
      if (this.selectedType) {
        const filteredUrl = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0&type=${this.selectedType}`;
        await this.loadPokemons(filteredUrl);
      } else {
        await this.loadPokemons("");
      }
    },

    selectPokemon(pokemon: Pokemon) {
      this.$emit("pokemonSelected", pokemon);
    },

    async searchPokemon() {
      if (this.search) {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?limit=2000`
          );
          const data = response.data;
      const filteredData = data.filter(
        (pokemon: Pokemon) => pokemon.name.includes(this.search.toLowerCase())
      );
      this.pokemons = filteredData;
          console.log(filteredData);

          this.next = false;
        } catch (error) {
          console.error(error);
        }
      } else {
        await this.loadPokemons("https://pokeapi.co/api/v2/pokemon?limit=20");
      }
    },
  },
});
</script>
