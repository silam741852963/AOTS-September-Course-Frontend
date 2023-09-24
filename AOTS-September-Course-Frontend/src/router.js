import { createRouter, createWebHistory } from "vue-router";
import HomeVue from "./views/Home.vue";
import RoomVue from "./views/roomViews/Room.vue";
import AddRoom from "./views/roomViews/Add.vue";
import DeleteRoom from "./views/roomViews/Delete.vue";
import EditRoom from "./views/roomViews/Edit.vue";
import ListRoom from "./views/roomViews/List.vue";
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
      children: [
        {
          path: "add",
          component: AddRoom,
          meta: {
            hideNavbar: true,
          },
        },
        {
          path: "delete",
          component: DeleteRoom,
          meta: {
            hideNavbar: true,
          },
        },
        {
          path: "edit",
          component: EditRoom,
          meta: {
            hideNavbar: true,
          },
        },
        {
          path: "list",
          component: ListRoom,
          meta: {
            hideNavbar: true,
          },
        },
      ],
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
