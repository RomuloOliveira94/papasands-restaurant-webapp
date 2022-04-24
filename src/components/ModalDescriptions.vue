<template>
    <div class="backdrop" @click.self="$emit('close')">
    <div class="modal">
     <h1>{{data.name}}</h1>
      <p>{{data.description}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product }  from "@/types/Product";
defineProps<{
    data: Product
    error?: string
}>()
</script>

<style lang="scss" scoped>
.modal {
  width: 400px;
  padding: 20px;
  margin: 100px auto;
  background: white;
  border-radius: 10px;
  color: black;
  text-align: center;
  z-index: -2;
  position: absolute;
}
.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
.modal.sale {
  background-color: crimson;
  color: white;
}

.modal.sale h1, .modal.sale .actions a {
  color: white;
}
.modal.dark {
  background: black;
  color: white;
}

.modal .actions {
    text-align: center;
    margin: 30px 0 10px 0;
    color: #333;
}
.modal .actions a{
    color: #333;
    padding: 8px;
    border: 1px solid #eee;
    border-radius:4px ;
    text-decoration: none;
    margin: 10px;
}

</style>