import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";
import Login from "@/views/Login";
import Marketing from "@/views/Marketing";
import Manage from "@/views/Manage";

import CustomerRegistration from "@/views/CustomerRegistration";
import ManageProducts from "@/views/ManageProducts";
import AllRegistrations from "@/views/AllRegistrations";
import AddUser from "@/views/AddUser";
import ManageDealership from "@/views/ManageDealership";
import ManageCnF from "@/views/ManageCnF";
import MyProfile from "@/views/MyProfile";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
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
    ],
    meta: {
      requiresAuth: true
    }
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
        path: "cnf",
        name: "ManageCnF",
        component: ManageCnF
      },
      {
        path: "dealership",
        name: "ManageDealership",
        component: ManageDealership
      },
      {
        path: "users/add",
        name: "AddUser",
        component: AddUser
      },
      {
        path: "profile",
        name: "MyProfile",
        component: MyProfile
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  { path: "*", redirect: "/" }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    const token = localStorage.getItem("user_auth");
    if (!token) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
