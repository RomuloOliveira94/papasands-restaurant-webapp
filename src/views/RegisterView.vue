<template>
  <main class="container">
    <h1>Welcome to PapaSand's the best Fast Food!</h1>
    <form @submit.prevent="handleSubmit">
      <h2>Sign up</h2>
      <label for="email">Email:</label>
      <input type="email" name="email" v-model="email" required />
      <label for="password">Password:</label>
      <input type="password" name="password" v-model="password" required />
      <button>Sign up</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import useSignup from "../composables/useSignup";

const email = ref("");
const password = ref("");
const { signup, error } = useSignup();
const router = useRouter();

const handleSubmit = async () => {
  await signup(email.value, password.value);
  if (!error.value) {
    router.push("/");
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/base.scss";
</style>
