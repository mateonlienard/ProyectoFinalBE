const { Router } = require("express");
const cart = require("./cartManager/cartManager.js");
const Product = require("../../dao/models/mongo/product.js");

module.exports = app => {
  let router = new Router();
  app.use("/api/carts", router);

  // Obtener todos los productos completos mediante un "populate"
  router.get('/:cid', async (req, res) => {
    try {
      const cartId = req.params.cid;
      const cartData = await cart.get(cartId).populate('products');
      res.json(cartData);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.post("/", cart.post);
  router.post('/:cid/product/:pid', cart.postId);

  // Agregar el nuevo endpoint para actualizar el carrito con un arreglo de productos
  router.put("/:cid", async (req, res) => {
    try {
      const cartId = req.params.cid;
      const { products } = req.body;
      const updatedCart = await cart.update(cartId, { products });
      res.json(updatedCart);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Agregar el nuevo endpoint para actualizar la cantidad de un producto en el carrito
  router.put("/:cid/products/:pid", async (req, res) => {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
      const { quantity } = req.body;
      const updatedCart = await cart.updateProductQuantity(cartId, productId, quantity);
      res.json(updatedCart);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Agregar el nuevo endpoint para eliminar un producto del carrito
  router.delete("/:cid/products/:pid", async (req, res) => {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
      const updatedCart = await cart.removeProduct(cartId, productId);
      res.json(updatedCart);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Agregar el nuevo endpoint para eliminar todos los productos del carrito
  router.delete("/:cid", async (req, res) => {
    try {
      const cartId = req.params.cid;
      const updatedCart = await cart.removeAllProducts(cartId);
      res.json(updatedCart);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
};
