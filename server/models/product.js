const Joi = require('joi');
const mongoose = require('mongoose');
const { brandSchema } = require('./brand')
const { modelSchema } = require('./model')



const productSchema = new mongoose.Schema({
    brand: {
        type: brandSchema,
        required: true
    },
    model: {
        type: modelSchema,
        required: true
    },
    serialNumbers: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    ID: {
        type: Number
    },
    dateAdded: {
        type: Number,
        default: Date.now()
    }
})

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {

    if(product.brandId) {
        if(product.brandId.length !== 24) { throw `Musisz podać poprawną markę`}
    } else { throw `Musisz podać poprawną markę` }
    if(product.modelId) {
        if(product.modelId.length !== 24) { throw `Musisz podać poprawny model`}
    } else { throw `Musisz podać popranwy model` }

    

    return product
}


exports.Product = Product;
exports.validateProduct = validateProduct;