<template>
    <main>
    <h1>{{ title }}</h1>
    <div v-if="error">{{ error }}</div>
    <div v-if="data?.length">
      <div v-for="item in data" :key="item?.id" class="card">
        <img :src="item.image" :alt="item.name">
        <h3 class="title">{{ item.name }}</h3>
        <div class="description">
          <p>${{ item.price }}</p>
        <button @click="$emit('addToCart', item)">
          Cart
        </button>
         <!--<button @click="addToCart(req.cart, item.name, item.price)">
        Cart
        </button>-->
          <button @click="$emit('showModal', item)">Details</button>
        </div>
      </div>
    </div>
    <div v-if="!error && !data?.length">
      <h1>Loading...</h1>
    </div>
    </main>
</template>

<script setup lang="ts">
import type { Product } from '@/types/Product';

defineProps<{
    data: Product[]
    title: string
    error?: string
}>()
</script>

<style lang="scss" scoped>
@import "../assets/card.scss";
</style>