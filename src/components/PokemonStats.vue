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
        <v-card class="pokemon-card" v-for="(pokemon, index) in filteredPokemons" :key="index" :style="{ backgroundColor: getTypeColor(pokemon.types[0]) }">
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
           <div>
    <h2>Stats:</h2>
    <div>HP: {{ pokemon.stats.hp }}</div>
    <div>Attack: {{ pokemon.stats.attack }}</div>
    <div>Defense: {{ pokemon.stats.defense }}</div>
    <div>Special Attack: {{ pokemon.stats.specialAttack }}</div>
    <div>Special Defense: {{ pokemon.stats.specialDefense }}</div>
    <div>Speed: {{ pokemon.stats.speed }}</div>
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
import { defineComponent, PropType } from "vue";
import Pokemon from "./IPokemon";

export default defineComponent({
  name: "PokemonStats",
  props: {
    pokemon: {
      type: Object as PropType<Pokemon>,
      required: true,
    },
  },
});
</script>
