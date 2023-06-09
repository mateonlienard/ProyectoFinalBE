const fs = require("fs");

const cartData = fs.readFileSync("../src/carrito.json");
const cart = JSON.parse(cartData);


class cartManager {
    post(req, res){
        const { products } = req.body;
    
        if (!Array.isArray(products)) {
          return res.status(400).send("La propiedad 'products' debe ser un array");
        }
    
        let Id = 0;
        const newCart = {
            id: Id+1,
          products: products,
        };
        Id++;

        cart.push(newCart);
    
        res.json(newCart);
      };
    get(req, res){
        const cartId = req.params.cid;
        const cart = cart.find((cart) => cart.id === cartId);
    
        if (!cart) {
          return res.status(404).send("Carrito no encontrado");
        }
    
        res.json(cart.products);
      };
    postId(req, res){
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity;
    
        const cart = cart.find((cart) => cart.id === cartId);
    
        if (!cart) {
          return res.status(404).send("Carrito no encontrado");
        }
    
        const existingProduct = cart.products.find(
          (product) => product.product === productId
        );
    
        if (existingProduct) {
          existingProduct.quantity += quantity || 1;
        } else {
          const newProduct = {
            product: productId,
            quantity: quantity || 1,
          };
          cart.products.push(newProduct);
        }
    
        res.json(cart);
      }
  }

module.exports = new cartManager();