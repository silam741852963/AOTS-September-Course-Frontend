<template>
  <nav class="flex justify-between px-3 sticky top-0 border-b-2 bg-black">
    <h1>
      <router-link :to="`/`" :active-class="homeActiveClasses"
        ><img src="../assets/logo.png" alt="rent a aparment logo" width="200"
      /></router-link>
    </h1>
    <ul class="self-center flex gap-5 text-2xl">
      <router-link
        class="border-opacity-0 border-2 border-white rounded-xl p-3 hover:border-opacity-100"
        :active-class="activeClasses"
        :to="`/room`"
        >Rooms</router-link
      >
      <router-link
        class="border-opacity-0 border-2 border-white rounded-xl p-3 hover:border-opacity-100"
        :active-class="activeClasses"
        :to="`/renter`"
        >Renters</router-link
      >
      <router-link
        class="border-opacity-0 border-2 border-white rounded-xl p-3 hover:border-opacity-100"
        :active-class="activeClasses"
        :to="`/service`"
        >Services</router-link
      >
      <router-link
        class="border-opacity-0 border-2 border-white rounded-xl p-3 hover:border-opacity-100"
        :active-class="activeClasses"
        :to="`/register`"
        >Register</router-link
      >
      <router-link
        class="border-opacity-0 border-2 border-white rounded-xl p-3 hover:border-opacity-100"
        :active-class="activeClasses"
        :to="`/login`"
        >Login</router-link
      >
    </ul>
  </nav>
</template>
<script setup>
const activeClasses = "border-opacity-100 scale-125";
const homeActiveClasses = "invisible";
</script>
