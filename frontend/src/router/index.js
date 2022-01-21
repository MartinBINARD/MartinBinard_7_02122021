import { createRouter, createWebHistory } from 'vue-router'
import Submit from '../views/Submit.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/submit',
    name: 'Submit',
    component: Submit
  },
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
