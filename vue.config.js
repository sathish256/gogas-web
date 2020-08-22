module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://go-gas-service.herokuapp.com",
        ws: true,
        changeOrigin: true,
        pathRewrite: { "^/api": "/" }
      }
    }
  }
};
