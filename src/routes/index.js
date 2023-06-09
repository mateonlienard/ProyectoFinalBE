const productsApi = require("../components/products");
const cartApi = require("../components/cart");

module.exports = app =>{
    productsApi(app);
    cartApi(app);

    app.get("/", (req, res) => {
        res.send('Hola');
    });

    app.use((req, res) => {
        res.status(404).send("Ruta no encontrada");
    });
}