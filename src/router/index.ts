import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Providers",
    component: () => import("../views/Providers.vue"),
  },
  {
    path: "/provider/:slug",
    name: "Provider",
    component: () => import("../views/Provider.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
