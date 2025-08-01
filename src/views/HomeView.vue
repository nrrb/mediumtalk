<script setup>
import { ref, onMounted } from 'vue';
import questions from '@/questions.json';
import instances from '@/instances.json';

const randomQuestion = ref(null);

onMounted(() => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  randomQuestion.value = questions[randomIndex];
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
      <ul>
        <li v-for="instance in instances" :key="instance.path">
          <router-link :to="instance.path">{{ instance.name }}</router-link>
        </li>
      </ul>
    </div>
    <div class="attribution">
      <p>Created by Nicholas Bennett</p>
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
.instance-list ul {
  list-style: none;
  padding: 0;
}
.instance-list li {
  margin: 0.5rem 0;
}
.attribution {
    margin-top: 4rem;
    font-size: 0.8rem;
    color: #888;
}
</style>
