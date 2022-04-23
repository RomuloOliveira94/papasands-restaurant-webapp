<template>
  <div>
    <h1>CART</h1>
    <div v-for="item in data" :key="item.id">
        {{ item }}
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const data = ref()
const _cart = "http://localhost:3000/cart"

onMounted(()=> getCart())
 
const getCart = async () => {
 await axios.get(_cart).then((res) => {
   data.value = res.data
   console.log(res)
 })
}
</script>

<style scoped></style>
