<script setup>
defineProps({
  level: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="level-indicator">
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
</style>
