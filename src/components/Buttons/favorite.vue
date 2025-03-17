<script setup>
import { usePokemonStore } from '@/stores/pokemon';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps(['pokemon']);

const pokemonStore = usePokemonStore();

const toggleFavorite = () => {
  pokemonStore.toggleFavorite(props.pokemon);
};
</script>

<template>
  <button @click="toggleFavorite" class="btn-fav">
    <FontAwesomeIcon 
      :icon="['fas', 'star']" 
      class="favorite-icon"
      :style="{ color: pokemonStore.isFavorite(pokemon.name) ? 'var(--c-yellow)' : 'var(--c-black-mute)' }" 
    />
  </button>
</template>

<style scoped>
.favorite-icon {
  font-size: 20px;
  cursor: pointer;
}

.btn-fav {
  border: 0;
  color: var(--c-white);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  border: 0;
}
</style>
