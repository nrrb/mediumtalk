<script setup>
import { ref, onMounted } from 'vue';
import questions from '@/questions.json';
import instances from '@/instances.json';
import QuestionDisplay from '@/components/QuestionDisplay.vue';

const isPortraitExpanded = ref(false);
const portraitRef = ref(null);

const togglePortrait = () => {
  isPortraitExpanded.value = !isPortraitExpanded.value;
};

const closePortrait = (event) => {
  if (isPortraitExpanded.value && !portraitRef.value.contains(event.target)) {
    isPortraitExpanded.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closePortrait);
  return () => {
    document.removeEventListener('click', closePortrait);
  };
});

const stripeThickness = 10;
const getInstanceStyle = (instance) => {
  const { background, text, chipBackground, chipText } = instance.colorScheme;
  return {
    background: `repeating-linear-gradient(45deg,
    ${background},
    ${background} ${stripeThickness}rem,
    ${text} ${stripeThickness}rem,
    ${text} ${stripeThickness * 2}rem,
    ${chipBackground} ${stripeThickness * 2}rem,
    ${chipBackground} ${stripeThickness * 3}rem,
    ${chipText} ${stripeThickness * 3}rem,
    ${chipText} ${stripeThickness * 4}rem
    )`,
  };
};

const randomQuestion = ref(null);

onMounted(() => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  randomQuestion.value = questions[randomIndex];
  document.body.style.backgroundColor = '#fafaf9';
  document.body.style.color = '#2d2d2d';
});
</script>

<template>
  <div class="home-view">
    <h1>Medium Talk</h1>
    <h2>Get to know someone.</h2>
    <div v-if="randomQuestion" class="random-question-sample">
      <QuestionDisplay :question="randomQuestion" />
    </div>
    <div class="instance-list">
      <router-link to="/picnic" class="instance-link" :style="getInstanceStyle({
        name: 'No-Small-Talk Picnic',
        path: '/picnic',
        colorScheme: {
          background: '#FCBC45',
          text: '#000000',
          chipBackground: '#C51E30',
          chipText: '#FFFFFF'
        }
      })">No-Small-Talk Picnic</router-link>
    </div>
    <h2 class="instance-list-title">Cities:</h2>
    <div class="instance-list">
      <ul class="instance-list">
        <li v-for="instance in instances" :key="instance.path">
          <router-link :to="instance.path" class="instance-link" :style="getInstanceStyle(instance)">{{ instance.name }}</router-link>
        </li>
      </ul>
    </div>
    <div class="attribution">
      <p>Created by 
        <span @click.stop>
          <img 
            ref="portraitRef"
            src="@/assets/portrait.jpg" 
            alt="" 
            class="portrait" 
            :class="{ 'expanded': isPortraitExpanded }"
            @click="togglePortrait"
          >
        </span>
        <a href="https://github.com/nrrb">Nicholas Bennett</a>
      </p>
      <p>Hosted by <a href="https://vercel.com">Vercel</a></p>
      <p>Source code on <a href="https://github.com/nrrb/mediumtalk">GitHub</a></p>
      <p>Kaph font by <a href="https://ggbot.itch.io/kaph-font">GGBot </a></p>
    </div>
  </div>
</template>

<style scoped>   
h1 {
    font-family: 'Kaph', sans-serif;
    font-size: 4rem;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.7), 3px 3px 6px rgba(0,0,0,0.4);
}
h2 {
    font-family: 'Kaph', sans-serif;
    font-size: 1.5rem;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
}
.instance-list-title {
    font-family: 'Kaph', sans-serif;
    font-size: 1.5rem;
    margin-top: 4rem;
}
.home-view {
  padding: 2rem;
  text-align: center;
}

.portrait {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  object-fit: cover;
  display: inline-block;
  vertical-align: middle;
  margin: 0 0.25rem;
  transition: all 200ms ease-in-out;
  transform-origin: center center;
  position: relative;
  z-index: 1;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.portrait:hover,
.portrait.expanded {
  width: 16rem;
  height: 16rem;
  margin: -8rem 0.25rem -8rem 0.25rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.random-question-sample {
    margin: 2rem 0;
    font-style: italic;
}
.instance-list {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem 0;
}

.instance-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.instance-list li {
  width: 100%;
  margin: 0;
}

.instance-link {
  display: block;
  padding: 0.5rem 1.5rem;
  font-size: 1.5rem;
  line-height: 1.5rem;
  width: 100%;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s ease;
  border-radius: 0;
  background: linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 100%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.instance-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 100%);
}
.attribution {
    margin-top: 4rem;
    font-size: 0.8rem;
    color: #888;
}
</style>
