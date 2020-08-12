import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { BootstrapVueIcons } from "bootstrap-vue";
import VueGeolocation from "vue-browser-geolocation";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./custom.scss";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(BootstrapVueIcons);
Vue.use(VueGeolocation);

new Vue({
  router,
  store,
  beforeCreate() {
    store.dispatch("fetchProducts");
    store.dispatch("fetchRegistrations");
  },
  render: h => h(App)
}).$mount("#app");
