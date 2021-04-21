import { createRouter, createWebHistory } from 'vue-router'; //import of vue-router

// Main View
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
        orientation: 0
      },
  },
]

export default createRouter({
  history: createWebHistory(),
  routes
});