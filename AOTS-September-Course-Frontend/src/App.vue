<template>
  <navbar></navbar>
  <RouterView></RouterView>
</template>
<script setup>
import navbar from "./components/Navbar.vue";
import { RouterView } from "vue-router";
</script>
