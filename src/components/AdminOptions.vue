<template>
  <div class="admin-options">
    <h6 class="text-navy-blue">INVENTORY</h6>
    <b-nav-item @click="redirectTo('ManageProducts')"
      >Manage Products</b-nav-item
    >
    <h6 class="text-navy-blue">USERS</h6>
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

<style scoped lang="scss">
.nav-link {
  padding: 0 1rem;
  color: black;
}
</style>
