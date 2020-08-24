<template>
  <div id="app" class="bg-light">
    <Header />
    <Login v-if="!isLoggedIn" />
    <div v-else>
      <SideBar />
      <ContentPage />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import Login from "@/views/Login";
import ContentPage from "@/views/ContentPage";

export default {
  name: "App",

  components: { ContentPage, Login, SideBar, Header },

  computed: {
    ...mapGetters(["isLoggedIn"])
  },

  created() {
    if (this.isLoggedIn) {
      this.$store.dispatch("loggedInUser");
      this.$store.dispatch("fetchAllCAndF");
      this.$store.dispatch("fetchAllDealership");
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
