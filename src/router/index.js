import { createRouter, createWebHistory } from 'vue-router';
import { appRoutes } from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    ...appRoutes
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

// createRouteGuard(router);

export default router;
