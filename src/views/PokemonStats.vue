<template>
  <div id="page">
    <div :style="{ backgroundColor: getTypeColor(pokemon.types[0]) }" id="container">
      <div class="name-container">
      <h1 class="pokemon-name">{{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}</h1>
      <div class="element_icon">
        <img v-for="type in pokemon.types" :key="type" :src="getIcon(type)" alt="Type icon" />
      </div>
      </div>
      <div class="image-container" :style="{ backgroundColor: getTypeColor(pokemon.types[0]) }">
        <img id="pokemon-image" :src="pokemon.image" :alt="pokemon.name" />
      </div>
      <div class="content-container">
        <Radar :data="chartConfig" :options="chartOptions" />
        <div class="status-container">
          <div class="status-item">
            <div>Attack: {{ pokemon.stats.attack }}</div>
            <div>HP: {{ pokemon.stats.hp }}</div>
          </div>
          <div class="status-item">
            <div>Defense: {{ pokemon.stats.defense }}</div>
            <div>Special Attack: {{ pokemon.stats.specialAttack }}</div>
          </div>
          <div class="status-item">
            <div>Special Defense: {{ pokemon.stats.specialDefense }}</div>
            <div>Speed: {{ pokemon.stats.speed }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#page {
  color: #222222;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
}
#container {
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  width: fit-content;
  padding: 20px 20px 30px 20px;
  margin: 20px;
  justify-content: space-around;
  align-items: center;
}

#pokemon-image {
  width: 150px;
  height: 150px;
}

.type-item {
  list-style: none;
}
.name-container {
  display: flex;
  align-items: center;
}
.type-item {
  list-style: none;
}
.pokemon-name {
  list-style: none;
}

.element_icon {
  align-self: end;
}
.status-container {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
}

.status-item {
  text-align: left;
  margin-left: 20px;
  font-weight: 500;
}

.content-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 10px;
  height: fit-content;
}
</style>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Pokemon from "../interface/IPokemon";
import { typeColors, elementIconGreat } from "../components/constants"

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'
import { Radar } from 'vue-chartjs'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

export default defineComponent({
  name: "PokemonStats",
  props: {
    pokemon: {
      type: Object as PropType<Pokemon>,
      required: true,
    },
  },
  methods: {
    getTypeColor(type: string): string {
      return typeColors[type];
    },
    getIcon(type: string): string {
      return elementIconGreat[type];
    },
  },

  components: {
    Radar,
  },
  data() {
    return {
      chartConfig: {
        labels: [
          'Attack',
          'Defense',
          'Special Defense',
          'HP',
          'Special Attack',
          'Speed',
        ],
        datasets: [
          {
            label: 'Status:',
            backgroundColor: 'rgba(48, 42, 42, 0.4)',
            borderColor: 'rgba(48, 42, 42)',
            pointBackgroundColor: 'rgba(48, 42, 42)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [
              this.pokemon.stats.attack,
              this.pokemon.stats.defense,
              this.pokemon.stats.defense,
              this.pokemon.stats.hp,
              this.pokemon.stats.specialAttack,
              this.pokemon.stats.speed
            ],
          },
        ],
      },
      chartOptions: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: false,
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'rgb(0, 0,0)',
              font: {
                size: 24,
                weight: 'bold'
              }
            }
          },
        }
      }
    }
  },
  async mounted() {
    console.log(`prop`, this.pokemon);
  },
});
</script>
