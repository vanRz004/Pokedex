<script setup>
import { ref } from 'vue';

import Favorite from './Buttons/favorite.vue';

const props = defineProps(['info']);
const copied = ref(false);

const copyId = (pokemon) => {
  const data = `Name: ${pokemon.name}, Weight: ${pokemon.weight}, Types: ${pokemon.types?.map(t => t.type.name).join(', ')}`;
  copied.value = true;
  navigator.clipboard.writeText(data);
}
setTimeout(() => copied.value = false, 2000);
</script>

<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <button class="close-btn" @click="$emit('close')">x</button>
      <div class="image-container">
        <img class="background" src="/src/assets/background-character.png" alt="Background-Pokemon" />
        <img class="character" :src="props.info.sprites?.front_default" alt="Pokemon" />
      </div>
      <div class="info">
        <p>Name: {{ props.info.name }} </p>
        <p>Weight: {{ props.info.weight }} </p>
        <p>Types: {{props.info.types?.map(t => t.type.name).join(', ')}}</p>
      </div>
      <footer>
        <div class="container-shared">

          <button class="general-btn" @click="copyId(props.info)" :style="{ backgroundColor: 'var(--c-red)' }">Share to
            my friends</button>
          <div v-if="copied" class="popover">Copiado</div>
        </div>
        <Favorite :pokemon="props.info"></Favorite>
      </footer>
    </div>
  </div>
</template>

<style scoped>
p {
  text-transform: capitalize;
  margin: 5px 0;
  border-bottom: 1px solid var(--c-black-mute);
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 100%;
}

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
  width: 570px;
  height: auto;
  background: var(--c-white);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: var(--c-white);
  color: rgba(0, 0, 0, 0.11);
  cursor: pointer;
  font-size: 16px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.image-container {
  position: relative;
  width: 100%;
  height: 206px;
  display: flex;
  justify-content: center;
  align-items: center;

}

.background {
  width: 100%;
  height: 206px;
  position: absolute;
  z-index: 1;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.character {
  position: absolute;
  z-index: 2;
  width: 30%;
  height: auto;
  top: 60%;
  transform: translateY(-50%);
}

.info {
  padding: 20px;
  width: 100%;
}
.container-shared{
  position: relative;
  display: inline-block;
}
.popover {
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--c-black-mute);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0.9;
  transition: opacity 0.3s ease-in-out;
}

@media (max-width: 600px) {
  .modal-content {
    width: 90%; 
    max-width: 350px;
  }

  .close-btn {
    top: 5px;
    right: 5px;
    font-size: 14px;
    padding: 5px;
  }

  .image-container {
    height: 150px;
  }

  .background {
    height: 150px;
  }

  .character {
    width: 40%; 
  }

  .info {
    padding: 15px;
    font-size: 14px;
  }

  footer {
    gap: 10px;
  }

  .general-btn {
    width: 100%; 
  }
}
</style>
