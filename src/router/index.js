import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'accueil',
    component: () => import('../pages/Accueil.vue')
  },
  {
    path: '/candidats',
    name: 'candidats',
    component: () => import('../pages/Candidats.vue')
  },
  {
    path: '/candidat/:id',
    name: 'candidat',
    component: () => import('../pages/Candidat.vue')
  },
  {
    path: '/comparer',
    name: 'comparateur',
    component: () => import('../pages/Comparateur.vue')
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: () => import('../pages/Quiz.vue')
  },
  {
    path: '/quiz/resultats',
    name: 'resultats',
    component: () => import('../pages/Resultats.vue')
  },
  {
    path: '/mentions-legales',
    name: 'mentions-legales',
    component: () => import('../pages/MentionsLegales.vue')
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('../pages/FAQ.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../pages/Contact.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
