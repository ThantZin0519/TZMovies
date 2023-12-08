import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/HomeNewPage.vue'; // Import your home view component

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/SearchPage',
    name: 'SearchPage',
    component: () => import(/* webpackChunkName: "SearchPage" */ '../views/SearchPage.vue')
  },
   {
    path: '/DetailPage',
    name: 'DetailPage',
    component: () => import(/* webpackChunkName: "DetailPage" */ '../views/DetailPage.vue')
  },
  {
    path: '/CastDetailPage',
    name: 'CastDetailPage',
    component: () => import(/* webpackChunkName: "CastDetailPage" */ '../views/CastDetailPage.vue')
  },
   {
    path: '/LoadingComp',
    name: 'LoadingComp',
    component: () => import(/* webpackChunkName: "LoadingComp" */ '../components/layouts/LoadingComp.vue')
  },
  // ... other routes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
