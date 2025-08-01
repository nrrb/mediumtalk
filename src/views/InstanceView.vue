<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useSwipe } from '@vueuse/core';
import { useRoute } from 'vue-router';
import questions from '@/questions.json';
import instances from '@/instances.json';
import QuestionDisplay from '@/components/QuestionDisplay.vue';
import LevelIndicator from '@/components/LevelIndicator.vue';
import TypeIndicator from '@/components/TypeIndicator.vue';

const route = useRoute();
const currentQuestion = ref(null);
const currentInstance = ref(null);

const instancePath = computed(() => `/${route.params.instanceName}`);

const setInstance = () => {
  currentInstance.value = instances.find(inst => inst.path === instancePath.value);
  if (currentInstance.value) {
    document.body.style.backgroundColor = currentInstance.value.colorScheme.background;
    document.body.style.color = currentInstance.value.colorScheme.text;
  }
};

const currentLevel = ref('Surface');

const questionsByLevel = computed(() => {
    return questions.filter(q => q.level === currentLevel.value)
});

const getRandomQuestion = (level = currentLevel.value) => {
    currentLevel.value = level;
    const levelQuestions = questions.filter(q => q.level === level);
    const randomIndex = Math.floor(Math.random() * levelQuestions.length);
    currentQuestion.value = levelQuestions[randomIndex];
};

const levels = ['Surface', 'Sub-Surface', 'Core'];

const navigateLevel = (direction) => {
    const currentIndex = levels.indexOf(currentLevel.value);
    if (direction === 'up') {
        const prevIndex = (currentIndex - 1 + levels.length) % levels.length;
        getRandomQuestion(levels[prevIndex]);
    } else if (direction === 'down') {
        const nextIndex = (currentIndex + 1) % levels.length;
        getRandomQuestion(levels[nextIndex]);
    }
};

const el = ref(null);
const { isSwiping } = useSwipe(el, {
  onSwipeEnd: (e, direction) => {
    if (direction === 'left' || direction === 'right') {
      getRandomQuestion();
    } else if (direction === 'up') {
      navigateLevel('down');
    } else if (direction === 'down') {
      navigateLevel('up');
    }
  },
});

const handleKeyPress = (e) => {
    switch (e.key) {
        case 'ArrowUp':
            navigateLevel('up');
            break;
        case 'ArrowDown':
            navigateLevel('down');
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
            getRandomQuestion();
            break;
    }
};

onMounted(() => {
  setInstance();
  getRandomQuestion('Surface');
  window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress);
});

watch(instancePath, () => {
    setInstance();
    getRandomQuestion();
});

const chipStyle = computed(() => {
    if (!currentInstance.value) return {};
    return {
        backgroundColor: currentInstance.value.colorScheme.chipBackground,
        color: currentInstance.value.colorScheme.chipText
    }
});

</script>

<template>
  <div v-if="currentInstance && currentQuestion" class="instance-view" :style="instanceStyle" ref="el">
    <LevelIndicator :level="currentQuestion.level" :style="chipStyle" />
    <TypeIndicator :type="currentQuestion.type" :style="chipStyle" />
    <QuestionDisplay :question="currentQuestion" />
  </div>
</template>

<style scoped>
.instance-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: relative;
  touch-action: none; /* Prevent default browser touch actions */
}
</style>
