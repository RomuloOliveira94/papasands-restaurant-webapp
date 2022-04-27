<script setup lang="ts">
import Navbar from "./components/NavbarItem.vue";
import Footer from "./components/FooterItem.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <Navbar />
  <div class="container">
    <RouterView />
  </div>
  <Footer> </Footer>
</template>

<style lang="scss">
@import "./assets/base.scss";
</style>
