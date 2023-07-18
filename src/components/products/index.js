const { Router } = require("express");
const productos = require("./productsManager/productsManager.js");

module.exports = app => {
  let router = new Router();
  app.use("/api/products", router);

  router.get("/", (req, res) => {
    // Obtener los query params
    const { limit = 10, page = 1, sort, query } = req.query;

    // Convertir el límite y la página a números enteros
    const limitInt = parseInt(limit);
    const pageInt = parseInt(page);

    // Calcular el índice de inicio y fin para la paginación
    const startIndex = (pageInt - 1) * limitInt;
    const endIndex = pageInt * limitInt;

    // Realizar la búsqueda teniendo en cuenta el query y aplicar el límite
    let results = productos.get();
    if (query) {
      results = results.filter(producto => producto.tipo === query);
    }

    // Realizar el ordenamiento si se especificó el parámetro sort
    if (sort === "asc") {
      results = results.sort((a, b) => a.precio - b.precio);
    } else if (sort === "desc") {
      results = results.sort((a, b) => b.precio - a.precio);
    }

    // Obtener el total de páginas
    const totalPages = Math.ceil(results.length / limitInt);

    // Obtener la página anterior y siguiente
    const prevPage = pageInt > 1 ? pageInt - 1 : null;
    const nextPage = pageInt < totalPages ? pageInt + 1 : null;

    // Verificar si existen páginas previas o siguientes
    const hasPrevPage = prevPage !== null;
    const hasNextPage = nextPage !== null;

    // Obtener los resultados paginados
    const paginatedResults = results.slice(startIndex, endIndex);

    // Construir los enlaces directos a páginas previas y siguientes
    const prevLink = hasPrevPage
      ? `${req.protocol}://${req.get("host")}${req.baseUrl}?limit=${limitInt}&page=${prevPage}${
          sort ? `&sort=${sort}` : ""
        }${query ? `&query=${query}` : ""}`
      : null;

    const nextLink = hasNextPage
      ? `${req.protocol}://${req.get("host")}${req.baseUrl}?limit=${limitInt}&page=${nextPage}${
          sort ? `&sort=${sort}` : ""
        }${query ? `&query=${query}` : ""}`
      : null;

    // Enviar la respuesta con el objeto requerido
    res.json({
      status: "success",
      payload: paginatedResults,
      totalPages: totalPages,
      prevPage: prevPage,
      nextPage: nextPage,
      page: pageInt,
      hasPrevPage: hasPrevPage,
      hasNextPage: hasNextPage,
      prevLink: prevLink,
      nextLink: nextLink,
    });
  });

  router.get("/:pid", productos.getId);
  router.post("/", productos.post);
  router.put("/:pid", productos.put);
  router.delete("/:pid", productos.delete);
};
