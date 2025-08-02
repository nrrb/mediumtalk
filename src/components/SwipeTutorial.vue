<template>
  <Transition name="overlay">
    <div v-if="showTutorial" class="tutorial-overlay">
      <div class="tutorial-content" @click.stop>
        <div class="tutorial-header">
          <h3>Navigate with Swipes!</h3>
          <button @click="closeTutorial" class="close-btn">×</button>
        </div>
        
        <div class="swipe-demo">
          <div class="gesture-item">
            <div class="arrow left">←</div>
            <span>Swipe left for next question</span>
          </div>
          <div class="gesture-item">
            <div class="arrow right">→</div>
            <span>Swipe right for previous question</span>
          </div>
          <div class="gesture-item">
            <div class="arrow up">↑</div>
            <span>Swipe up for previous level</span>
          </div>
          <div class="gesture-item">
            <div class="arrow down">↓</div>
            <span>Swipe down for next level</span>
          </div>
        </div>
        
        <button @click="closeTutorial" class="got-it-btn">
          Got it!
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showTutorial = ref(false)

onMounted(() => {
  setTimeout(() => {
    showTutorial.value = true
  }, 500)
})

const closeTutorial = () => {
  showTutorial.value = false
}
</script>

<style scoped>
.tutorial-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
  transition: opacity 0.3s ease;
}

.tutorial-content {
  border-radius: 16px;
  padding: 24px;
  max-width: 320px;
  width: 90%;
  background-color: white;
  color: black;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.4s ease-out;
}

.tutorial-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.tutorial-header h3 {
  margin: 0;
  font-size: 18px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swipe-demo {
  margin-bottom: 24px;
}

.gesture-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}

.arrow {
  width: 32px;
  height: 32px;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  animation: pulse 2s infinite;
}

.arrow.up { animation-delay: 0s; }
.arrow.down { animation-delay: 0.5s; }
.arrow.left { animation-delay: 1s; }
.arrow.right { animation-delay: 1.5s; }

.got-it-btn {
  width: 100%;
  background: #007AFF;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.got-it-btn:hover {
  background: #0056CC;
}

/* Transitions */
.overlay-enter-active, .overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from, .overlay-leave-to {
  opacity: 0;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
</style>