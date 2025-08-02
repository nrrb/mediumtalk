<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  level: {
    type: String,
    required: true
  },
  instanceStyles: {
    type: Object,
    required: true
  }
});

const isGlowing = ref(false);

watch(() => props.level, () => {
  isGlowing.value = true;
  setTimeout(() => {
    isGlowing.value = false;
  }, 300); // Animation duration
});
</script>

<template>
  <div 
    class="level-indicator-container" 
    :class="{ 'glowing': isGlowing }"
    :style="{
      '--chip-bg': instanceStyles.chipBackground,
      '--chip-text': instanceStyles.chipText
    }"
  >
    <div class="level-box" :class="{ 'active': level === 'Surface' }">
      <span>Surface</span>
    </div>
    <div class="level-box" :class="{ 'active': level === 'Sub-Surface' }">
      <span>Sub-Surface</span>
    </div>
    <div class="level-box" :class="{ 'active': level === 'Core' }">
      <span>Core</span>
    </div>
  </div>
</template>

<style scoped>
.level-indicator-container {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  background: white;
  border-radius: 0.75rem;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.level-box {
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  color: black;
  background: white;
  transition: all 0.2s ease;
  cursor: default;
  text-align: center;
  border-radius: 0.75rem;
  min-width: 100px;
}

 .active {
  background-color: var(--chip-bg);
  color: var(--chip-text);
}

.glowing {
  animation: glow-effect 0.3s ease-out;
}

@keyframes glow-effect {
  0% {
    box-shadow: 0 0 3px 1px rgba(255, 255, 255, 0.7);
  }
  100% {
    box-shadow: 0 0 15px 8px rgba(255, 255, 255, 0);
  }
}
</style>
