<template>
  <section class="min-h-screen">
    <div v-for="[key, value] of Object.entries(display)" class="text-2xl">
      Group {{ key.toUpperCase() }} <br />
      <ul class="text-base flex gap-10 flex-wrap">
        <li v-for="room in value" @click="handleInfo(room)" class="flex gap-4">
          <figure class="text-center">
            <i class="pi pi-home" style="font-size: 5rem"></i>
            <figcaption>{{ room.name.toUpperCase() }}</figcaption>
          </figure>
          <p v-if="room.info" class="w-56">
            Type: {{ room.type.toUpperCase() }} <br />
            Price: {{ room.price }} <br />
            Status: {{ room.status.toUpperCase() }} <br />
            Renter: {{ room.renter }} <br />
            Deposit: {{ room.deposit }} <br />
            Service(s): <ul><li v-for="service in room.services">{{ serviceNames[service.serviceId]?.toUpperCase() }}</li></ul>
            Day of hire: {{ Date(room.day_of_hire) }} <br />
            Expiration date: {{ Date(room.expiration_date) }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup>
import { inject, ref } from "vue";
const rooms = inject("rooms");
const services = inject("services");
const serviceNames = ref({});
let groups = rooms.map((room) => room.group);
const onlyUnique = (value, index, array) => {
  return array.indexOf(value) === index;
};
groups = groups.filter(onlyUnique);
const display = ref({});
groups.forEach((group) => {
  display.value[group] = rooms
    .filter((room) => room.group === group)
    .map((room) => ({ ...room, info: false }));
});
services.forEach((service) => {
    serviceNames.value[service._id] = service.name;
})
const handleInfo = (room) => {
  room.info = !room.info;
};
</script>
