<template>
  <main>
    <FoodCards
      :data="sandwiches"
      title="Sandwiche's"
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

const { addToCart, error } = addData();
const modalDescription = ref({});
const showModal = ref(false);
const { user } = getUser();

const handleAddToCart = (item: Product) => {
  addToCart(item, user.value?.uid);
};

const { documents: sandwiches } = getCollection("sandwiches");

const toggleModal = (id: number) => {
  modalDescription.value = id;
  showModal.value = !showModal.value;
};
</script>

<style lang="scss" scoped></style>
