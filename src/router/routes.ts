import { RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import WordPracticeTemplateA from "@/apps/WordPractice/WordPracticeTemplateA.vue";
import TestTTS from "@/views/TestTTS.vue";

export const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "Home", component: Home, },
  { path: "/WordPracticeTemplateA", name: "單字練習(樣式一)",  component: WordPracticeTemplateA, },
  { path: "/TestTTS", name: "TestTTS",  component: TestTTS, }
];