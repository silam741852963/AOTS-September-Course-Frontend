<template>
  <navbar></navbar>
  <RouterView></RouterView>
</template>
<script>
import { ref } from "vue";
import Navbar from "./components/Navbar.vue";
import { RouterView } from "vue-router";
export default {
  components: {
    Navbar,
    RouterView,
  },
};
</script>
