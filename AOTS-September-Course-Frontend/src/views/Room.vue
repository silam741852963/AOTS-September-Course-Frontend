<template>
  <section>
    <form @submit.prevent="handleSubmit">
      <div class="formControl">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="form.name" autocomplete="off" />
      </div>
      <div class="formControl">
        <label for="group">Group</label>
        <input type="text" id="group" v-model="form.group" autocomplete="off" />
      </div>
      <div class="formControl">
        <p v-if="!validPrice">Please enter a valid price</p>
        <label for="price">Price</label>
        <input type="text" id="price" v-model="form.price" autocomplete="off" />
      </div>
      <div class="formControl">
        <label for="type">Type</label>
        <select id="type" v-model="form.type">
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
        />
      </div>
      <button :disabled="!validPrice">Submit</button>
    </form>
  </section>
  <section>
    <ul>
      <li v-for="room in rooms">{{ room }}</li>
    </ul>
  </section>
</template>
<script setup>
import { inject, ref, watch } from "vue";
import axios from "../api/axios";
const rooms = inject("rooms");
const services = inject("services");
let addedServices = ref(
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
    const response = axios.post("room", submit);
    console.log(submit);
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
