const { Router } = require("express");
const productos = require("./productsManager/productsManager.js");

module.exports = app => {
  let router = new Router();
  app.use("/api/products", router);

  router.get("/", productos.get);
  router.get("/:pid", productos.getId);
  router.post("/", productos.post);
  router.put("/:pid", productos.put);
  router.delete("/:pid", productos.delete);
}