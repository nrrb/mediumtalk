<script setup>
defineProps({
  question: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="question-display">
    <p>{{ question.text }}</p>
  </div>
</template>

<style scoped>
.question-display {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  padding: 2rem;
}
p {
    font-size: 1.5rem;
    line-height: 1.6;
}
</style>
