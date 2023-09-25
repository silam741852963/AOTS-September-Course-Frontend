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
        <label for="group">Group</label>
        <input
          type="text"
          id="group"
          v-model="form.group"
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
      <div class="formControl">
        <label for="type">Type</label>
        <select
          id="type"
          v-model="form.type"
          class="border-2 border-white rounded-lg bg-black"
        >
          <option value="normal">Normal</option>
          <option value="deluxe">Deluxe</option>
        </select>
      </div>
      <div class="formControl" v-for="(service, index) in services">
        <label for="{{ service.name }}">{{
          service.name
            .replace(/([A-Z])/g, " $1")
            .charAt(0)
            .toUpperCase() + service.name.replace(/([A-Z])/g, " $1").slice(1)
        }}</label>
        <input
          type="checkbox"
          id="{{ service.name }}"
          value="{{ service._id }}"
          v-model="addedServices[index].added"
          class="border-2 border-white rounded-lg"
        />
      </div>
      <button
        :disabled="!validPrice || !form.name || !form.group || !form.price"
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
const services = inject("services");
const addedServices = ref(
  services.map((service) => ({ ...service, added: false }))
);
const form = ref({
  name: "",
  group: "",
  type: "normal",
  price: "",
});

const handleSubmit = async () => {
  const submit = {
    ...form.value,
    services: addedServices.value
      .filter((service) => service.added)
      .map((service) => ({
        serviceId: `${service._id}`,
      })),
  };
  try {
    const response = await axios.post("room", submit);
    alert("Add room successfully!");
    console.log(response);
    form.value.name = "";
    form.value.group = "";
    form.value.price = "";
  } catch (err) {
    console.log(err);
  }
};

const reg = new RegExp("^[0-9]+$");
const validPrice = ref(true);
watch(
  () => form.value.price,
  (newPrice) => {
    if (form.value.price) {
      validPrice.value = reg.test(newPrice);
    } else {
      validPrice.value = true;
    }
  }
);
</script>
