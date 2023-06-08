import { isLoggedIn } from "src/guards";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "home",
        path: "",
        component: () => import("pages/IndexPage.vue"),
        redirect: { name: "submit-login" },
      },
      {
        path: "submit",
        component: () => import("layouts/SubmitLayout.vue"),
        children: [
          {
            name: "submit-login",
            path: "login",
            component: () => import("pages/submit/SubmitLogin.vue"),
          },
          {
            name: "submit-recover",
            path: "recover",
            component: () => import("pages/submit/SubmitRecover.vue"),
          },
          {
            name: "submit-register",
            path: "register",
            component: () => import("pages/submit/SubmitRegister.vue"),
          },
        ],
      },
      {
        name: "thread-posts",
        path: "thread",
        component: () => import("layouts/ThreadLayout.vue"),
        beforeEnter: isLoggedIn,
        children: [
          {
            name: "thread-posts",
            path: "posts",
            component: () => import("pages/thread/ThreadPosts.vue"),
          },
          {
            name: "thread-user",
            path: "user",
            component: () => import("pages/thread/ThreadUser.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
