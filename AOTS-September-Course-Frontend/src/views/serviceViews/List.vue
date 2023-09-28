<template>
  <section class="min-h-screen">
    <ul class="flex gap-7 flex-wrap">
      <li
        v-for="service in display"
        class="flex m-3 gap-3"
      >
        <figure class="text-center cursor-pointer" @click="handleInfo(service)">
          <i class="pi pi-slack" style="font-size: 5rem"></i>
          <figcaption>
            {{
              service.name
                .replace(/([A-Z])/g, " $1")
                .charAt(0)
                .toUpperCase() +
              service.name.replace(/([A-Z])/g, " $1").slice(1)
            }}
          </figcaption>
        </figure>
        <p v-if="service.info">
          <p v-if="service.unit ? true : false">Unit: {{ service.unit }}</p>
          <p>Price: {{ service.price }}</p>
        </p>
      </li>
    </ul>
  </section>
</template>
<script setup>
import { inject, ref } from "vue";
const services = inject("services");
const display = ref(services.map((service) => ({ ...service, info: false })));
const handleInfo = (service) => {
  service.info = !service.info;
};
</script>
