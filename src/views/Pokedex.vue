<script setup>
import { query } from '@/API/config';
import { AxiosError } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Loader from './Loader.vue';
import { onMounted, ref } from 'vue';
import General from '@/components/Buttons/general.vue';

const loading = ref(false)
const buscador = ref('')
const pokemones = ref([])
const searchPokemon = async () => {
  let urlTo = buscador.value.trim() ? `/${buscador.value}` : '';
  // if (buscador.value.trim() === "") {
  //   console.log("vacio")
  // } else {

    loading.value = true;
    try {
      const data = await query({
        url: urlTo,

      });
      console.log(data)

      // if (data.results.length === 0) {
      //   toast.add({ severity: 'error', summary: 'Error', detail: "No se ha encontrado peliculas con este nombre", life: 3000 });
      // }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        loading.value = false;
        // toast.add({ severity: 'error', summary: 'No se realizó la búsqueda', detail: error.response.data, life: 3000 });
      }
    } finally {

      loading.value = false;
    }
  }
// }
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

    <footer class="footer">
      <div class="footer-content">
        <General title="All" :icon="['fas', 'bars']"></General>
        <General title="Favorites" :icon="['fas', 'star']"></General>
      </div>
    </footer>
  </div>
</template>

<style scoped>

.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh; 
}


.container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  position: relative;
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
  height: 50px;
  border: 0;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.input::placeholder {
  color: var(--c-black-mute);
  font-size: 16px;
}


.footer {
  width: 100%;
  height: 60px;
  background: var(--c-white);
  box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer-content{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>
