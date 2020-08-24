<template>
  <div class="order-option">
    <h6 class="text-navy-blue">ORDERS</h6>
    <b-nav-item @click="redirectTo('CustomerOrder')">Customer Order</b-nav-item>
  </div>
</template>

<script>
import EventBus from "@/event-bus";

export default {
  name: "OrderOptions",

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
