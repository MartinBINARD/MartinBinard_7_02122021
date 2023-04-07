
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('pages/IndexPage.vue')
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
        path: 'thread',
        component: () => import('layouts/ThreadLayout.vue'),
        children: [
          {
            name: 'thread-posts',
            path: 'posts',
            component: () => import('pages/ThreadPosts.vue'),
          },
        ],
      },
      {
        path: 'user',
        component: () => import('layouts/UserLayout.vue'),
        children: [
          {
            name: 'user-profile',
            path: 'profile',
            component: () => import('pages/UserProfile.vue'),
          },
        ],
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
