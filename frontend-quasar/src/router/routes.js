import { Cookies } from 'quasar'

const isLoggedIn = (to, form, next) => {
  if (Cookies.has('auth')) {
    next();
  } else {
    next({ name: 'submit-login' })
  }
};

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('pages/IndexPage.vue'),
        redirect: { name: 'submit-login' },
      },
      {
        path: 'submit',
        component: () => import('layouts/SubmitLayout.vue'),
        children: [
          {
            name: 'submit-login',
            path: 'login',
            component: () => import('pages/SubmitLogin.vue'),
          },
          {
            name: 'submit-recover',
            path: 'recover',
            component: () => import('pages/SubmitRecover.vue'),
          },
          {
            name: 'submit-register',
            path: 'register',
            component: () => import('pages/SubmitRegister.vue'),
          },
        ],
      },
      {
        name: 'thread-posts',
        path: 'thread',
        component: () => import('layouts/ThreadLayout.vue'),
        beforeEnter: isLoggedIn,
      },
      {
        name: 'user-profile',
        path: 'user',
        component: () => import('layouts/UserLayout.vue'),
        beforeEnter: isLoggedIn,
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
