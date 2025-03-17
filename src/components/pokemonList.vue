<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePokemonStore } from '@/stores/pokemon';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const props = defineProps(['list']);
const pokemonStore = usePokemonStore();
const router = useRouter();

const pokemonList = computed(() => props.list);
const infoCard = ref()
const toggleFavorite = (pokemon) => {
  pokemonStore.toggleFavorite(pokemon);
};




</script>
<template>
  <div class="pokemon-list">
    <ul>
      <li v-for="pokemon in pokemonList" :key="pokemon.name" class="pokemon-item">
        <span @click="$emit('openModal', pokemon.name)" class="pokemon-name">
          {{ pokemon.name }}
        </span>

        <button @click="toggleFavorite(pokemon)" class="btn-fav">
          <FontAwesomeIcon :icon="['fas', 'star']" class="favorite-icon"
            :style="{ color: pokemonStore.isFavorite(pokemon.name) ? 'var(--c-yellow)' : 'var(--c-black-mute)' }" />
        </button>
      </li>
    </ul>
  </div>
</template>


<style scoped>
.pokemon-list {
  width: 30%;
}

.pokemon-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  margin-top: 5px;
  background-color: var(--c-white);
}

.pokemon-name {
  cursor: pointer;
  font-weight: bold;
  text-transform: capitalize;
}

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
