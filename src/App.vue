<template>
  <div id="app">
    <Header @toggleSideMenu="onToggleSideMenu" />
    <SideBar />
    <router-view class="ml-20" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

export default {
  name: "App",

  components: { SideBar, Header },

  methods: {
    onToggleSideMenu() {}
  }
};
</script>
