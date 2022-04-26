<template>
  <h1>Orders</h1>
  <div v-for="order in (data as Order[])" :key="order.id">
    <li>{{ order.id }}</li>
    <div v-for="item in order.order" :key="item.id">
      <li>{{ item.name }}</li>
    </div>
    <button @click="handleCancelOrder(order.id, req.orders)">
      Cancel order
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Order } from "@/types/Order";
import axios from "axios";
import { getData } from "@/composables/getData";
import { useRequisitions } from "@/stores/requisitions";
import { onMounted, ref } from "vue";

const { data, load, error } = getData();
const req = useRequisitions();

onMounted(() => load(req.orders));

const handleCancelOrder = async (item: number, url: string) => {
  await axios
    .delete(url + `/${item}`)
    .then((res) => {
      console.log("Order cancelled with success");
      load(url);
    })
    .catch((e) => (error.value = e));
};
</script>

<style scoped></style>
