<template>
  <div class="page">
    <Loader :is-loading="isLoading" />
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
        <v-card class="pokemon-card" v-for="(pokemon, index) in filteredPokemons" :key="index" :style="{ backgroundColor: getTypeColor(pokemon.types[0]) }" @click="selectPokemon(pokemon)">
          <div class="pokemon-image">
            <img :src="pokemon.image" :alt="pokemon.name" />
          </div>
          <div class="pokemon-details">
            <h3>{{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)  }}</h3>
            <ul>
              <li v-for="type in pokemon.types" :key="type" class="type-item">
                <img :src="getIcon(type)" alt="Type icon" />
                {{ type }}
              </li>

            </ul>
            <p>Height: {{ pokemon.height }}</p>
            <p>Weight: {{ pokemon.weight }}</p>
            <p>Sex: {{ pokemon.sex }}</p>
          </div>
        </v-card>
      </v-row>
      <div class="buttons">
        <div class="GoBack">
          <button class="goBack_next-button" @click="goBack()">Go Back</button>
        </div>
        <div v-if="next" class="Next20">
          <button class="goBack_next-button" @click="loadNext()">Next</button>
        </div>
      </div>
    </v-container>
  </div>
</template>

<style>
.page {
  color: #222222;
  background-color: #f5f5f5;
}
.type-item {
  list-style: none;
}
.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
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
.goBack_next-button {
  background-color: #42b983;
  color: white;
  border-radius: 20px;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
}
.GoBack {
  margin: 1.5% 2.5%;
  justify-content: center;
  align-self: botown;
  color: #2c5044;
  font-weight: bold;
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
import Pokemon from "../interface/IPokemon"
import { elementTypes, typeColors, elementIcon } from "../components/constants";
import Loader from "@/components/showLoader.vue";

export default defineComponent({
  name: "PokemonHome",
  components: {
    Loader,
  },
  data() {
    return {
      isLoading: true,
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
  computed: {
    filteredPokemons(): Pokemon[] {
      if (!this.search) {
        return this.pokemons;
      }
      return this.pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  async mounted() {
    await this.loadPokemons("https://pokeapi.co/api/v2/pokemon?limit=20");
    this.isLoading = false;
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
        this.previousUrl = data.previous;
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
      } else {
        await this.loadPokemons("https://pokeapi.co/api/v2/pokemon?limit=20");
      }
    },
    getTypeColor(type: string): string {
      return typeColors[type];
    },
    getIcon(type: string): string {
      return elementIcon[type];
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
            `https://pokeapi.co/api/v2/pokemon/${this.search}`
          );
          const data = response.data;
          const newPokemon: Pokemon = {
            name: data.name,
            image: data.sprites.front_default,
            types: data.types.map(
              (type: { type: { name: string } }) => type.type.name
            ),
            height: data.height,
            weight: data.weight,
            sex:
              data.gender_rate === -1
                ? "Genderless"
                : data.gender_rate >= 4
                  ? "Female"
                  : "Male",
            stats: {
              hp: data.stats[0].base_stat,
              attack: data.stats[1].base_stat,
              defense: data.stats[2].base_stat,
              specialAttack: data.stats[3].base_stat,
              specialDefense: data.stats[4].base_stat,
              speed: data.stats[5].base_stat,
            }
          };
          this.pokemons = [newPokemon];
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
