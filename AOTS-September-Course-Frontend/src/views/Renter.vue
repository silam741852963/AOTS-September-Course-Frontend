<template>
  <section>
    <ul>
      <li v-for="renter in renters">{{ renter }}</li>
    </ul>
  </section>
</template>
<script setup>
import { ref } from "vue";
import axios from "../../api/axios";
const renters = ref([]);
const getRenters = async () => {
  try {
    const response = await axios.get("/renter");
    renters.value = response.data;
  } catch (err) {
    console.log(err);
  }
};
getRenters();
</script>
