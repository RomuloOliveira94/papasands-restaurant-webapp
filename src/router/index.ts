import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BurgersView from "../views/BurgersView.vue";
import SandwichesView from "../views/SandwichesView.vue";
import DrinksView from "../views/DrinksView.vue";
import CartView from "../views/CartView.vue";
import PersonalView from "@/views/PersonalView.vue"
import OrdersView from "@/views/OrdersView.vue";

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
    },
    {
      path: "/orders",
      name: "orders",
      component: OrdersView,
    }
  ],
});

export default router;
