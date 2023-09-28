<template>
  <section class="min-h-screen">
    <div v-for="[key, value] of Object.entries(display)" class="text-2xl">
      Room {{ key.toUpperCase() }} <br />
      <ul class="text-base flex gap-10 flex-wrap">
        <li v-for="renter in value" class="flex gap-4">
          <figure
            class="text-center cursor-pointer"
            @click="handleInfo(renter)"
          >
            <i class="pi pi-user" style="font-size: 5rem"></i>
            <figcaption>
              {{ renter.name }}
              <figure class="text-center" v-if="renter.main_contact">
                <i class="pi pi-phone" style="font-size: 1rem"></i>
              </figure>
            </figcaption>
          </figure>
          <p v-if="renter.info" class="w-80">
            <button
              class="w-44 h-6 border-2 border-white rounded-lg text-black bg-white disabled:opacity-50"
              @click="handleExport(renter)"
            >
              Export service contract
            </button>
            <br />
            Phone: {{ renter.phone }} <br />
            Identification card: {{ renter.identification_card }} <br />
            Birthday: {{ renter.birth_day.slice(0, 10) }} <br />
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
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  SectionType,
  HeadingLevel,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";

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

const handleExport = (renter) => {
  const room = rooms.filter((room) => room._id === renter.room)[0];
  const doc = new Document({
    sections: [
      {
        properties: {
          type: SectionType.CONTINUOUS,
        },
        children: [
          new Paragraph({
            text: "RENTAL SERVICE AGREEMENT",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            border: {
              bottom: {
                color: "auto",
                space: 2,
                style: "single",
                size: 12,
              },
            },
          }),
          new Paragraph({
            text: `CONTRACT NO. 10/${renter._id?.slice(
              0,
              10
            )} DATED: ${room.day_of_hire?.slice(0, 10)}`,
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: "BETWEEN",
            heading: HeadingLevel.HEADING_3,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_4,
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: "OWNER",
              }),
              new TextRun({
                text: "RENT A APARTMENT (RAA), 1234 Elm Street Maplewood, Anytown 56789, Fictional Country.",
                break: 2,
              }),
              new TextRun({
                text: "Phone: 555-123-4567",
                break: 1,
              }),
              new TextRun({
                text: "Email: raa.rent@example.com",
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            text: "AND",
            heading: HeadingLevel.HEADING_3,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_4,
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: "RENTER",
              }),
              new TextRun({
                text: `Name: ${renter.name}`,
                break: 2,
              }),
              new TextRun({
                text: `Phone: ${renter.phone}`,
                break: 1,
              }),
              new TextRun({
                text: `Identification card: ${renter.identification_card}`,
                break: 1,
              }),
              new TextRun({
                text: `Birthday: ${renter.birth_day.slice(0, 10)}`,
                break: 1,
              }),
              new TextRun({
                text: `Sex: ${renter.sex ? "Male" : "Female"}`,
                break: 1,
              }),
              new TextRun({
                text: `Address: ${renter.address}`,
                break: 1,
              }),
              new TextRun({
                text: `Day of hire: ${room.day_of_hire}`,
                break: 1,
              }),
              new TextRun({
                text: `Expiration date: ${room.expiration_date}`,
                break: 1,
              }),
            ],
          }),
        ],
      },
    ],
  });
  Packer.toBlob(doc).then((blob) => {
    console.log(blob);
    saveAs(blob, `${renter.name}-${renter._id.slice(0, 10)}`);
    console.log("Document created successfully");
  });
};
</script>
