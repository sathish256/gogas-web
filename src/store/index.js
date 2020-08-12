import Vue from "vue";
import Vuex from "vuex";
import api from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    registrations: []
  },
  mutations: {
    FETCH_PRODUCTS(state, products) {
      state.products = products;
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product);
    },
    UPDATE_PRODUCT(state, product) {
      state.products = state.products.map(p => {
        if (p.id === product.id) return product;
        return p;
      });
    },
    DELETE_PRODUCT(state, index) {
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
    fetchProducts({ commit }) {
      return api
        .getProducts()
        .then(products => {
          commit("FETCH_PRODUCTS", products.filter(Boolean));
        })
        .catch(error => {
          console.log(error);
        });
    },
    addProduct({ commit, state }, product) {
      const id = state.products.length + 1;
      return api
        .createOrUpdateProduct({ id, ...product })
        .then(addedProduct => {
          commit("ADD_PRODUCT", addedProduct);
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateProduct({ commit }, product) {
      return api
        .createOrUpdateProduct(product)
        .then(() => {
          commit("UPDATE_PRODUCT", product);
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteProduct({ commit, state }, index) {
      const { id } = state.products[index];
      return api
        .deleteProduct(id)
        .then(() => {
          commit("DELETE_PRODUCT", index);
        })
        .catch(error => {
          console.log(error);
        });
    },
    newRegistration({ commit }, formData) {
      commit("newRegistration", formData);
    }
  }
});
