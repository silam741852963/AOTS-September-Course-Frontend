<template>
  <section class="min-h-screen">
    <div v-for="[key, value] of Object.entries(display)" class="text-2xl">
      Room {{ key.toUpperCase() }} <br />
      <ul class="text-base flex gap-10 flex-wrap">
        <li
          v-for="renter in value"
          @click="handleInfo(renter)"
          class="flex gap-4"
        >
          <figure class="text-center">
            <i class="pi pi-user" style="font-size: 5rem"></i>
            <figcaption>
              {{ renter.name }}
              <figure class="text-center" v-if="renter.main_contact">
                <i class="pi pi-phone" style="font-size: 1rem"></i>
              </figure>
            </figcaption>
          </figure>
          <p v-if="renter.info" class="w-80">
            Phone: {{ renter.phone }} <br />
            Identification card: {{ renter.identification_card }} <br />
            Status: {{ renter.birth_day.slice(0, 10) }} <br />
            Sex: {{ renter.sex ? "Male" : "Female" }} <br />
            Address: {{ renter.address }} <br />
            District: {{ renter.district }} <br />
            Province: {{ renter.province }} <br />
            Status: {{ renter.status }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup>
import { inject, ref } from "vue";
const rooms = inject("rooms");
const roomNames = ref({});
const renters = inject("renters");

const onlyUnique = (value, index, array) => {
  return array.indexOf(value) === index;
};
rooms.forEach((room) => {
  roomNames.value[room._id] = room.name;
});
let renterRooms = renters.map((renter) => roomNames.value[renter.room]);
renterRooms = renterRooms.filter(onlyUnique);

const display = ref({});
renterRooms.forEach((room) => {
  display.value[room] = renters
    .filter((renter) => roomNames.value[renter.room] == room)
    .map((renter) => ({ ...renter, info: false }));
});
const handleInfo = (renter) => {
  renter.info = !renter.info;
};
</script>
