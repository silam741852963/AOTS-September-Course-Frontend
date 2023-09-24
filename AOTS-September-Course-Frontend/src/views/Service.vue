<template>
  <section class="min-h-screen">
    <ul>
      <li v-for="service in services">{{ service }}</li>
    </ul>
  </section>
</template>
<script setup>
import { inject } from "vue";
const services = inject("services");
</script>
