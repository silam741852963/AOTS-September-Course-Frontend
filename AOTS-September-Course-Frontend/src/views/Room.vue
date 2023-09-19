<template>
  <section>
    <ul>
      <li v-for="room in rooms">{{ room }}</li>
    </ul>
  </section>
</template>
<script setup>
import { ref } from "vue";
import axios from "../../api/axios";
const rooms = ref([]);
const getRooms = async () => {
  try {
    const response = await axios.get("/room");
    rooms.value = response.data;
  } catch (err) {
    console.log(err);
  }
};
getRooms();
</script>
