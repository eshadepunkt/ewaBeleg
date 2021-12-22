import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/home',
        component: () => import('pages/PageHome.vue'),
        name: 'Home',
      },
      {
        path: '/catalogue',
        component: () => import('pages/PageCatalogue.vue'),
        name: 'Catalogue',
      },
      {
        path: '/help',
        component: () => import('pages/PageHelp.vue'),
        name: 'Help',
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
