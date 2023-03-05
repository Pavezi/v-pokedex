<template>
  <div>
    <PokemonHome v-if="!selectedPokemon" @pokemonSelected="showPokemonStats"/>
    <PokemonStats v-if="selectedPokemon" :pokemon="selectedPokemon" @goBack="goBack"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Pokemon from "../components/IPokemon";

// Components
import PokemonHome from "../components/PokemonsHome.vue";
import PokemonStats from "../components/PokemonStats.vue";

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
    },
    goBack() {
      this.selectedPokemon = null;
    },
  },
});
</script>
