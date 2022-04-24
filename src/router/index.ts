import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BurgersView from "../views/BurgersView.vue";
import SandwichesView from "../views/SandwichesView.vue";
import DrinksView from "../views/DrinksView.vue";
import CartView from "../views/CartView.vue";
import PersonalView from "@/views/PersonalView.vue"
import OrdersView from "@/views/OrdersView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";

import { auth } from '../firebase/config'

const requireAuth = (to: any, from: any, next: (arg0?: { name: string; } | undefined) => void) => {
  let user = auth.currentUser
  if (!user) {
    next({ name: 'login' })
  } else {
    next()
  }
}

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
      path: "/personal",
      name: "personal",
      component: PersonalView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
      beforeEnter: requireAuth
    },
    {
      path: "/orders",
      name: "orders",
      component: OrdersView,
      beforeEnter: requireAuth
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
    }
  ],
});

export default router;
