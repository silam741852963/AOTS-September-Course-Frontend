<template>
  <section class="min-h-screen relative">
    <nav :class="navbarClasses">
      <router-link
        to="/service/list"
        active-class="scale-125 border-opacity-100"
        class="border-2 border-white rounded-lg p-3 border-opacity-0 hover:border-opacity-100"
        ><i class="pi pi-list" style="font-size: 2.5rem"></i
      ></router-link>
      <router-link
        to="/service/add"
        active-class="scale-125 border-opacity-100"
        class="border-2 border-white rounded-lg p-3 border-opacity-0 hover:border-opacity-100"
        ><i class="pi pi-plus" style="font-size: 2.5rem"></i
      ></router-link>
      <router-link
        to="/service/edit"
        active-class="scale-125 border-opacity-100"
        class="border-2 border-white rounded-lg p-3 border-opacity-0 hover:border-opacity-100"
        ><i class="pi pi-pencil" style="font-size: 2.5rem"></i
      ></router-link>
      <router-link
        to="/service/delete"
        active-class="scale-125 border-opacity-100"
        class="border-2 border-white rounded-lg p-3 border-opacity-0 hover:border-opacity-100"
        ><i class="pi pi-times" style="font-size: 2.5rem"></i
      ></router-link>
    </nav>
    <RouterView class="mr-28 border-r-2 min-h-screen"></RouterView>
  </section>
</template>
<script setup>
import { RouterView, RouterLink, useRoute } from "vue-router";
import { watch, ref } from "vue";
const route = useRoute();
let navbarClasses = !route.meta.hideNavbar
  ? ref("flex place-content-center mt-60 gap-10")
  : ref("flex flex-col absolute top-16 right-0 gap-10 pr-5");
watch(
  () => route.meta.hideNavbar,
  (newValue) => {
    if (!route.meta.hideNavbar) {
      navbarClasses.value = "flex place-content-center mt-60 gap-10";
    } else {
      navbarClasses.value = "flex flex-col absolute top-16 right-0 gap-10 pr-5";
    }
  }
);
</script>
