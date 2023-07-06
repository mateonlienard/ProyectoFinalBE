const { Schema, model } = require("mongoose");

const collectionName = "cart";

const collectionSchema = new Schema({
    producto: String,
    usuario: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const modelEntity = model(collectionName, collectionSchema);

module.exports = modelEntity;