<script setup>
defineProps({
  type: {
    type: String,
    required: true
  },
  instanceStyles: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="type-indicator" :style="{ backgroundColor: instanceStyles.chipBackground, color: instanceStyles.chipText }">
    <span>{{ type }}</span>
  </div>
</template>

<style scoped>
.type-indicator {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
