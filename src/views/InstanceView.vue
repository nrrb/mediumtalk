<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useDrag } from '@vueuse/gesture';
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

const handleSwipe = ({ swipe: [sx, sy] }) => {
    if (sx !== 0) { // swipe left or right
        getRandomQuestion();
    } else if (sy === -1) { // swipe up (previous level)
        const currentIndex = levels.indexOf(currentLevel.value);
        const prevIndex = (currentIndex - 1 + levels.length) % levels.length;
        getRandomQuestion(levels[prevIndex]);
    } else if (sy === 1) { // swipe down (next level)
        const currentIndex = levels.indexOf(currentLevel.value);
        const nextIndex = (currentIndex + 1) % levels.length;
        getRandomQuestion(levels[nextIndex]);
    }
};

const el = ref(null);
useDrag(handleSwipe, { 
    target: el, 
    axis: 'lock',
    filterTaps: true
});

onMounted(() => {
  setInstance();
  getRandomQuestion('Surface');
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
  <div v-if="currentInstance && currentQuestion" class="instance-view" ref="el">
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
}
</style>
