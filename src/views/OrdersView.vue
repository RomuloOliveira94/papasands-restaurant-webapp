<template>
  <h1>Orders</h1>
  <h2 v-if="!orders">Loading</h2>
  <div
    v-for="order in (orders as Order[])"
    :key="order.id"
    class="order_container"
  >
    <h2>Order: #{{ order.id.slice(1, 4).toLowerCase() }}</h2>
    <div v-for="item in order.order" :key="item.id" class="itens_container">
      <li>{{ item.name }}</li>
      <li>{{ item.price }}</li>
      <li><img :src="item.image" alt="" /></li>
    </div>
    <hr />
    <h4>
      Address:
      <strong
        ><u>{{ order.address }}</u>
      </strong>
    </h4>
    <h4>
      Payment form:
      <strong>
        <u>{{ order.payment }}</u>
      </strong>
    </h4>
    <hr />
    <ul class="itens_container">
      <li><strong>Total:</strong></li>
      <li>
        <u
          ><strong>{{ order.total.toFixed(2) }}</strong></u
        >
      </li>
    </ul>
    <button @click="handleDelete(order)">Cancel order</button>
  </div>
</template>

<script setup lang="ts">
import getCollection from "@/composables/getOrders";
import getUser from "@/composables/getUser";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import type { Order } from "@/types/Order";

const { user } = getUser();
const { documents: orders } = getCollection("orders", user.value.uid);
const handleDelete = (order: Order) => {
  const docRef = doc(db, "orders", order.id);
  deleteDoc(docRef);
};
</script>

<style lang="scss" scoped>
@import "../assets/base.scss";
.order_container {
  display: flex;
  flex-direction: column;
  list-style: none;
  margin-bottom: 25px;
  margin-top: 25px;
  h2 {
    border-bottom: 1px solid $secondary-color;
    align-self: center;
  }
  h4 {
    align-self: flex-start;
  }
  li {
    u {
      font-size: 1.5em;
    }
    font-size: 1.2em;
    img {
      max-width: 100%;
      width: 80px;
      border-radius: 10px;
      border: 3px solid $secondary-color;
    }
  }
  .itens_container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    list-style: none;
  }
  button {
    align-self: center;
  }
}
</style>
