<script setup>
import { ref, onMounted } from 'vue';
import questions from '@/questions.json';
import instances from '@/instances.json';

const getInstanceStyle = (instance) => {
  const { background, text, chipBackground, chipText } = instance.colorScheme;
  return {
    backgroundImage: `linear-gradient(to right, ${background}, ${text}, ${chipBackground}, ${chipText})`,
  };
};

const randomQuestion = ref(null);

onMounted(() => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  randomQuestion.value = questions[randomIndex];
  document.body.style.backgroundColor = '#FFFFFF';
});
</script>

<template>
  <div class="home-view">
    <h1>Medium Talk</h1>
    <div v-if="randomQuestion" class="random-question-sample">
      <p>"{{ randomQuestion.text }}"</p>
    </div>
    <div class="description">
      <p>A nice little app to give you questions to start conversations, bypassing small talk.</p>
    </div>
    <div class="instance-list">
      <h2>Instances</h2>
      <ul class="instance-list">
        <li v-for="instance in instances" :key="instance.path">
          <router-link :to="instance.path" class="instance-link" :style="getInstanceStyle(instance)">{{ instance.name }}</router-link>
        </li>
      </ul>
    </div>
    <div class="attribution">
      <p>Created by <a href="https://github.com/nrrb">Nicholas Bennett</a></p>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  padding: 2rem;
  text-align: center;
}
.random-question-sample {
    margin: 2rem 0;
    font-style: italic;
}
.instance-list {
    text-align: center;
}
.instance-list ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}
.instance-link {
  display: block;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  text-align: center;
  transition: transform 0.2s ease;
}
.instance-link:hover {
  transform: scale(1.05);
}
.attribution {
    margin-top: 4rem;
    font-size: 0.8rem;
    color: #888;
}
</style>
