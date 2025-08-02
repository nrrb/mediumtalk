<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useSwipe } from '@vueuse/core';
import { useRoute } from 'vue-router';
import questions from '@/questions.json';
import instances from '@/instances.json';
import QuestionDisplay from '@/components/QuestionDisplay.vue';
import LevelIndicator from '@/components/LevelIndicator.vue';
import TypeIndicator from '@/components/TypeIndicator.vue';
import HomeIcon from '@/assets/home.svg';

const route = useRoute();
const currentQuestion = ref(null);
const currentInstance = ref(null);
const currentIndex = ref(0);

const instancePath = computed(() => `/${route.params.instanceName}`);

const setInstance = () => {
  currentInstance.value = instances.find(inst => inst.path === instancePath.value);
  if (currentInstance.value) {
    document.body.style.backgroundColor = currentInstance.value.colorScheme.background;
    document.body.style.color = currentInstance.value.colorScheme.text;
  }
};

const currentLevel = ref('Surface');

const getRandomQuestion = (level = currentLevel.value) => {
    currentLevel.value = level;
    const levelQuestions = questions.filter(q => q.level === level);
    const randomIndex = Math.floor(Math.random() * levelQuestions.length);
    currentQuestion.value = levelQuestions[randomIndex];
    currentIndex.value = randomIndex;
};

const getNextQuestion = () => {
    const levelQuestions = questions.filter(q => q.level === currentLevel.value);
    const nextIndex = (currentIndex.value + 1) % levelQuestions.length;
    currentQuestion.value = levelQuestions[nextIndex];
    currentIndex.value = nextIndex;
};

const getPreviousQuestion = () => {
    const levelQuestions = questions.filter(q => q.level === currentLevel.value);
    const prevIndex = (currentIndex.value - 1 + levelQuestions.length) % levelQuestions.length;
    currentQuestion.value = levelQuestions[prevIndex];
    currentIndex.value = prevIndex;
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
    if (direction === 'left') {
      getPreviousQuestion();
    } else if (direction === 'right') {
      getNextQuestion();
    } else if (direction === 'up') {
      navigateLevel('up');
    } else if (direction === 'down') {
      navigateLevel('down');
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
            getPreviousQuestion();
            break;
        case 'ArrowRight':
            getNextQuestion();
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
        chipBackground: currentInstance.value.colorScheme.chipBackground,
        chipText: currentInstance.value.colorScheme.chipText
    }
});

</script>

<template>
  <div v-if="currentInstance && currentQuestion" class="instance-view" ref="el">
    <LevelIndicator :level="currentQuestion.level" :instance-styles="chipStyle" />
    <TypeIndicator :type="currentQuestion.type" :instance-styles="chipStyle" />
    <QuestionDisplay :question="currentQuestion" />
    <router-link to="/" class="home-link">
      leave {{ currentInstance.name }}
    </router-link>
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

.home-link {
  position: absolute;
  bottom: 2rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: 'Kaph', sans-serif;
  font-size: 1rem;
}
</style>
