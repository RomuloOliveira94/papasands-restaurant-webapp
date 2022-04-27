<template>
  <main>
    <FoodCards
      :data="data"
      title="Burger's"
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
import { getData } from "@/composables/getData";
import { addData } from "@/composables/addData";
import { onMounted, ref } from "vue";
import { useRequisitions } from "@/stores/requisitions";
import FoodCards from "@/components/FoodCards.vue";
import Modal from "@/components/ModalDescriptions.vue";

const { addToCart } = addData();
const modalDescription = ref({});
const req = useRequisitions();
const { data, load, error } = getData();
const showModal = ref(false);

const handleAddToCart = (item: Product) => {
  addToCart(req.cart, item);
};

onMounted(() => load(req.burgers));

const toggleModal = (id: number) => {
  modalDescription.value = id;
  showModal.value = !showModal.value;
};
</script>

<style lang="scss" scoped></style>
