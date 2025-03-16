<script setup>
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue';


const props = defineProps(['title', 'to', 'icon', 'color']);
const router = useRouter();
const activeButton = ref(null);
const goTo = () => {
  if (props.to) {
    router.push(props.to); 
  }
};
const handleClick = () => {
  if (props.to) {
    router.push(props.to);
  } else {
    activeButton.value = props.title; 
  }
};
</script>
<template>
  <div>
    <button 
      class="general-btn" 
      :class="{ active: activeButton === title || router.path === to }" 
      @click="handleClick"
      :style="{ backgroundColor: (activeButton === title || router.path === to) ? 'var(--c-red-hover)' : color || 'var(--c-red)' }"
    >
      <span v-if="icon" class="icon">
        <FontAwesomeIcon v-if="icon" :icon="icon" class="icon" :style="{ color: 'var(--c-white)' }" />
      </span>
      {{ title }}
    </button>
  </div>
</template>

<style scoped>
.general-btn {
  color: var(--c-white);
  border-radius: 60px;
  width: 131px;
  height: 44px;
  border: 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.3s ease-in-out;
}

.general-btn:hover {
  cursor: pointer;
}

.active {
  background-color: var(--c-red) !important;
  font-weight: bold;
}

.icon {
  display: flex;
  align-items: center;
  font-size: 20px;
}
</style>