import axios from "axios";
import { ref } from "vue";
import type { Cart } from "@/types/Cart";

export const addData = () => {
  const error = ref();
  const data = ref([]);
  const addToCart = async (url: string, name: string, price: number) => {
    try {
      await axios
        .post(url, {
          id: "",
          name: name,
          price: price,
        })
        .then((res) => (data.value = res.data));
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
        .then((res) => (data.value = res.data));
    } catch (err) {
      error.value = err;
    }
  };
  return {
    addToCart,
    addToOrders,
    error,
    data,
  };
};
