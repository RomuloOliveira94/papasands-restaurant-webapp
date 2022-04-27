<template>
  <div class="form_container">
    <h1>Hey! Welcome back, what we gonna eat today?</h1>
    <form @submit.prevent="handleSubmit">
      <h2>Login</h2>
      <label for="email">Email:</label>
      <input type="email" name="email" v-model="email" required />
      <label for="password">Password:</label>
      <input type="password" name="password" v-model="password" required />
      <button>Login</button>
      <div v-if="error">{{ error }}</div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import useLogin from "../composables/useLogin";

const { login, error } = useLogin();
const router = useRouter();
const email = ref("");
const password = ref("");
const handleSubmit = async () => {
  await login(email.value, password.value);
  if (!error.value) {
    router.push("/");
  }
};
</script>

<style lang="scss">
@import "../assets/base.scss";
</style>
