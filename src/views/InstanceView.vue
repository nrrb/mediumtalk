<script setup>
import { ref, computed, onMounted, watch } from 'vue';
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

const getRandomQuestion = () => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  currentQuestion.value = questions[randomIndex];
};

onMounted(() => {
  setInstance();
  getRandomQuestion();
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
  <div v-if="currentInstance && currentQuestion" class="instance-view">
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
