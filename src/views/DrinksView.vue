<template>
  <main>
    <FoodCards
      :data="drinks"
      title="Drinks's"
      :error="error"
      @show-modal="toggleModal"
      @add-to-cart="handleAddToCart"
    />
    <div v-if="showModal">
      <Modal
        :data="(modalDescription as Product)"
        :error="error"
        @close="toggleModal"
        @add-to-cart="handleAddToCart"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import type { Product } from "@/types/Product";
import { addData } from "@/composables/addData";
import { ref } from "vue";
import FoodCards from "@/components/FoodCards.vue";
import Modal from "@/components/ModalDescriptions.vue";
import getUser from "@/composables/getUser";
import getCollection from "@/composables/getCollections";
import { useRouter } from "vue-router";

const router = useRouter();
const modalDescription = ref({});
const showModal = ref(false);
const { addToCart, error } = addData();
const { user } = getUser();

const handleAddToCart = (item: Product) => {
  addToCart(item, user.value?.uid);
  router.push({ name: "cart" });
};

const { documents: drinks } = getCollection("drinks");

const toggleModal = (id: number) => {
  modalDescription.value = id;
  showModal.value = !showModal.value;
};
</script>

<style lang="scss" scoped></style>
