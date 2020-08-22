<template>
  <div id="app" class="bg-light">
    <Header />
    <Login v-if="!isLoggedIn" />
    <div v-else>
      <SideBar />
      <div class="ml-20 pt-16">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import Login from "@/views/Login";

export default {
  name: "App",

  components: { Login, SideBar, Header },

  computed: {
    ...mapGetters(["isLoggedIn"])
  },

  created() {
    if (this.isLoggedIn) {
      this.$store.dispatch("loggedInUser");
      this.$store.dispatch("fetchAllCAndF");
      this.$store.dispatch("fetchAllProducts");
    }
  }
};
</script>

<style scoped>
#app {
  background-image: url("./assets/background.svg");
  width: 100%;
  height: 100%;
}
</style>
