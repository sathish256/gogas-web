import Vue from "vue";
import Vuex from "vuex";
import apiService from "@/apiService";
import { get } from "lodash";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("user_auth") || null,
    user: null,
    status: { ACTIVE: "Active", INACTIVE: "Inactive" },
    roles: [
      { value: "ADMIN", text: "Admin" },
      { value: "CANDF", text: "C & F" },
      { value: "DEALER", text: "Dealer" },
      { value: "MARKETING", text: "Marketing" },
      { value: "DELIVERY", text: "Delivery" }
    ],
    allCAndF: [],
    products: [],
    registrations: []
  },
  getters: {
    isLoggedIn: state => !!state.token,
    user: state => state.user,
    userId: state => get(state, "user.id", null),
    userCAndFId: state => get(state, "user.candfId", null),
    userDealershipId: state => get(state, "user.dealershipId", null),
    status: state => state.status,
    roles: state => state.roles,
    isAdmin: state => get(state, "user.role", null) === "ADMIN",
    isCAndF: state => get(state, "user.role", null) === "CANDF",
    allCAndF: state => state.allCAndF,
    products: state => state.products
  },
  mutations: {
    AUTHENTICATE(state, token) {
      state.token = token;
    },
    LOGGED_IN_USER(state, user) {
      state.user = user;
    },
    LOGOUT(state) {
      state.token = null;
      state.user = null;
    },
    FETCH_CANDF(state, allCAndF) {
      state.allCAndF = allCAndF;
    },
    FETCH_PRODUCTS(state, products) {
      state.products = products;
    }
  },
  actions: {
    authenticate({ commit }, credentials) {
      return apiService.authenticate(credentials).then(resp => {
        localStorage.setItem("user_auth", resp.data.token);
        commit("AUTHENTICATE", resp.data.token);
      });
    },
    loggedInUser({ commit, state }) {
      return apiService.get("loggedinuser", state.token).then(resp => {
        commit("LOGGED_IN_USER", resp.data);
      });
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    fetchAllCAndF({ commit, state }) {
      return apiService
        .get("v1/gogas/candf/findall", state.token)
        .then(resp => {
          commit("FETCH_CANDF", resp.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    createCAndF({ state }, cAndF) {
      return apiService.post("v1/gogas/candf", state.token, cAndF);
    },
    updateCAndF({ state }, cAndF) {
      return apiService.put("v1/gogas/candf", state.token, cAndF);
    },
    fetchProducts({ commit, state }) {
      return apiService
        .get("v1/gogas/product/findall", state.token)
        .then(resp => {
          commit("FETCH_PRODUCTS", resp.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    createProduct({ state }, cAndF) {
      return apiService.post("v1/gogas/product", state.token, cAndF);
    },
    updateProduct({ state }, cAndF) {
      return apiService.put("v1/gogas/product", state.token, cAndF);
    }
  }
});
