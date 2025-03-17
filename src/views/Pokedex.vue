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

const infoPokemonSelected = ref({})

let timeout = null;

const searchPokemon = async (pokemonName = null) => {
  let urlTo = pokemonName ? `/${pokemonName.toLowerCase()}` : buscador.value.trim() ? `/${buscador.value.toLowerCase()}` : '';

  loading.value = true;
  emptyList.value = false;

  try {
    const data = await query({ url: urlTo });
    if (pokemonName == null) {
      pokemones.value = data.results;
      emptyList.value = pokemones.value.length === 0;
    } else {
      infoPokemonSelected.value = data;
      console.log("la data", infoPokemonSelected)  
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
  infoPokemonSelected.value = {};
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
    <div v-else class="pokemon-list-container">

      <PokemonList :list="filteredPokemonList" @openModal="openPokemonModal"></PokemonList>
      <PokemonCard v-if="showModal && infoPokemonSelected" :info="infoPokemonSelected" @close="showModal = false" />
      <footer class="footer">

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
  padding: 10px;
  width: 100%;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60px;
  position: relative;
  margin-top: 20px;
  width: 30%;
}
.pokemon-list-container {
  width: 100vw; 
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  user-select: none;
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

.pokemon-list {
  width: 100%;
  max-width: 400px; 
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
  padding: 10px;
  gap:15px
}


@media (max-width: 768px) {
  .page-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start; 
    align-items: center; 
    width: 100%;
    padding: 10px;
  }
  .container {
    width: 100%;
    max-width: 400px; 
  }
  .pokemon-list {
    width: 100%;
    max-width: 400px;
    text-align: center; 
  }

  .pokemon-item {
    flex-direction: column;
    text-align: center;
  }

  .footer {
    width: 100%;
    justify-content: center;
  }
}

</style>