import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { BootstrapVueIcons } from "bootstrap-vue";
import VueGeolocation from "vue-browser-geolocation";
import axios from "axios";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./custom.scss";

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(BootstrapVueIcons);
Vue.use(VueGeolocation);

const fuelPedia = new Vue({
  router,
  store,
  render: h => h(App)
});
fuelPedia.$mount("#app");

export default fuelPedia;
