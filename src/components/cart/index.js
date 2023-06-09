const { Router } = require("express");
const cart = require("./cartManager/cartManager.js");

module.exports = app => {
  let router = new Router();
  app.use("/api/carts", router);

    router.post("/", cart.post);
    router.get('/:cid', cart.get);
    router.post('/:cid/product/:pid', cart.postId);
}
