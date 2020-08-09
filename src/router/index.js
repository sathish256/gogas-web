import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";
import CustomerRegistration from "@/views/CustomerRegistration";
import Marketing from "@/views/Marketing";

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
