<template>
  <footer class="footer">
    <h3>PapaSand's the best fast food restaurant!</h3>
    <p>Developed by Rômulo Oliveira</p>
  </footer>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "../assets/base.scss";
footer {
  position: relative;
  height: 10vh;
  border-top: 1px solid rgba(0, 0, 0, 0.155);
  background-color: white;
  width: 100%;
  z-index: 2;
  h3, p{
    margin-top: 10px;
    text-align: center;
  }
}
</style>
