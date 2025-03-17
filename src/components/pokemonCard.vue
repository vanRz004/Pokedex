<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePokemonStore } from '@/stores/pokemon';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const props = defineProps(['info']);
const pokemonStore = usePokemonStore();
const router = useRouter();

const infoCard = computed(() => props.info);

const copyId = (pokemon) => {
  pokemonStore.toggleFavorite(pokemon);
};



</script>

<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <button class="close-btn" @click="$emit('close')">X</button>
      {{infoCard}}
      <!-- <h2>{{ infoCard.value?.name }}</h2>
      <img :src="infoCard.value.sprites?.front_default" alt="Pokemon" />
      <p>Peso: {{ infoCard.value.weight }}</p>
      <p>Altura: {{ infoCard.value.height }}</p> -->
    </div>
  </div>
</template>



<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: red;
  color: white;
  cursor: pointer;
  font-size: 16px;
}
</style>



