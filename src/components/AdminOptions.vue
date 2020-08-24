<template>
  <div class="admin-options">
    <h6 class="text-navy-blue">MANAGE</h6>
    <b-nav-item @click="redirectTo('MyProfile')">My Profile</b-nav-item>
    <b-nav-item @click="redirectTo('ManageCnF')">C&F</b-nav-item>
    <b-nav-item @click="redirectTo('ManageDealership')">Dealership</b-nav-item>
    <b-nav-item @click="redirectTo('ManageProducts')">Products</b-nav-item>
    <h6 class="text-navy-blue mt-4">USERS</h6>
    <b-nav-item @click="redirectTo('AddUser')">Add User</b-nav-item>
  </div>
</template>

<script>
import EventBus from "@/event-bus";

export default {
  name: "AdminOptions",

  methods: {
    redirectTo(name) {
      EventBus.$emit("toggleSideMenu");
      if (this.$route.name !== name) {
        this.$router.push({ name });
      }
    }
  }
};
</script>

<style scoped>
.nav-link {
  padding: 0 1rem;
  color: black;
}
</style>
