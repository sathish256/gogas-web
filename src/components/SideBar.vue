<template>
  <div>
    <b-nav vertical class="bg-white sidenav">
      <b-nav-item
        v-for="(menu, index) in navItems"
        :key="index"
        @click="toggleSubMenu(index)"
        :active="menu.isActive"
        active-class="active"
      >
        <b-icon
          class="h3"
          :icon="menu.icon"
          :variant="menu.isActive ? 'light' : 'dark'"
          shift-v="-3"
        />
      </b-nav-item>
    </b-nav>
    <b-nav
      vertical
      class="bg-light sidenav-secondary pl-3"
      :class="{ show: showSubMenu }"
    >
      <MainMenuOptions v-if="navItems[0].isActive" />
    </b-nav>
  </div>
</template>

<script>
import EventBus from "@/event-bus";
import MainMenuOptions from "@/components/MainMenuOptions";

export default {
  name: "SideBar",

  components: { MainMenuOptions },

  mounted() {
    EventBus.$on("toggleSideMenu", () => {
      this.showSubMenu = !this.showSubMenu;
    });
  },

  data() {
    return {
      showSubMenu: false,
      navItems: [
        {
          icon: "file-text",
          isActive: true
        },
        {
          icon: "gear-fill",
          isActive: false
        }
      ]
    };
  },

  methods: {
    toggleSubMenu(index) {
      this.showSubMenu = !this.navItems[index].isActive || !this.showSubMenu;
      this.navItems = this.navItems.map((menu, i) => ({
        ...menu,
        isActive: i === index
      }));
    }
  }
};
</script>

<style scoped lang="scss">
.sidenav,
.sidenav-secondary {
  height: 100%;
  position: fixed;
  top: 71px;
  overflow-x: hidden;
  box-shadow: 0 0 4px #888;
}
.sidenav {
  left: 0;
  width: 60px;
  z-index: 1;
  .active {
    background-color: var(--dark);
  }
  .nav-item {
    &:hover {
      background-color: var(--dark);
      svg {
        color: var(--light) !important;
      }
    }
  }
}
.sidenav-secondary {
  left: 0;
  width: 0;
  padding-top: 0.5rem;
  transition: 0.5s;
  &.show {
    left: 60px;
    width: 250px;
  }
}
.h3 {
  font-size: 1.75rem !important;
}
</style>
