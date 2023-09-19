<template>
  <section>
    <ul>
      <li v-for="service in services">{{ service }}</li>
    </ul>
  </section>
</template>
<script setup>
import { ref } from "vue";
import axios from "../../api/axios";

const services = ref([]);
const getServices = async () => {
  try {
    const response = await axios.get("/service");
    services.value = response.data;
  } catch (err) {
    console.log(err);
  }
};
getServices();
</script>
