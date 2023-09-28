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
        <label for="phone">Phone</label>
        <input
          type="text"
          id="phone"
          v-model="form.phone"
          autocomplete="off"
          class="border-2 border-white rounded-lg bg-black"
        />
        <p v-if="!validPhone">Please enter a valid phone number</p>
      </div>
      <div class="formControl">
        <label for="identification_card">Identification card</label>
        <input
          type="text"
          id="identification_card"
          v-model="form.identification_card"
          autocomplete="off"
          class="border-2 border-white rounded-lg bg-black"
        />
      </div>
      <div class="formControl">
        <label for="birth_day">Birth day</label>
        <input
          type="date"
          id="birth_day"
          v-model="form.birth_day"
          autocomplete="off"
          class="border-2 border-white rounded-lg bg-black"
        />
      </div>
      <div class="formControl">
        <label for="address">Address</label>
        <input
          type="text"
          id="address"
          v-model="form.address"
          autocomplete="off"
          class="border-2 border-white rounded-lg bg-black"
        />
      </div>
      <div class="formControl">
        <label for="commue">Commue</label>
        <input
          type="text"
          id="commue"
          v-model="form.commue"
          autocomplete="off"
          class="border-2 border-white rounded-lg bg-black"
        />
      </div>
      <div class="formControl">
        <label for="district">District</label>
        <input
          type="text"
          id="district"
          v-model="form.district"
          autocomplete="off"
          class="border-2 border-white rounded-lg bg-black"
        />
      </div>
      <div class="formControl">
        <label for="province">Province</label>
        <input
          type="text"
          id="province"
          v-model="form.province"
          autocomplete="off"
          class="border-2 border-white rounded-lg bg-black"
        />
      </div>
      <div class="formControl">
        <label for="main_contact">Main contact</label>
        <input
          type="checkbox"
          id="main_contact"
          value="main_contact"
          v-model="form.main_contact"
          class="border-2 border-white rounded-lg"
        />
      </div>
      <div class="formControl">
        <label for="sex">Sex</label>
        <select
          id="sex"
          class="border-2 border-white rounded-lg bg-black"
          v-model="form.sex"
        >
          <option value="true">Male</option>
          <option value="false">Female</option>
        </select>
      </div>
      <div class="formControl">
        <label for="status">Status</label>
        <input
          type="text"
          id="status"
          v-model="form.status"
          autocomplete="off"
          class="border-2 border-white rounded-lg bg-black"
        />
      </div>
      <div class="formControl flex" v-if="displayRented">
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
        <div class="formControl">
          <label for="displayRented">Show rented rooms</label>
          <input
            type="checkbox"
            id="displayRented"
            value="displayRented"
            v-model="displayRented"
            class="border-2 border-white rounded-lg"
          />
        </div>
      </div>
      <div class="formControl flex" v-if="!displayRented">
        <label for="room">Room</label>
        <select
          id="room"
          class="border-2 border-white rounded-lg bg-black"
          v-model="target.name"
        >
          <optgroup
            v-for="[key, value] of Object.entries(displayIdle)"
            :label="key.toUpperCase()"
          >
            <option v-for="room in value" :value="room.name">
              {{ room.name.toUpperCase() }}
            </option>
          </optgroup>
        </select>
        <div class="formControl">
          <label for="displayRented">Show rented rooms</label>
          <input
            type="checkbox"
            id="displayRented"
            value="displayRented"
            v-model="displayRented"
            class="border-2 border-white rounded-lg"
          />
        </div>
      </div>
      <button
        :disabled="
          !form.name ||
          !form.address ||
          !form.district ||
          !form.province ||
          !form.sex ||
          !form.status
        "
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
const rooms = inject("rooms");
const target = ref({
  name: "",
});

const form = ref({
  name: "",
  phone: "",
  identification_card: "",
  birth_day: "",
  address: "",
  commue: "",
  district: "",
  province: "",
  main_contact: "",
  sex: "",
  status: "",
  room: "",
});

watch(
  () => target.value.name,
  () => {
    form.value.room = rooms.filter(
      (room) => room.name === target.value.name
    )[0]._id;
  }
);

const handleSubmit = async () => {
  try {
    const response = await axios.post("renter", form.value);
    alert("Add renter successfully!");
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

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

const displayIdle = ref({});
groups.forEach((group) => {
  displayIdle.value[group] = rooms
    .filter((room) => room.group === group && room.status === "idle")
    .map((room) => ({ ...room, info: false }));
});

const displayRented = ref(false);

const reg1 = new RegExp(
  "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
);
const reg2 = /^\+\d{1,4} \d{3}-\d{3}-\d{4}$/;
const validPhone = ref(true);
watch(
  () => form.value.phone,
  (newPhone) => {
    if (form.value.phone) {
      validPhone.value = reg1.test(newPhone) || reg2.test(newPhone);
    } else {
      validPhone.value = true;
    }
  }
);
</script>
