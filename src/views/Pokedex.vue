<script setup>
import { query } from '@/API/config';
import { AxiosError } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, onMounted, ref, watch } from 'vue';
import { usePokemonStore } from '@/stores/pokemon';

import PokemonList from '@/components/pokemonList.vue';
import Loader from './Loader.vue';
import General from '@/components/Buttons/general.vue';
import PokemonCard from '@/components/pokemonCard.vue';

const pokemonStore = usePokemonStore();

const loading = ref(false)
const emptyList = ref(false)
const buscador = ref('')
const pokemones = ref([])
const showFavorites = ref(false);
const showModal = ref(false);
const selectedPokemon = ref(null);
const infoPokemonSelected = ref([])

let timeout = null;

const searchPokemon = async (pokemonName = null) => {
  let urlTo = pokemonName ? `/${pokemonName.toLowerCase()}` : buscador.value.trim() ? `/${buscador.value.toLowerCase()}` : '';

  loading.value = true;
  emptyList.value = false;

  try {
    const data = await query({ url: urlTo });
    if (pokemonName) {
      infoPokemonSelected.value = data;
    } else {
      pokemones.value = data.results;
      emptyList.value = pokemones.value.length === 0;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error);
      emptyList.value = true;
    }
  } finally {
    loading.value = false;
  }
};



const filteredPokemonList = computed(() => {
  const searchTerm = buscador.value.toLowerCase().trim();
  return showFavorites.value
    ? pokemonStore.favorites.filter(pokemon => pokemon.name.includes(searchTerm))
    : pokemones.value.filter(pokemon => pokemon.name.includes(searchTerm));
});

const openPokemonModal = (pokemon) => {
  selectedPokemon.value = pokemon;
  searchPokemon(pokemon)
  showModal.value = true;
};
watch(filteredPokemonList, (newList) => {
  emptyList.value = newList.length === 0 && !loading.value;
});
onMounted(() => {
  searchPokemon();
});

</script>
<template>
  <div class="page-container">
    <Loader v-if="loading" />

    <div class="container">
      <input class="input" placeholder="Search" v-model="buscador">
      <span class="icon">
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" :style="{ color: 'var(--c-black-mute)' }" />
      </span>
    </div>
    <div v-if="emptyList" class="empty-message">
      <h1>Uh, oh!</h1>
      <h2>
        You look lost on your journey!
      </h2>
      <General title="Go back Home" to="/"></General>
    </div>
    <div v-else>

      <PokemonList :list="filteredPokemonList" @openModal="openPokemonModal"></PokemonList>
      <PokemonCard v-if="showModal" :info="pokemones" @close="showModal = false" />
      <footer class="footer">
        <div class="footer-content">
          <button class="general-btn" @click="showFavorites = false"
            :style="{ backgroundColor: !showFavorites ? 'var(--c-red)' : 'var(--c-black-soft)' }">
            <span class="btn-icon">
              <FontAwesomeIcon :icon="['fas', 'bars']" class="btn-icon" :style="{ color: 'var(--c-white)' }" />
            </span>
            All
          </button>

          <button class="general-btn" @click="showFavorites = true"
            :style="{ backgroundColor: showFavorites ? 'var(--c-red)' : 'var(--c-black-soft)' }">
            <span class="btn-icon">
              <FontAwesomeIcon :icon="['fas', 'star']" class="btn-icon" :style="{ color: 'var(--c-white)' }" />
            </span>
            Favorites
          </button>


        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  background-color: var(--c-white-mute);
  gap: 20px;
}


.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  min-height: 60px;
  position: relative;
  margin-top: 20px;
}


.icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  user-select: none;
  cursor: pointer;
}

.input {
  width: 100%;
  padding-left: 2.5rem;
  padding-right: 1rem;
  height: 40px;
  border: 0;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.input::placeholder {
  color: var(--c-black-mute);
  font-size: 16px;
}

.empty-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  text-align: center;
}

.footer {
  width: 100%;
  height: 60px;
  background: var(--c-white);
  box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
}

.footer-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>
