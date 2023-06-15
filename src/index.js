const express = require("express");
const PORT = 8080;
const routes = require("./routes");
const http = require('http').Server(app);
const Io = require('socket.io')(http);
const exphbs = require('express-handlebars');
const fs = require('fs');


class Server {
    constructor(){
      this.app = express();
      this.settings();
      this.routes();
      this.io = Io();
      this.socketIo();
    }
  
    settings(){
      this.app.use(express.json());
      this.app.use(express.urlencoded({extended:true}));
    }

    socketIo() {
      this.io.on('connection', (socket) => {
        // Leer el archivo JSON y enviar los datos al cliente cuando se conecta
        const productosData = fs.readFileSync('./src/productos.json');
        const productos = JSON.parse(productosData);
        socket.emit('productos', productos);
    
        // Escuchar eventos de creación y eliminación de productos
        socket.on('crearProducto', (producto) => {
          // Agregar el nuevo producto a la lista de productos
          productos.push(producto);
          // Emitir el evento de actualización a todos los clientes conectados
          this.io.emit('productos', productos);
        });
    
        socket.on('eliminarProducto', (producto) => {
          // Eliminar el producto de la lista de productos
          const index = productos.indexOf(producto);
          if (index !== -1) {
            productos.splice(index, 1);
            // Emitir el evento de actualización a todos los clientes conectados
            this.io.emit('productos', productos);
          }
        });
      });
    }
    
    views(){
      this.app.set('views', './views');
      this.app.engine('handlebars', exphbs.engine());
      this.app.set('view engine', 'handlebars');
    }

    public(){
      this.app.use(express.static('./public'))
    }

    routes(){
      routes(this.app);
    }
  
    listen(){
      const productosData = fs.readFileSync('./src/productos.json');
      const productos = JSON.parse(productosData);

      this.app.get('/', (req, res) => {
        res.render('index', { productos });
      });
      this.app.listen(PORT, ()=> {console.log(`http://localhost:${PORT}`)});
    }
  }
  
  module.exports = new Server();