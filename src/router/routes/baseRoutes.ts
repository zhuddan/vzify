import type { RouteRecordRaw } from 'vue-router';

export const homeRoutes: RouteRecordRaw = {
  path: '/',
  meta: {
    title: 'Home',
    auth: false,
  },
  component: () => import('@/views/Home.vue'),
};

export const baseRoutes: RouteRecordRaw[] = [
  homeRoutes,
  {
    path: '/login',
    meta: {
      title: '登录',
      auth: false,
    },
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/redirect/:path(.*)',
    meta: {
      auth: false,
    },
    component: () => import('@/views/redirect.vue'),
  },
  {
    path: '/:path(.*)',
    meta: {
      title: '404 not-find',
    },
    component: () => import('@/views/error/404.vue'),
  },
];
