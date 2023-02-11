import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import Dashboard from "../views/Dashboard.vue";

import Projet from "../views/Projet.vue";
import Status from "../views/Status.vue";
import Task from "../views/Task.vue";

import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({ name: "login" });
      }

      next();
    },
  },
  ,
  {
    path: "/projet",
    name: "Projet",
    component: Projet,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({ name: "login" });
      }

      next();
    },
  },
  ,
  {
    path: "/status",
    name: "Status",
    component: Status,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({ name: "login" });
      }

      next();
    },
  },
  ,
  {
    path: "/task",
    name: "Task",
    component: Task,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({ name: "login" });
      }

      next();
    },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
