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
    <transition name="fade" mode="out-in">
      <p :key="question.text">{{ question.text }}</p>
    </transition>
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
  transition: transform 0.3s ease-in-out;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.7), 
                3px 3px 6px rgba(0,0,0,0.4), 
                5px 5px 10px rgba(0,0,0,0.2);
}
p {
    font-family: 'Kaph', sans-serif;
    font-size: 2rem;
    line-height: 1.6;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
