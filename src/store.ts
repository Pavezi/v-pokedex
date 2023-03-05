import { createStore } from 'vuex'

export default createStore({
    state: {
        selectedPokemon: null,
        showStats: false
    },
    mutations: {
        setSelectedPokemon(state, pokemon) {
            state.selectedPokemon = pokemon
        },
        setShowStats(state, show) {
            state.showStats = show
        }
    },
    actions: {},
    modules: {}
})
