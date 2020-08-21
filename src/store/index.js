import Vue from "vue";
import Vuex from "vuex";
import apiService from "@/apiService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    allCAndF: [],
    products: [],
    registrations: []
  },
  mutations: {
    LOGGED_IN_USER(state, user) {
      state.user = user;
    },
    FETCH_CANDF(state, allCAndF) {
      state.allCAndF = allCAndF;
    },
    FETCH_PRODUCTS(state, products) {
      state.products = products;
    }
  },
  actions: {
    loggedInUser({ commit }, token) {
      return apiService.get("loggedinuser", token).then(resp => {
        commit("LOGGED_IN_USER", resp.data);
      });
    },
    fetchAllCAndF({ commit }, token) {
      return apiService
        .get("v1/gogas/candf/findall", token)
        .then(resp => {
          commit("FETCH_CANDF", resp.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    createCAndF(_, { token, cAndF }) {
      return apiService.post("v1/gogas/candf", token, cAndF);
    },
    fetchProducts({ commit }, token) {
      return apiService
        .get("v1/gogas/product/findall", token)
        .then(resp => {
          commit("FETCH_PRODUCTS", resp.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
});
