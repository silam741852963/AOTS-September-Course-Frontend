<template>
  <section class="min-h-screen">
    <form
      class="text-3xl flex flex-col gap-10 p-5"
      @submit.prevent="handleSubmit"
    >
      <div class="formControl">
        <label for="renter">Renter</label>
        <select
          id="renter"
          class="border-2 border-white rounded-lg bg-black"
          v-model="target.name"
        >
          <optgroup
            v-for="[key, value] of Object.entries(displayRenters)"
            :label="key.toUpperCase()"
          >
            <option v-for="renter in value" :value="renter.name">
              {{ renter.name }}
            </option>
          </optgroup>
        </select>
      </div>
      <button
        class="w-full border-2 border-white rounded-lg text-black bg-white"
      >
        Delete
      </button>
    </form>
  </section>
</template>
<script setup>
import { inject, ref, watch } from "vue";
import axios from "../../api/axios";
const renters = inject("renters");
const rooms = inject("rooms");
const target = ref({
  name: "",
});

const onlyUnique = (value, index, array) => {
  return array.indexOf(value) === index;
};
const roomNames = ref({});
rooms.forEach((room) => {
  roomNames.value[room._id] = room.name;
});
let renterRooms = renters.map((renter) => roomNames.value[renter.room]);
renterRooms = renterRooms.filter(onlyUnique);
const displayRenters = ref({});
renterRooms.forEach((room) => {
  displayRenters.value[room] = renters.filter(
    (renter) => roomNames.value[renter.room] == room
  );
});

const id = ref();
watch(
  () => target.value.name,
  () => {
    id.value = renters.filter(
      (renter) => renter.name === target.value.name
    )[0]._id;
  }
);

const handleSubmit = async () => {
  try {
    const response = await axios.delete("renter/" + `${id.value}`);
    alert("Delete renter successfully!");
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};
</script>
