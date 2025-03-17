<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePokemonStore } from '@/stores/pokemon';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Favorite from './Buttons/favorite.vue';
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
        <Favorite :pokemon="pokemon" />
      </li>
    </ul>
  </div>
</template>


<style scoped>
.pokemon-list {
  width: 100vw;
  max-width: 420px;
  min-width: 30vw;
}

.pokemon-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-radius: 5px;
  margin-top: 5px;
  width: 100%;
  background-color: var(--c-white);
}

.pokemon-name {
  cursor: pointer;
  font-weight: bold;
  text-transform: capitalize;
}

@media (max-width: 768px) {
  .pokemon-list {
    width: 90%;
    max-width: 100%;
  }

  .pokemon-item {
    padding: 6px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .pokemon-list {
    width: 100%;
    max-width: 100%;
  }
  .pokemon-item {
    font-size: 12px;
    padding: 4px;
    text-align: center;
  }
}
</style>
