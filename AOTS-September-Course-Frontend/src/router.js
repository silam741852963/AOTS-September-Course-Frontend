import { createRouter, createWebHistory } from "vue-router";
import HomeVue from "./views/Home.vue";
import RoomVue from "./views/roomViews/Room.vue";
import AddRoom from "./views/roomViews/Add.vue";
import DeleteRoom from "./views/roomViews/Delete.vue";
import EditRoom from "./views/roomViews/Edit.vue";
import ListRoom from "./views/roomViews/List.vue";
import ServiceVue from "./views/serviceViews/Service.vue";
import AddService from "./views/serviceViews/Add.vue";
import DeleteService from "./views/serviceViews/Delete.vue";
import EditService from "./views/serviceViews/Edit.vue";
import ListService from "./views/serviceViews/List.vue";
import RenterVue from "./views/renterViews/Renter.vue";
import AddRenter from "./views/renterViews/Add.vue";
import DeleteRenter from "./views/renterViews/Delete.vue";
import EditRenter from "./views/renterViews/Edit.vue";
import ListRenter from "./views/renterViews/List.vue";
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
      children: [
        {
          path: "add",
          component: AddRenter,
          meta: {
            hideNavbar: true,
          },
        },
        {
          path: "delete",
          component: DeleteRenter,
          meta: {
            hideNavbar: true,
          },
        },
        {
          path: "edit",
          component: EditRenter,
          meta: {
            hideNavbar: true,
          },
        },
        {
          path: "list",
          component: ListRenter,
          meta: {
            hideNavbar: true,
          },
        },
      ],
    },
    {
      path: "/service",
      name: "Service",
      component: ServiceVue,
      children: [
        {
          path: "add",
          component: AddService,
          meta: {
            hideNavbar: true,
          },
        },
        {
          path: "delete",
          component: DeleteService,
          meta: {
            hideNavbar: true,
          },
        },
        {
          path: "edit",
          component: EditService,
          meta: {
            hideNavbar: true,
          },
        },
        {
          path: "list",
          component: ListService,
          meta: {
            hideNavbar: true,
          },
        },
      ],
    },
  ],
});

export default router;
