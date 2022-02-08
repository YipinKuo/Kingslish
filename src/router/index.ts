import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Quest from "../views/Quest.vue";
import TestTTS from "../views/TestTTS.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "Home", component: Home, },
  { path: "/Quest", name: "Quest",  component: Quest, },
  { path: "/TestTTS", name: "TestTTS",  component: TestTTS, }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
