<script setup>
const props = defineProps(['title']);

</script>
<template>
<div>
  <button class="general-btn">{{ props.title }}</button>
</div>
</template>
<style scoped>
.general-btn{
  background-color: #F22539;
  color: #F9F9F9;
  border-radius: 60px;
  width: 131px;
  height: 44px;
  border: 0;
  font-size: 18px;
}
</style>