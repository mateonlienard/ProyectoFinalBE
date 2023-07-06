const { Schema, model } = require("mongoose");

const collectionName = "mensajes";

const collectionSchema = new Schema({
    nombre: String,
    apellido: String,
    email: {
        unique: true,
        type: String.apply,
        required: true
    },
    edad: {
        type: Date
    },
    isActive:{
        type: Boolean,
        default: true
    },
    photo: String
});

const modelEntity = model(collectionName, collectionSchema);

module.exports = modelEntity;