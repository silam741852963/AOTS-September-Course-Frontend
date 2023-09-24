<template>
  <navbar class="z-50"></navbar>
  <RouterView></RouterView>
  <Footer class="z-50"></Footer>
</template>
<script setup>
import navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { RouterView } from "vue-router";
</script>
