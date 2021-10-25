import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Main from '@/views/main/index.vue'
import NotFound from '@/components/notFound/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/:pathMatch(.*)*',
    component: Main
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
