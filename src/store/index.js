import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    registrations: []
  },
  mutations: {
    addProduct(state, product) {
      state.products.push({ id: state.products.length + 1, ...product });
    },
    updateProduct(state, product) {
      state.products = state.products.map(p => {
        if (p.id === product.id) return product;
        return p;
      });
    },
    deleteProduct(state, index) {
      state.products.splice(index, 1);
    },
    newRegistration(state, formData) {
      state.registrations.push({
        id: state.registrations.length + 1,
        ...formData
      });
    }
  },
  actions: {
    addProduct({ commit }, product) {
      commit("addProduct", product);
    },
    updateProduct({ commit }, product) {
      commit("updateProduct", product);
    },
    deleteProduct({ commit }, index) {
      commit("deleteProduct", index);
    },
    newRegistration({ commit }, formData) {
      commit("newRegistration", formData);
    }
  }
});
