<template>
  <div class="backdrop" @click.self="$emit('close')">
    <div class="modal">
      <h1>{{ data.name }}</h1>
      <img :src="data.image" :alt="data.name" />
      <p>{{ data.description }}</p>
      <button v-if="user" @click="$emit('addToCart', data)">Cart</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "@/types/Product";
import getUser from "@/composables/getUser";
const { user } = getUser();
defineProps<{
  data: Product;
  error?: string;
}>();
</script>

<style lang="scss">
@import "../assets/base.scss";
.modal {
  width: 90vw;
  height: 60vh;
  padding: 20px;
  background: white;
  border-radius: 10px;
  color: black;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 7;

  img {
    max-width: 100%;
    width: 350px;
    border: 2px solid red;
    border-radius: 10px;
  }

  p {
    margin-top: 10px;
    text-align: center;
    font-size: 1.5em;
  }
}
.backdrop {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 6;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
