const { Router } = require("express");
const products = require("./productsManager/productsManager.js");

module.exports = app => {
  let router = new Router();
  app.use("/products", router);

  router.get("/", async (req, res) => {
    try {
      const { page = 1 } = req.query;
      const limit = 10; // Número de productos por página (puedes ajustar este valor según tus necesidades)

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const allProducts = await products.getAll(); // Supongamos que hay un método "getAll" para obtener todos los productos
      const paginatedProducts = allProducts.slice(startIndex, endIndex);

      const totalPages = Math.ceil(allProducts.length / limit);

      res.render("productsListView", {
        products: paginatedProducts,
        pagination: {
          totalPages,
          nextPage: page < totalPages ? parseInt(page) + 1 : null,
          prevPage: page > 1 ? parseInt(page) - 1 : null,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        showAddToCartButton: true, // Mostrar el botón "Agregar al Carrito" directamente en la lista
        cartId: "ID_DEL_CARRITO", // Reemplaza esto con el ID del carrito correspondiente
      });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get("/:pid", async (req, res) => {
    try {
      const productId = req.params.pid;
      const product = await products.getProductById(productId); // Supongamos que hay un método "getProductById" para obtener un producto por su ID

      res.render("productDetailsView", {
        product,
        showAddToCartButton: false, // No mostrar el botón "Agregar al Carrito", ya que se muestra en la vista de detalles
        cartId: "ID_DEL_CARRITO", // Reemplaza esto con el ID del carrito correspondiente
      });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
};
