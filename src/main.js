import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

const pinia = createPinia()
const router = createRouter({
    history: createWebHistory(),
    routes: [],
})

createApp(App).use(pinia).use(router).mount('#app')
