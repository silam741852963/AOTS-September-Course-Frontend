<template>
  <nav class="flex justify-between mx-3">
    <h1>
      <router-link :to="`/`"
        ><img src="../assets/logo.png" alt="rent a aparment logo" width="200"
      /></router-link>
    </h1>
    <ul class="self-center flex gap-5 text-2xl">
      <router-link :to="`/room`">Rooms</router-link>
      <router-link :to="`/renter`">Renters</router-link>
      <router-link :to="`/service`">Services</router-link>
      <router-link :to="`/register`">Register</router-link>
      <router-link :to="`/login`">Login</router-link>
    </ul>
  </nav>
</template>
<script>
export default {};
</script>
