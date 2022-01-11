import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/bookshop',
        component: () => import('pages/PageBookShop.vue'),
        name: 'BookShop',
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
      {
        path: '/cart',
        component: () => import('pages/PageCart.vue'),
        name: 'Cart',
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
