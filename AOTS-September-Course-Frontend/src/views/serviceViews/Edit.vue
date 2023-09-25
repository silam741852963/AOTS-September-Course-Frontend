<template>
  <section class="min-h-screen">
    <form
      @submit.prevent="handleSubmit"
      class="text-3xl flex flex-col gap-10 p-5"
    >
      <div class="formControl">
        <label for="service">Service</label>
        <select
          id="service"
          class="border-2 border-white rounded-lg bg-black"
          v-model="target.name"
        >
          <option v-for="service in services" :value="service.name">
            {{
              service.name
                .replace(/([A-Z])/g, " $1")
                .charAt(0)
                .toUpperCase() +
              service.name.replace(/([A-Z])/g, " $1").slice(1)
            }}
          </option>
        </select>
      </div>
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
        Edit
      </button>
    </form>
  </section>
</template>
<script setup>
import { inject, ref, watch } from "vue";
import axios from "../../api/axios";
const services = inject("services");
const target = ref({
  name: services[0].name,
});
const form = ref(services[0]);

watch(
  () => target.value.name,
  () => {
    form.value = {
      ...services.filter((service) => service.name === target.value.name)[0],
    };
  }
);

const handleSubmit = async () => {
  try {
    const response = await axios.put(
      "service/" + `${form.value._id}`,
      form.value
    );
    alert("Edit service successfully!");
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
