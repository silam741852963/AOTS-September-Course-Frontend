<template>
  <section class="min-h-screen">
    <form
      class="text-3xl flex flex-col gap-10 p-5"
      @submit.prevent="handleSubmit"
    >
      <div class="formControl">
        <label for="room">Room</label>
        <select
          id="room"
          class="border-2 border-white rounded-lg bg-black"
          v-model="target.name"
        >
          <optgroup
            v-for="[key, value] of Object.entries(display)"
            :label="key.toUpperCase()"
          >
            <option v-for="room in value" :value="room.name">
              {{ room.name.toUpperCase() }}
            </option>
          </optgroup>
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
      <div class="formControl">
        <label for="deposit">Deposit</label>
        <input
          type="text"
          id="deposit"
          v-model="form.deposit"
          autocomplete="off"
          class="border-2 border-white rounded-lg bg-black"
        />
        <p v-if="!validDeposit">Please enter a valid deposit</p>
      </div>
      <div class="formControl">
        <label for="status">Status</label>
        <select
          id="status"
          v-model="form.status"
          class="border-2 border-white rounded-lg bg-black"
        >
          <option value="idle">Idle</option>
          <option value="rented">Rented</option>
        </select>
      </div>
      <div class="formControl">
        <label for="renter">Renter</label>
        <input
          type="text"
          id="renter"
          v-model="form.renter"
          autocomplete="off"
          class="border-2 border-white rounded-lg bg-black"
        />
        <p v-if="!validRenter">Please enter a valid renter number</p>
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
          :checked="formServices[service._id]"
        />
      </div>
      <div class="formControl">
        <label for="day_of_hire">Day of hire</label>
        <input
          type="date"
          id="day_of_hire"
          v-model="form.day_of_hire"
          autocomplete="off"
          class="border-2 border-white rounded-lg bg-black"
        />
      </div>
      <div class="formControl">
        <label for="expiration_date">Expiration date</label>
        <input
          type="date"
          id="expiration_date"
          v-model="form.expiration_date"
          autocomplete="off"
          class="border-2 border-white rounded-lg bg-black"
        />
      </div>
      <button
        :disabled="
          !validPrice ||
          !form.name ||
          !form.group ||
          !form.price ||
          !validDeposit ||
          !validRenter
        "
        class="w-full border-2 border-white rounded-lg text-black bg-white disabled:opacity-50"
      >
        Save
      </button>
    </form>
  </section>
</template>
<script setup>
import { inject, ref, watch } from "vue";
import axios from "../../api/axios";
const rooms = inject("rooms");
const services = inject("services");

const target = ref({
  name: rooms[0].name,
});
const form = ref(rooms[0]);
const formServices = ref({});
services.forEach((service) => {
  formServices.value[service._id] = false;
});
form.value.services.forEach((service) => {
  formServices[service.serviceId] = true;
});

const addedServices = ref(
  services.map((service) => ({
    ...service,
    added: formServices[service._id] ? true : false,
  }))
);
watch(
  () => target.value.name,
  () => {
    form.value = rooms.filter((room) => room.name === target.value.name)[0];
    form.value.day_of_hire = form.value.day_of_hire?.slice(0, 10);
    form.value.expiration_date = form.value.expiration_date?.slice(0, 10);
    services.forEach((service) => {
      formServices[service._id] = false;
    });
    form.value.services.forEach((service) => {
      formServices[service.serviceId] = true;
    });
    addedServices.value = services.map((service) => ({
      ...service,
      added: formServices[service._id] ? true : false,
    }));
  }
);

let groups = rooms.map((room) => room.group);
const onlyUnique = (value, index, array) => {
  return array.indexOf(value) === index;
};
groups = groups.filter(onlyUnique);
const display = ref({});
groups.forEach((group) => {
  display.value[group] = rooms
    .filter((room) => room.group === group)
    .map((room) => ({ ...room, info: false }));
});

const reg = new RegExp("^[0-9]+$");
const validPrice = ref(true);
const validDeposit = ref(true);
const validRenter = ref(true);
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
watch(
  () => form.value.deposit,
  (newDeposit) => {
    if (form.value.deposit) {
      validDeposit.value = reg.test(newDeposit);
    } else {
      validDeposit.value = true;
    }
  }
);
watch(
  () => form.value.renter,
  (newRenter) => {
    if (form.value.renter) {
      validRenter.value = reg.test(newRenter);
    } else {
      validRenter.value = true;
    }
  }
);
const handleSubmit = async () => {
  const submit = {
    ...form.value,
    services: addedServices.value
      .filter((service) => service.added)
      .map((service) => ({
        serviceId: `${service._id}`,
      })),
  };
  delete submit._id;
  try {
    const response = await axios.put("room/" + `${form.value._id}`, submit);
    alert("Edit room successfully!");
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};
</script>
