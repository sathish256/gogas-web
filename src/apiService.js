import Vue from "vue";
import fuelPedia from "@/main";

const APP_BASE_URL = "/api";

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
        fuelPedia.$cookie.delete("user_token");
        fuelPedia.$router.push({ name: "Login" });
      }
      return error.response;
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
  get(url, token) {
    const axios = intercept(token);

    return axios
      .get(`${APP_BASE_URL}/${url}`)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
};
