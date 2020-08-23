import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { BootstrapVueIcons } from "bootstrap-vue";
import VueGeolocation from "vue-browser-geolocation";
import axios from "axios";
import firebase from "firebase/app";

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
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyA92s_kSY_uRH_2VriwweBN6Y_CJDLKtvw",
      authDomain: "fuel-connect-c9098.firebaseapp.com",
      databaseURL: "https://fuel-connect-c9098.firebaseio.com",
      projectId: "fuel-connect-c9098",
      storageBucket: "gs://fuel-connect-c9098.appspot.com"
    });
  }
});
fuelPedia.$mount("#app");

export default fuelPedia;
