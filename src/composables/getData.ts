import axios from "axios";
import { ref } from "vue";
import type { Product } from "@/types/Product";

export const getData = () => {
  const data = ref<Product[]>([]);
  const error = ref();
  const load = async (url: string) => {
    try {
      await axios.get(url).then((res) => {
        data.value = res.data;
      });
    } catch (e) {
      error.value = e;
    }
  };
  return {
    load,
    data,
    error,
  };
};
