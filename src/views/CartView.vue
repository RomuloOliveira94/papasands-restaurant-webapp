<template>
  <main class="container">
    <h1>Cart</h1>
    <div v-if="data.length">
      <div
        v-for="product in (data as Cart[])"
        :key="product.id"
        class="cart_container"
      >
        <ul class="cart_list">
          <li>{{ product.name }}</li>
          <img :src="product.image" :alt="product.name" />
          <li>${{ product.price }}</li>
          <button @click="handleDeleteItensFromCart(product.id)">Remove</button>
        </ul>
      </div>
      <form>
        <label for="title">Address</label>
        <input type="text" name="address" v-model="address" required />
        <label for="author">Payment form</label>
        <select name="payment" v-model="payment" required>
          <option value="Credit Card">Credit Card</option>
          <option value="Cash">Cash</option>
        </select>
        {{ payment }}
      </form>
      <div v-if="error">{{ error }}</div>
      <button @click="handleSubmitOrder(data as Cart, total as number)">
        Submit Order
      </button>
    </div>
    <div v-else>
      <h1>Empty Bag :(</h1>
    </div>
    <h2 v-if="data.length">Total: ${{ getTotal() }}</h2>
  </main>
</template>

<script setup lang="ts">
import getUser from "../composables/getUser";
import { db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import type { Cart } from "@/types/Cart";
import { onMounted, ref } from "vue";
import { useRequisitions } from "@/stores/requisitions";
import { getData } from "@/composables/getData";
import { addData } from "@/composables/addData";
import axios from "axios";
import { useRouter } from "vue-router";

const req = useRequisitions();
const total = ref<number>();
const { data, load, error } = getData();
const address = ref("");
const payment = ref("");
const { user } = getUser();
const router = useRouter();

onMounted(() => {
  load(req.cart);
});

const getTotal = () => {
  total.value = data.value.reduce((acc, data) => {
    acc += data.price;
    return acc;
  }, 0);
  return total.value.toFixed(2);
};

const handleDeleteItensFromCart = async (item: number) => {
  await axios
    .delete(req.cart + `/${item}`)
    .then(() => {
      console.log("Delete with success");
    })
    .catch((e) => (error.value = e));
  load(req.cart);
};

const clearCart = () => {
  data.value.filter(async (order) => {
    await axios
      .delete(req.cart + `/${order.id}`)
      .then(() => {
        console.log("Delete with success");
      })
      .catch((e) => e);
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
  const colRef = collection(db, "orders");
  await addDoc(colRef, {
    order: order,
    total: total,
    address: address.value,
    payment: payment.value,
    userUid: user?.value?.uid,
  });
  clearCart();
  address.value = "";
  payment.value = "";
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
      margin-top: 20px auto;
      align-self: center;
      justify-self: center;
    }
  }
}

h2 {
  margin-top: 20px;
}
</style>
