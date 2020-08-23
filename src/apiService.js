import Vue from "vue";
import fuelPedia from "@/main";

const APP_BASE_URL = process.env.VUE_APP_SERVER_API;

function intercept(token) {
  let http = Vue.prototype.$http;

  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  http.interceptors.response.use(
    response => response,
    error => {
      console.log(error);
      if (error.response.status === 401) {
        localStorage.removeItem("user_auth");
        fuelPedia.$store.dispatch("logout");
        fuelPedia.$router.push({ name: "Login" });
      }
      throw new Error(error);
    }
  );

  return http;
}

export default {
  authenticate(credentials) {
    const axios = intercept();

    return axios
      .post(`${APP_BASE_URL}/authenticate`, credentials)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  updatePassword(token, credentials) {
    const axios = intercept();

    return axios
      .post(`${APP_BASE_URL}/v1/gogas/user/change-password`, credentials)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  reset(credentials) {
    const axios = intercept();

    return axios
      .post(`${APP_BASE_URL}/v1/gogas/user/reset-password`, credentials)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  get(url, token) {
    const axios = intercept(token);

    return axios
      .get(`${APP_BASE_URL}/${url}`)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  post(url, token, payload) {
    const axios = intercept(token);

    return axios
      .post(`${APP_BASE_URL}/${url}`, payload)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  put(url, token, payload) {
    const axios = intercept(token);

    return axios
      .put(`${APP_BASE_URL}/${url}`, payload)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
};
