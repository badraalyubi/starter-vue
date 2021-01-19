import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/routers/auth";
import Home1 from "@/routers/home";

import { authenticationService } from "./_services/authentication.services";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "login" },
  },
  {
    path: "",
    name: "BlankPage",
    component: () =>
      import(/* webpackChunkName: "about" */ "./layouts/BlankPage.vue"),
    children: [...Login],
  },
  {
    path: "",
    name: "Main",
    component: () =>
      import(/* webpackChunkName: "about" */ "./layouts/Main.vue"),
    children: [...Home1],
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "./views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  const currentUser = authenticationService.currentUserValue;
  // console.log(currentUser);
  // console.log(authorize);

  if (authorize) {
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      return next({
        path: "/login",
        query: { returnUrl: to.path },
      });
    }

    // check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.role)) {
      // role not authorised so redirect to home page
      return next({ path: "/login" });
    }
  } else {
    if (authenticationService.currentUserValue) {
      return next({ path: "/dashboard" });
    }
  }

  next();
});

export default router;
