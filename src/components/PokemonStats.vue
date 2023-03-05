<template>
  <div>
    <h2>Stats:</h2>
    <div>HP: {{ pokemon.stats.hp }}</div>
    <div>Attack: {{ pokemon.stats.attack }}</div>
    <div>Defense: {{ pokemon.stats.defense }}</div>
    <div>Special Attack: {{ pokemon.stats.specialAttack }}</div>
    <div>Special Defense: {{ pokemon.stats.specialDefense }}</div>
    <div>Speed: {{ pokemon.stats.speed }}</div>
  </div>
</template>

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
