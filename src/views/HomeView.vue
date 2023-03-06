<template>
  <div>
    <PokemonHome v-if="!selectedPokemon" @pokemonSelected="showPokemonStats"/>
    <PokemonStats v-if="selectedPokemon" :pokemon="selectedPokemon" @goBack="goBack"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Pokemon from "../interface/IPokemon";

// Components
import PokemonHome from "./PokemonsHome.vue";
import PokemonStats from "./PokemonStats.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    PokemonHome,
    PokemonStats,
  },

  data() {
    return {
      pokemons: [] ,
      selectedPokemon: null as Pokemon | null,
            pokemonsFiltered: [] as Pokemon[],

    };
  },
  computed: {
    filteredPokemons(): Pokemon[] {
      return this.selectedPokemon ? [this.selectedPokemon] : this.pokemons;
    }
  },
  methods: {
    showPokemonStats(pokemon: Pokemon) {
      this.selectedPokemon = pokemon;
      console.log(pokemon);
    },
    goBack() {
      this.selectedPokemon = null;
    },
  },
});
</script>
