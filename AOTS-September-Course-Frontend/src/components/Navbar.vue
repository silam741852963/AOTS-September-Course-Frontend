<template>
  <nav>
    <h1><router-link :to="`/`">Home</router-link></h1>
    <ul>
      <router-link :to="`/room`">Rooms</router-link>
      <router-link :to="`/renter`">Renters</router-link>
      <router-link :to="`/service`">Services</router-link>
      <router-link :to="`/register`">Register</router-link>
      <router-link :to="`/login`">Login</router-link>
    </ul>
  </nav>
</template>
<script>
import { useRouter, useRoute } from "vue-router";
export default {};
</script>
