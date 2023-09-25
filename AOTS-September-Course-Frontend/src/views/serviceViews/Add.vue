<template>
  <section class="min-h-screen">
    <form
      @submit.prevent="handleSubmit"
      class="text-3xl flex flex-col gap-10 p-5"
    >
      <div class="formControl">
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          autocomplete="off"
          class="border-2 border-white rounded-lg bg-black"
        />
      </div>
      <div class="formControl">
        <label for="unit">Unit</label>
        <input
          type="text"
          id="unit"
          v-model="form.unit"
          autocomplete="off"
          class="border-2 border-white rounded-lg bg-black"
        />
      </div>
      <div class="formControl">
        <label for="price">Price</label>
        <input
          type="text"
          id="price"
          v-model="form.price"
          autocomplete="off"
          class="border-2 border-white rounded-lg bg-black"
        />
        <p v-if="!validPrice">Please enter a valid price</p>
      </div>
      <button
        :disabled="!form.name || !form.price"
        class="w-full border-2 border-white rounded-lg text-black bg-white disabled:opacity-50"
      >
        Add
      </button>
    </form>
  </section>
</template>
<script setup>
import { inject, ref, watch } from "vue";
import axios from "../../api/axios";

const form = ref({
  name: "",
  unit: "",
  price: "",
});

const handleSubmit = async () => {
  try {
    const response = await axios.post("service", form.value);
    alert("Add service successfully!");
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

const reg1 = /^\d+(\.\d+)?$/;
const validPrice = ref(true);
watch(
  () => form.value.price,
  (newPrice) => {
    if (form.value.price) {
      validPrice.value = reg1.test(newPrice) || reg2.test(newPrice);
    } else {
      validPrice.value = true;
    }
  }
);
</script>
