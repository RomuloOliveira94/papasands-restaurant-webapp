<template>
  <h1>CART</h1>
  <div v-if="error">{{ error }}</div>
  <div v-if="data.length">
    <div v-for="products in (data as Cart[])" :key="products.id">
      {{ products.name }} {{ products.price }}
      <button @click="handleDeleteItensFromCart(products.id)">Remove</button>
    </div>
    <button @click="handleOrder(req.orders, data as Cart[])">
      Submit Order
    </button>
  </div>
  <div v-else>
    <h1>Empty Cart</h1>
  </div>
  <h2>Total: {{ total }}</h2>
  <button @click="sum">somar</button>
</template>

<script setup lang="ts">
import type { Cart } from "@/types/Cart";
import { onMounted, ref } from "vue";
import { useRequisitions } from "@/stores/requisitions";
import { getData } from "@/composables/getData";
import { addData } from "@/composables/addData";
import axios from "axios";

const req = useRequisitions();
const total = ref(null);
const { addToOrders } = addData();
const { data, load, error } = getData();
const res = ref(data);

onMounted(() => {
  load(req.cart);
});

const handleDeleteItensFromCart = async (item: number) => {
  await axios
    .delete(req.cart + `/${item}`)
    .then(() => {
      console.log("Delete with success");
    })
    .catch((e) => (error.value = e));
  return load(req.cart);
};

const handleOrder = (url: string, order: Cart) => {
  addToOrders(url, order);
  clearCart();
};

const clearCart = async () => {
  data.value.filter(async (order) => {
    await axios
      .delete(req.cart + `/${order.id}`)
      .then(() => {
        console.log("Delete with success");
      })
      .catch((e) => e);
  });
  load(req.cart);
};

const sum = async () => {
  res.value.filter(async (value) => {
    total.value += value.price;
  });
};
</script>

<style scoped></style>
