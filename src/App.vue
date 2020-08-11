<template>
  <div id="app" class="bg-light">
    <Header />
    <SideBar />
    <div class="ml-20 pt-16">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

export default {
  name: "App",

  components: { SideBar, Header }
};
</script>

<style scoped>
#app {
  background-image: url("./assets/background.svg");
  width: 100%;
  height: 100%;
}
</style>
