<template>
  <div id="app" class="bg-light">
    <Header />
    <SideBar />
    <div class="ml-20 mr-4 pt-16">
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
