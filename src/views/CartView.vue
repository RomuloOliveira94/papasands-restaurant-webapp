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
  <h2>Total: {{ handleTotal }}</h2>
</template>

<script setup lang="ts">
import type { Cart } from "@/types/Cart";
import { computed, onMounted,  ref } from "vue";
import { useRequisitions } from "@/stores/requisitions";
import { getData } from "@/composables/getData";
import { addData } from "@/composables/addData";
import axios from "axios";
import router from "@/router";

const req = useRequisitions();
const total = ref<Cart['price']>();
const { addToOrders } = addData();
const { data, load, error } = getData();

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
  load(req.cart)
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
  router.push('/orders')
};

const handleTotal = computed(() => {
  data.value.map((value) => {
  total.value += value.price 
  });
  return total.value
});
</script>

<style scoped></style>
