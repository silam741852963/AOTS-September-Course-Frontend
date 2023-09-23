import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import getData from "./utils/GetData";

const app = createApp(App);
app.use(router);
const rooms = await getData("room");
const renters = await getData("renter");
const services = await getData("service");
app.provide("rooms", rooms);
app.provide("renters", renters);
app.provide("services", services);
app.mount("#app");
