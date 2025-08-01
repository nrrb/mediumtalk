<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  level: {
    type: String,
    required: true
  }
});

const isGlowing = ref(false);

watch(() => props.level, () => {
  isGlowing.value = true;
  setTimeout(() => {
    isGlowing.value = false;
  }, 500); // Animation duration
});
</script>

<template>
  <div class="level-indicator" :class="{ 'glowing': isGlowing }">
    <span>{{ level }}</span>
  </div>
</template>

<style scoped>
.level-indicator {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
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
