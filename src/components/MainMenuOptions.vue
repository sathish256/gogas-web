<template>
  <div class="main-menu-options">
    <h6 class="text-navy-blue">MARKETING</h6>
    <b-nav-item @click="redirectTo('CustomerRegistration')">
      Customer Registration
    </b-nav-item>
  </div>
</template>

<script>
import EventBus from "@/event-bus";

export default {
  name: "MainMenuOptions",

  methods: {
    redirectTo(name) {
      EventBus.$emit("toggleSideMenu");
      this.$router.push({ name });
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
