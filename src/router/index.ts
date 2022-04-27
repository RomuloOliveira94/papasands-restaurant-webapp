import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BurgersView from "../views/BurgersView.vue";
import SandwichesView from "../views/SandwichesView.vue";
import DrinksView from "../views/DrinksView.vue";
import CartView from "../views/CartView.vue";
import OrdersView from "@/views/OrdersView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

import { auth } from "../firebase/config";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/burgers",
      name: "burgers",
      component: BurgersView,
    },
    {
      path: "/sandwiches",
      name: "sandwiches",
      component: SandwichesView,
    },
    {
      path: "/drinks",
      name: "drinks",
      component: DrinksView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/orders",
      name: "orders",
      component: OrdersView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/:catchAll(.*)",
      name: "404",
      component: NotFoundView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  if ((to.name === "cart" && !user) || (to.name === "orders" && !user)) {
    next("/login");
  } else {
    next();
  }
});

export default router;
