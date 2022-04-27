<template>
  <h1>Orders</h1>
  <h2 v-if="!orders">Loading...</h2>
  <h2 v-if="!orders?.length">No orders... Yet =D</h2>
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
        ><u v-show="showUpdateA" @click="showUpdateA = !showUpdateA">{{
          order.address
        }}</u>
        <div v-if="!showUpdateA">
          <input type="text" v-model="newAddress" />
          <button @click="handleUpdateAddress(order)" id="updateButton">
            Update
          </button>
        </div>
      </strong>
    </h4>
    <h4>
      Payment form:
      <strong>
        <u v-show="showUpdateP" @click="showUpdateP = !showUpdateP">{{
          order.payment
        }}</u>
        <div v-if="!showUpdateP">
          <select name="payment" v-model="newPayment" required>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
          </select>
          <button @click="handleUpdatePayment(order)" id="updateButton">
            Update
          </button>
        </div>
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
    <p class="error">{{ error }}</p>
    <button @click="handleDelete(order)">Cancel order</button>
  </div>
</template>

<script setup lang="ts">
import getCollection from "@/composables/getCollections";
import getUser from "@/composables/getUser";
import { db } from "../firebase/config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import type { Order } from "@/types/Order";
import { ref } from "vue";

const error = ref("");
const newAddress = ref("");
const newPayment = ref("");
const showUpdateA = ref(true);
const showUpdateP = ref(true);

const { user } = getUser();
const { documents: orders } = getCollection("orders", user.value?.uid);
const handleDelete = (order: Order) => {
  const docRef = doc(db, "orders", order.id);
  deleteDoc(docRef);
};
const handleUpdateAddress = (order: Order) => {
  if (!newAddress.value) {
    error.value = "You need to fill field";
    return;
  }
  const docRef = doc(db, "orders", order.id);
  updateDoc(docRef, {
    address: newAddress.value,
  });
  showUpdateA.value = true;
  error.value = "";
  newAddress.value = "";
};
const handleUpdatePayment = (order: Order) => {
  if (!newPayment.value) {
    error.value = "You need to fill the field";
    return;
  }
  const docRef = doc(db, "orders", order.id);
  updateDoc(docRef, {
    payment: newPayment.value,
  });
  showUpdateP.value = true;
  error.value = "";
  newPayment.value = "";
};
</script>

<style lang="scss" scoped>
@import "../assets/base.scss";
.order_container {
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 25px auto;
  max-width: 960px;
  border: 4px dotted $secondary-color;
  padding: 20px;
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
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    list-style: none;
  }
  button {
    align-self: center;
  }
  #updateButton {
    align-self: center;
    padding: 2px;
    border-radius: 0px 5px 5px 0px;
  }
  input {
    border-radius: 5px 0px 0px 5px;
  }
}
</style>
