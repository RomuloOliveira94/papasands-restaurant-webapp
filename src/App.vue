<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue';
import { RouterView } from 'vue-router';
</script>

<template>
<Navbar /> 
<div class="container">
  <RouterView /> 
</div>
<Footer>

</Footer>
</template>

<style lang="scss">
@import './assets/base.scss';
.container{
  min-height: 84vh;
  margin: 1px auto;
  width: 100%;
  z-index: -100;
}

form label, form input {
  display: block;
}
form input {
  padding: 4px;
  margin-top: 10px;
  margin-bottom: 20px;
}
button {
  background: #E32929;
  color: #fff;
  border: 0;
  border-radius: 6px;
  padding: 6px;
  cursor: pointer;
}
</style>
