import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/providers",
    name: "Providers",
    component: () => import("../views/Providers.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
