<template>
  <div>
    <b-nav vertical class="bg-white sidenav">
      <b-nav-item>
        <b-icon class="h3" icon="file-text" variant="dark" />
      </b-nav-item>
    </b-nav>
    <b-nav vertical class="bg-light sidenav-secondary pl-3">
      <h6>MARKETING</h6>
    </b-nav>
  </div> </template
>s

<script>
export default {
  name: "SideBar"
};
</script>

<style scoped>
.sidenav,
.sidenav-secondary {
  height: 100%;
  position: fixed;
  top: 56px;
  overflow-x: hidden;
  padding-top: 10px;
  box-shadow: 0 0 4px #888;
}
.sidenav {
  left: 0;
  width: 60px;
  z-index: 1;
}
.sidenav-secondary {
  left: 60px;
  width: 250px;
}
.h3 {
  font-size: 1.75rem !important;
}
</style>
