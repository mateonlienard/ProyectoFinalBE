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
      this.io = Io()
    }
  
    settings(){
      this.app.use(express.json());
      this.app.use(express.urlencoded({extended:true}));
    }

    socketIo(){
      this.io.on('connection', (socket)=>{

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