import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      path: "/",
      meta: { layout: "main" },
      component: () => import("@/views/HomeView.vue")
    },
    {
      name: "payment",
      path: "/payment",
      component: () => import("@/views/PaymentView.vue")
    }
  ]
})

export default router
