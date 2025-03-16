<script setup>
import GeneralBtn from '@/components/Buttons/general.vue';


</script>

<template>
  <main>
    <div class="image-container">
      <img class="background" src="/src/assets/images/back-character.png" alt="Background">
      <img class="character" src="/src/assets/images/character.png" alt="Character">
    </div>
    <h1> Welcome to Pokédex</h1>
    <h2>The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</h2>
    <GeneralBtn title="Get started"></GeneralBtn>
  </main>
</template>
<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
  height: 100vh; 
  text-align: center; 
  /* padding: 20px;  */
}
.image-container {
  position: relative;
  width: 325px; 
  height: 288px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background {
  width: 206px;
  height: 206px;
  position: absolute;
  z-index: 1; 
  top: 70px;
  right: 70px;
}

.character {
  width: 325px; 
  height: auto;
  position: absolute;
  z-index: 2; 
}
</style>
