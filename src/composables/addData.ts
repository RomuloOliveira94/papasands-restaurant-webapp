import { ref } from "vue";
import type { Product } from "@/types/Product";
import type { Cart } from "@/types/Cart";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "@/firebase/config";

export const addData = () => {
  const error = ref("");
  const addToCart = async (item: Product, user?: string) => {
    const colRef = collection(db, "cart");
    try {
      await addDoc(colRef, {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description,
        userUid: user,
      });
    } catch (e) {
      error.value = "Try again later...";
    }
  };

  const submitOrder = async (
    order: Cart,
    total: number,
    address: string,
    payment: string,
    uid?: string
  ) => {
    const colRef = collection(db, "orders");

    try {
      await addDoc(colRef, {
        order: order,
        total: total,
        address: address,
        payment: payment,
        userUid: uid,
      });
    } catch (e) {
      error.value = "Try again later...";
    }
  };
  return {
    addToCart,
    submitOrder,
    error,
  };
};
