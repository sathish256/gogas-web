import axios from "axios";

// const client = axios.create({
//  baseURL: "https://go-gas-16f87.firebaseio.com/",
//  json: true
// });

const client = axios.create({
  baseURL: "https://go-gas-service.herokuapp.com/v1/gogas/",
  json: true
});

export default {
  execute(method, resource, data) {
    return client({
      method,
      url: resource,
      data
    })
      .then(req => Promise.resolve(req.data))
      .catch(error => Promise.reject(error));
  },
  getAllCAndF() {
    return this.execute("get", "candf/findall");
  },
  createCAndF(data) {
    this.execute("post", "candf", data);
  }
};
