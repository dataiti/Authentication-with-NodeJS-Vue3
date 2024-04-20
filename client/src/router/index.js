import { createWebHistory, createRouter } from "vue-router";

import LayoutAuth from "@/layouts/LayoutAuth.vue";
import RegisterPage from "@/pages/register/RegisterPage.vue";
import LoginPage from "@/pages/login/LoginPage.vue";
import HomePage from "@/pages/home/HomePage.vue";
import ForgotPasswordPage from "@/pages/forgot-pasword/ForgotPasswordPage.vue";

const routes = [
  {
    path: "/",
    component: LayoutAuth,
    children: [
      {
        path: "/register",
        name: "register",
        component: RegisterPage,
      },
      {
        path: "/login",
        name: "login",
        component: LoginPage,
      },
      {
        path: "/forgot-password",
        name: "forgot-password",
        component: ForgotPasswordPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
