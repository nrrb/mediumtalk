<script setup>
import { ref, onUnmounted } from 'vue';

const props = defineProps({
  question: {
    type: String,
    required: true
  }
});

const isSpeaking = ref(false);
const speechSynthesis = window.speechSynthesis;
const voices = ref([]);
let utterance = null;

// Load available voices when they become available
const loadVoices = () => {
  const availableVoices = speechSynthesis.getVoices();
  // Filter for English (US/UK) voices
  voices.value = availableVoices.filter(voice => {
    const lang = voice.lang.toLowerCase();
    return lang.startsWith('en-us') || lang.startsWith('en_gb') || 
           lang.startsWith('en/') || // Some browsers use different formats
           voice.name.toLowerCase().includes('english');
  });
  
  // If no English voices found, fall back to all available voices
  if (voices.value.length === 0) {
    console.warn('No English voices found, falling back to all available voices');
    voices.value = availableVoices;
  }
};

// Some browsers load voices asynchronously
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = loadVoices;
}

// Initial load
loadVoices();

const speak = () => {
  if (isSpeaking.value) {
    speechSynthesis.cancel();
    isSpeaking.value = false;
    return;
  }

  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }

  utterance = new SpeechSynthesisUtterance(props.question);
  
  // Select a random voice if available
  if (voices.value.length > 0) {
    const randomVoice = voices.value[Math.floor(Math.random() * voices.value.length)];
    utterance.voice = randomVoice;
  }
  
  utterance.onend = () => {
    isSpeaking.value = false;
  };
  
  isSpeaking.value = true;
  speechSynthesis.speak(utterance);
};

// Clean up speech synthesis when component is unmounted
onUnmounted(() => {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
});
</script>

<template>
  <div class="question-display">
    <button 
      @click="speak"
      :aria-pressed="isSpeaking"
      :aria-label="isSpeaking ? 'Stop reading question' : 'Read question aloud'"
      class="speak-button"
    >
      <span aria-hidden="true">
        {{ isSpeaking ? '⏹️' : '🔊' }}
      </span>
    </button>
    <transition name="fade" mode="out-in">
      <p :key="question">{{ question }}</p>
    </transition>
  </div>
</template>

<style scoped>
.speak-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
}

.speak-button:hover,
.speak-button:focus {
  background-color: rgba(0, 0, 0, 0.1);
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.speak-button:active {
  transform: scale(0.95);
}

.question-display {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  padding: 2rem;
  transition: transform 0.3s ease-in-out;
  /* text-shadow: 1px 1px 2px rgba(0,0,0,0.7), 
                3px 3px 6px rgba(0,0,0,0.4); */
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7),
                3px 3px 6px rgba(255, 255, 255, 0.4);
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
