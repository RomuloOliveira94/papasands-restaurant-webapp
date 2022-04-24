import { defineStore } from "pinia";

export const useRequisitions = defineStore({
  id: "req",
  state: () => ({
    burgers: "http://localhost:3000/burgers",
    sandwiches: "http://localhost:3000/sandwiches",
    drinks: "http://localhost:3000/drinks",
    ingredients: "http://localhost:3000/ingredients",
    status: "http://localhost:3000/status",
    personal: "http://localhost:3000/personal",
    cart: "http://localhost:3000/cart",
    orders: "http://localhost:3000/orders",
  }),
  getters: {},
  actions: {},
});
