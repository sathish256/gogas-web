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
    FETCH_REGISTRATIONS(state, registrations) {
      state.registrations = registrations;
    },
    NEW_REGISTRATION(state, formData) {
      state.registrations.push(formData);
    },
    UPDATE_REGISTRATION(state, registration) {
      state.registrations = state.registrations.map(r => {
        if (r.ud === registration.id) return registration;
        return r;
      });
    }
  },
  actions: {
    fetchProducts({ commit }) {
      return api
        .getProducts()
        .then(products => {
          commit("FETCH_PRODUCTS", products);
        })
        .catch(error => {
          console.log(error);
        });
    },
    addProduct({ commit, state }, product) {
      const id = state.products.length;
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
    fetchRegistrations({ commit }) {
      return api
        .getRegistrations()
        .then(registrations => {
          commit("FETCH_REGISTRATIONS", registrations);
        })
        .catch(error => {
          console.log(error);
        });
    },
    newRegistration({ commit, state }, formData) {
      const id = state.registrations.length;
      return api
        .createOrUpdateRegistration({ id, ...formData })
        .then(registeredData => {
          commit("NEW_REGISTRATION", registeredData);
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateRegistration({ commit }, registration) {
      return api
        .createOrUpdateRegistration(registration)
        .then(() => {
          commit("UPDATE_REGISTRATION", registration);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
});
