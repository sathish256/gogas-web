import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";
import Marketing from "@/views/Marketing";
import Manage from "@/views/Manage";

import CustomerRegistration from "@/views/CustomerRegistration";
import ManageProducts from "@/views/ManageProducts";
import AllRegistrations from "@/views/AllRegistrations";
import AddUser from "@/views/AddUser";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/marketing",
    name: "Marketing",
    component: Marketing,
    children: [
      {
        path: "customer-registration",
        name: "CustomerRegistration",
        component: CustomerRegistration
      },
      {
        path: "registrations",
        name: "AllRegistrations",
        component: AllRegistrations
      }
    ]
  },
  {
    path: "/manage",
    name: "Manage",
    component: Manage,
    children: [
      {
        path: "products",
        name: "ManageProducts",
        component: ManageProducts
      },
      {
        path: "users/add",
        name: "AddUser",
        component: AddUser
      }
    ]
  },
  { path: "*", redirect: "/" }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
