const fs = require("fs");

const productosData = fs.readFileSync("../src/productos.json");
const productos = JSON.parse(productosData);

class productManager {
    get(req, res){
      res.json(productos);
    }

    getId(req, res){
        const productId = req.params.pid;
        const product = productos.find((product) => product.id === parseInt(productId));
        if (!product) {
          return res.status(404).send("Producto no encontrado");
        }
    
        res.json(product); 
    }

    post(req, res){
        const { title, description, code, price, stock, category } = req.body;
    
        if (!title || !description || !code || !price || !stock || !category) {
          return res.status(400).send("Todos los campos son requeridos");
        }
    
        let Id = 0;
        const newProduct = {
          id: Id+1,
          title: 'Nuevo televisor',
          description: 'Descripcion de nuevo televisor',
          code: 'codigo de nuevo televisor',
          price: Number(15436),
          status: true,
          stock: Number(21),
          category:'Nuevos',
        };
        Id++;
    
        productos.push(newProduct);
    
        res.json(newProduct);
      };

    put(req, res){
        const productId = req.params.pid;
        const { title, description, code, price, status, stock, category } = req.body;
    
        const productToUpdate = productos.find((product) => product.id === productId);
    
        if (!productToUpdate) {
          return res.status(404).send("Producto no encontrado");
        }
    
        productToUpdate.title = title || productToUpdate.title;
        productToUpdate.description = description || productToUpdate.description;
        productToUpdate.code = code || productToUpdate.code;
        productToUpdate.price = price || productToUpdate.price;
        productToUpdate.status = status !== undefined ? status : productToUpdate.status;
        productToUpdate.stock = stock || productToUpdate.stock;
        productToUpdate.category = category || productToUpdate.category;
    
        res.json(productToUpdate);
      };

    delete(req, res){
        const productId = req.params.pid;
        const index = productos.findIndex((product) => product.id === productId);
    
        if (index === -1) {
          return res.status(404).send("Producto no encontrado");
        }
    
        const deletedProduct = productos.splice(index, 1);
    
        res.json(deletedProduct[0]);
      };
}

module.exports = new productManager();