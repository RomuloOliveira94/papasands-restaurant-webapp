<template>
  <main>
    <h1>{{ title }}</h1>
    <div v-if="error">{{ error }}</div>
    <div v-if="data" class="card_container">
      <div v-for="item in (data as Cart[])" :key="item?.id" class="card">
        <img :src="item.image" :alt="item.name" />
        <h3 class="title">{{ item.name }}</h3>
        <div class="description">
          <p>${{ item.price }}</p>
          <button v-if="user" @click="$emit('addToCart', item)">Cart</button>
          <button v-else @click="router.push('/login')">Cart</button>
          <!--<button @click="addToCart(req.cart, item.name, item.price)">
        Cart
        </button>-->
          <button @click="$emit('showModal', item)">Details</button>
        </div>
      </div>
    </div>
    <div v-if="!error && !data">
      <h1>Loading...</h1>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import getUser from "@/composables/getUser";
import type { Cart } from "@/types/Cart";

defineProps<{
  data: Cart;
  title: string;
  error?: string;
}>();

const { user } = getUser();
const router = useRouter();
</script>

<style lang="scss" scoped>
@import "../assets/base.scss";
@import "../assets/card.scss";
</style>
