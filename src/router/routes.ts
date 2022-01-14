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
      {
        path: '/search',
        component: () => import('pages/PageSearch.vue'),
        name: 'Search',
      },
      {
        path: '/success',
        component: () => import('pages/OrderSuccess.vue'),
        name: 'OrderSuccess',
      },
      {
        path: '/cancel',
        component: () => import('pages/OrderCancel.vue'),
        name: 'OrderCancel',
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
