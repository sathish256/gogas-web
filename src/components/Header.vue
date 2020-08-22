<template>
  <b-navbar class="header px-2" toggleable="lg" type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item>
        <b-icon
          shift-v="-2"
          class="h2 mb-2"
          icon="list"
          variant="light"
          @click="toggleSideMenu"
        />
      </b-nav-item>
      <b-navbar-nav class="ml-4">
        <b-nav-item to="/"><h4 class="text-white">FuelPedia</h4></b-nav-item>
      </b-navbar-nav>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item @click="logout">
        <b-icon shift-v="-2" class="h2 mb-2" icon="power" variant="danger" />
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import EventBus from "@/event-bus";

export default {
  name: "Header",

  methods: {
    toggleSideMenu() {
      EventBus.$emit("toggleSideMenu");
    },
    logout() {
      localStorage.removeItem("user_auth");
      this.$store.dispatch("logout");
      this.$router.replace("/login");
    }
  }
};
</script>

<style scoped>
.header {
  z-index: 99;
  position: fixed;
  width: 100%;
  background-image: linear-gradient(
    45deg,
    transparent,
    black,
    transparent,
    black,
    transparent
  );
}
.h2 {
  font-size: 1.75rem !important;
}
</style>
