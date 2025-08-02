import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import HomeView from './views/HomeView.vue'
import InstanceView from './views/InstanceView.vue'

// Function to update meta tags
export function updateMetaTags(instanceName = '') {
  const title = instanceName ? `Medium Talk: ${instanceName}` : 'Medium Talk - Conversation Starters'
  const description = instanceName 
    ? `Conversation starters for ${instanceName}`
    : 'A nice little app to give you questions to start conversations, bypassing small talk.'
  const image = instanceName 
    ? `/og-images/${instanceName.toLowerCase()}.png`
    : '/og-images/default.png'
  const url = window.location.origin + (instanceName ? `/${instanceName}` : '')

  // Update document title
  document.title = title

  // Update or create meta tags
  const metaTags = {
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:url': url,
    'og:type': 'website',
    'twitter:card': 'summary_large_image',
    'twitter:image': image,
    'twitter:title': title,
    'twitter:description': description
  }

  Object.entries(metaTags).forEach(([name, content]) => {
    let element = document.querySelector(`meta[property="${name}"]`) || 
                 document.querySelector(`meta[name="${name}"]`)
    
    if (!element) {
      element = document.createElement('meta')
      if (name.startsWith('og:')) {
        element.setAttribute('property', name)
      } else {
        element.setAttribute('name', name)
      }
      document.head.appendChild(element)
    }
    element.setAttribute('content', content)
  })
}

const routes = [
  { 
    path: '/', 
    component: HomeView,
    meta: {
      title: 'Medium Talk - Conversation Starters',
      metaTags: [
        { name: 'description', content: 'A nice little app to give you questions to start conversations, bypassing small talk.' },
        { property: 'og:type', content: 'website' }
      ]
    }
  },
  { 
    path: '/:instanceName', 
    component: InstanceView,
    meta: {
      title: (route) => `Medium Talk: ${route.params.instanceName}`,
      metaTags: [
        { name: 'description', content: (route) => `Conversation starters for ${route.params.instanceName}` },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: (route) => `/og-images/${route.params.instanceName.toLowerCase()}.png` },
        { property: 'og:url', content: (route) => `${window.location.origin}/${route.params.instanceName}` },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: (route) => `/og-images/${route.params.instanceName.toLowerCase()}.png` }
      ]
    }
  }
]

const pinia = createPinia()
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Update meta tags on route change
router.beforeEach((to, from, next) => {
  // Call the updateMetaTags function with the instance name if it exists
  const instanceName = to.params.instanceName || ''
  updateMetaTags(instanceName)
  next()
})

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')

// Initial meta tags update
updateMetaTags()
