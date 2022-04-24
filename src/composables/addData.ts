import axios from "axios";
import { ref } from "vue";
import type { Product } from "@/types/Product";
import type { Cart } from "@/types/Cart";

export const addData = () => {
  const error = ref();
  const addToCart = async (url: string, name: string, price: string) => {
    try {
      await axios
        .post(url, {
          id: "",
          name: name,
          price: price,
        })
        .then((res) => console.log("Add to Cart"));
    } catch (err) {
      error.value = err;
    }
  };
  const addToOrders = async (url: string, item: Cart) => {
    try {
      await axios
        .post(url, {
          id: "",
          order: item,
        })
        .then((res) => console.log("Add to Order"));
    } catch (err) {
      error.value = err;
    }
  };
  return {
    addToCart,
    addToOrders,
    error,
  };
};
