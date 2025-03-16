import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    favorites: [], 
  }),
  
  getters: {
    isFavorite: (state) => (pokemonName) => {
      return state.favorites.some((p) => p.name === pokemonName);
    },
  },

  actions: {
    addFavorite(pokemon) {
      if (!this.isFavorite(pokemon.name)) {
        this.favorites.push(pokemon);
      }
    },

    removeFavorite(pokemonName) {
      this.favorites = this.favorites.filter((p) => p.name !== pokemonName);
    },

    toggleFavorite(pokemon) {
      this.isFavorite(pokemon.name)
        ? this.removeFavorite(pokemon.name)
        : this.addFavorite(pokemon);
    },
  },
});
