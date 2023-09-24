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
const rooms = inject("rooms");
const target = ref({
  name: rooms[0].name,
});
const form = ref(rooms[0]);
watch(
  () => target.value.name,
  () => {
    form.value = rooms.filter((room) => room.name === target.value.name)[0];
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
const handleSubmit = async () => {
  try {
    const response = await axios.delete("room/" + `${form.value._id}`);
    alert("Delete room successfully!");
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};
</script>
