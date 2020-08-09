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
    </b-navbar-nav>
    <b-navbar-brand class="ml-4 pt-0">GoGas</b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-item>
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
    }
  }
};
</script>

<style scoped>
.header {
  z-index: 2;
}
.h2 {
  font-size: 1.75rem !important;
}
</style>
