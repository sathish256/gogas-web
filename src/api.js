import axios from "axios";

const client = axios.create({
  baseURL: "https://go-gas-16f87.firebaseio.com/",
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
  getProducts() {
    return this.execute("get", "/products.json");
  },
  deleteProduct(id) {
    return this.execute("delete", `/products/${id}.json`);
  },
  createOrUpdateProduct(data) {
    return this.execute("put", `/products/${data.id}.json`, data);
  }
};
