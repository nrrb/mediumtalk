<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useSwipe } from '@vueuse/core';
import { useRouter } from 'vue-router';
import picnicQuestions from '@/picnic-questions.json';

const router = useRouter();
const el = ref(null);

// Baltimore theme colors
const baltimoreTheme = {
  background: '#FCBC45',
  text: '#000000',
  chipBackground: '#C51E30',
  chipText: '#FFFFFF'
};

// Set initial theme
onMounted(() => {
  document.body.style.backgroundColor = baltimoreTheme.background;
  document.body.style.color = baltimoreTheme.text;
  window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
  // Reset body styles when leaving the view
  document.body.style.backgroundColor = '';
  document.body.style.color = '';
});

// Get unique question types
const questionTypes = [...new Set(picnicQuestions.map(q => q.type))];
const currentTypeIndex = ref(0);
const currentType = computed(() => questionTypes[currentTypeIndex.value]);
const currentExplanation = computed(() => {
  const typeQuestion = picnicQuestions.find(q => q.type === currentType.value);
  return typeQuestion ? typeQuestion.explanation : '';
});

// Filter questions by current type
const currentTypeQuestions = computed(() => 
  picnicQuestions.filter(q => q.type === currentType.value)
);

// Current question index for the current type
const currentQuestionIndex = ref(0);

// Current question
const currentQuestion = computed(() => 
  currentTypeQuestions.value[currentQuestionIndex.value]
);

// Navigation functions
const navigateType = (direction) => {
  if (direction === 'prev') {
    currentTypeIndex.value = (currentTypeIndex.value - 1 + questionTypes.length) % questionTypes.length;
  } else if (direction === 'next') {
    currentTypeIndex.value = (currentTypeIndex.value + 1) % questionTypes.length;
  }
  // Reset question index when changing types
  currentQuestionIndex.value = 0;
};

const navigateQuestion = (direction) => {
  if (direction === 'prev') {
    currentQuestionIndex.value = (currentQuestionIndex.value - 1 + currentTypeQuestions.value.length) % currentTypeQuestions.value.length;
  } else if (direction === 'next') {
    currentQuestionIndex.value = (currentQuestionIndex.value + 1) % currentTypeQuestions.value.length;
  }
};

// Handle swipe events
const { isSwiping } = useSwipe(el, {
  onSwipeEnd: (e, direction) => {
    if (direction === 'left' || direction === 'right') {
      navigateQuestion(direction === 'right' ? 'next' : 'prev');
    } else if (direction === 'up' || direction === 'down') {
      navigateType(direction === 'down' ? 'next' : 'prev');
    }
  },
});

// Handle keyboard navigation
const handleKeyPress = (e) => {
  switch (e.key) {
    case 'ArrowUp':
      navigateType('prev');
      break;
    case 'ArrowDown':
      navigateType('next');
      break;
    case 'ArrowLeft':
      navigateQuestion('prev');
      break;
    case 'ArrowRight':
      navigateQuestion('next');
      break;
    case 'Escape':
      router.push('/');
      break;
  }
};
</script>

<template>
  <div v-if="currentQuestion" class="picnic-view" ref="el">
    <div class="content">
      <h1 class="question-type">{{ currentType }}</h1>
      <p class="explanation">{{ currentExplanation }}</p>
      <div class="question-container">
        <p class="question">{{ currentQuestion.question }}</p>
      </div>
    </div>
    <router-link to="/" class="home-link">
      back to home
    </router-link>
  </div>
</template>

<style scoped>
.question-type {
  position: fixed;
  top: 0.5rem;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: 'Kaph', sans-serif;
  font-size: 1rem;
  z-index: 100;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.explanation {
  font-family: 'Kaph', sans-serif;
  font-size: 0.75rem;
  position: fixed;
  top: 1.5rem;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 100;
  padding: 0.75rem 1.5rem;
}

.question {
  font-family: 'Kaph', sans-serif;
  font-size: 2rem;
  transition: transform 0.3s ease-in-out;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.7), 
                3px 3px 6px rgba(0,0,0,0.4), 
                5px 5px 10px rgba(0,0,0,0.2);
}

.picnic-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  touch-action: none; /* Prevent default browser touch actions */
}

.home-link {
  position: fixed;
  bottom: 1.5rem;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: 'Kaph', sans-serif;
  font-size: 1rem;
  z-index: 100;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
