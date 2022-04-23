<template>
  <div>
    <h1>BURGERS</h1>
    <div v-for="item in data" :key="item.id">
     <li>{{item.name}}</li>
     <button @click="handleAddToCart(item)">Add to Cart</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue';
const _url = "http://localhost:3000/burgers"
const _cart = "http://localhost:3000/cart"
const data = ref()

onMounted(()=> getBurgers())
 
const getBurgers = async () => {
 await axios.get(_url).then((res) => {
   data.value = res.data
   console.log(res)
 })
}

const handleAddToCart = async (item: Object) => {
  await axios.post(_cart,{
    hamburger: item
  }
  ).then((res) => console.log(res))
}

</script>

<style scoped></style>
