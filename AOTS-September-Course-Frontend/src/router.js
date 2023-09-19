import { createRouter, createWebHistory } from "vue-router";
import HomeVue from "./views/Home.vue";
import RoomVue from "./views/Room.vue";
import ServiceVue from "./views/Service.vue";
import RenterVue from "./views/Renter.vue";
import RegisterVue from "./views/Register.vue";
import LoginVue from "./views/Login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeVue,
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterVue,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginVue,
    },
    {
      path: "/room",
      name: "Room",
      component: RoomVue,
    },
    {
      path: "/renter",
      name: "Renter",
      component: RenterVue,
    },
    {
      path: "/service",
      name: "Service",
      component: ServiceVue,
    },
  ],
});

export default router;
