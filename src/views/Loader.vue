<script setup>
</script>

<template>
  <main>

    <img class="load" src="/src/assets/images/loader.png" alt="Load">

  </main>
</template>

<style scoped>

.load {

  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
