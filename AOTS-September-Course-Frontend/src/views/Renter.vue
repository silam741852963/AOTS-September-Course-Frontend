<template>
  <section class="min-h-screen">
    <ul>
      <li v-for="renter in renters">{{ renter }}</li>
    </ul>
  </section>
</template>
<script setup>
import { inject } from "vue";
const renters = inject("renters");
</script>
