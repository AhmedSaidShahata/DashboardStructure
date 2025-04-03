import {
  createRouter,
  createWebHistory,
} from 'vue-router'

import Layout from "@/layouts/main/index.vue";
import asyncRoutes  from './asyncRoutes.js';
import authMiddleware from "@/middleware/auth";


let routes = [
  {
    path: "",
    component: Layout,
    redirect: '/dashboard',
    props: true,
    meta: {
      title: "home"
    },
    children: [
      {
        path: "/dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "home",
        meta: {
          icon: "mdi-home-variant-outline",
          title: "home"
        }
      },
      ...asyncRoutes
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "login"
    },
    hidden: true
  },
];



const router = createRouter({
  history: createWebHistory(),
  routes,
})

authMiddleware(router)

export default router;


