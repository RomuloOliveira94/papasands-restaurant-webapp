<template>
  <main class="container">
    <h1>BAG</h1>
    <div v-if="cart.length">
      <div
        v-for="product in (cart as Cart[])"
        :key="product.id"
        class="cart_container"
      >
        <ul class="cart_list">
          <li>{{ product.name }}</li>
          <li>${{ product.price }}</li>
          <button @click="handleDelete(product.id)">Remove</button>
        </ul>
      </div>
      <form class="cart_form">
        <label for="title">Address</label>
        <input type="text" name="address" v-model="address" required />
        <label for="author">Payment form</label>
        <select name="payment" v-model="payment" required>
          <option value="Credit Card">Credit Card</option>
          <option value="Cash">Cash</option>
        </select>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <h2 v-if="cart?.length">Total: ${{ getTotal() }}</h2>
      <button
        @click="handleSubmitOrder(cart as Cart, total as number)"
        id="submitOrder"
      >
        Submit Order
      </button>
    </div>
    <div v-else>
      <h2>Empty Bag :(</h2>
    </div>
  </main>
</template>

<script setup lang="ts">
import getUser from "../composables/getUser";
import { db } from "../firebase/config";
import type { Cart } from "@/types/Cart";
import { ref } from "vue";
import { useRouter } from "vue-router";
import getCollection from "@/composables/getCollections";
import { doc, deleteDoc } from "firebase/firestore";
import { addData } from "@/composables/addData";

const total = ref<number>();
const address = ref("");
const payment = ref("Cash");
const { user } = getUser();
const router = useRouter();
const { submitOrder, error } = addData();

const { documents: cart } = getCollection("cart", user.value?.uid);

const getTotal = () => {
  total.value = cart.value.reduce((acc: number, data: Cart) => {
    acc += data.price;
    return acc;
  }, 0);
  return total.value;
};

const clearCart = () => {
  cart.value.forEach(async (cart: Cart) => {
    handleDelete(cart.id);
  });
  router.push("/orders");
};

const checkObsOfOrder = () => {
  if (!address.value) {
    error.value = "You need to put the address =D";
    return false;
  }
  if (!payment.value) {
    error.value = "You need to put the payment method :]";
    return false;
  }
  return true;
};

const handleSubmitOrder = async (order: Cart, total: number) => {
  checkObsOfOrder();
  if (!checkObsOfOrder()) {
    return;
  }
  submitOrder(order, total, address.value, payment.value, user.value?.uid);
  clearCart();
  address.value = "";
  payment.value = "";
};
const handleDelete = (item: string) => {
  const docRef = doc(db, "cart", item);
  deleteDoc(docRef);
};
</script>

<style lang="scss" scoped>
@import "../assets/base.scss";
.cart_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .cart_list {
    display: flex;
    list-style: none;
    justify-content: space-between;
    margin: 25px auto;
    width: 100%;
    li {
      font-size: 1.8em;
      align-self: center;
    }
    img {
      max-width: 100%;
      width: 100px;
      border: 1px solid $secondary_color;
      border-radius: 15px;
    }
    button {
      align-self: center;
      justify-self: center;
    }
  }
}
.cart_form {
  width: 100%;
  margin: 30px auto;
  padding: 0;
  height: 30vh;
}
h2 {
  margin: 20px auto;
}
#submitOrder {
  margin-bottom: 20px;
}
</style>
