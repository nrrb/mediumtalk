import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import HomeView from './views/HomeView.vue'
import InstanceView from './views/InstanceView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/:instanceName', component: InstanceView }
]

const pinia = createPinia()
const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(pinia).use(router).mount('#app')
