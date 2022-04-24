<template>
  <h1>Sandwiches</h1>
  <div v-if="error">{{ error }}</div>
  <div v-if="data.length">
    <div v-for="item in data" :key="item?.id">
      <li>{{ item.name }}</li>
      <li>{{ item.price }}</li>
      <button @click="addToCart(req.cart, item.name, item.price)">
        Add to Cart
      </button>
    </div>
  </div>
  <div v-if="!error && !data.length">
    <h1>Loading...</h1>
  </div>
</template>

<script setup lang="ts">
import { getData } from "@/composables/getData";
import { addData } from "@/composables/addData";
import { onMounted } from "vue";
import { useRequisitions } from "@/stores/requisitions";

const req = useRequisitions();
const { data, load, error } = getData();
const { addToCart } = addData();
onMounted(() => load(req.sandwiches));
</script>

<style scoped></style>
