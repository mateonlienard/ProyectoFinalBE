const mongoose = require("mongoose");
const {mongo} = require("./index")

let connection;
(async ()=>{
    try {
        connection = await mongoose.connect(mongo.mongo_local, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Conexion exitosa!");
    } catch (error) {
        console.log("No se pudo conectar a la base de datos");
    }
})()

module.exports = {connection};