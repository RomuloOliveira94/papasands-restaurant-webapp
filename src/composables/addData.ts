import axios from "axios";
import { ref } from "vue";
import type { Product } from "@/types/Product";

export const addData = () => {
  const error = ref();
  const data = ref([]);
  const addToCart = async (url: string, item: Product) => {
    try {
      await axios
        .post(url, {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
        })
        .then((res) => (data.value = res.data));
    } catch (err) {
      error.value = err;
    }
  };
  return {
    addToCart,
    error,
    data,
  };
};
