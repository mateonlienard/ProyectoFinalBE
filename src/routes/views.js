const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/realtimeproducts', (req, res) => {
  const productosData = fs.readFileSync('./src/productos.json');
  const productos = JSON.parse(productosData);

  res.render('realTimeProducts', { productos });
});

module.exports = router;