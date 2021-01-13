const Joi = require('joi');
const mongoose = require('mongoose');
const { brandSchema } = require('./brand')



const productSchema = new mongoose.Schema({
    brand: {
        type: brandSchema,
        required: true
    },
    model: {
        type: String,
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
    }
})

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {

    if(product.brandId) {
        if(product.brandId.length !== 24) { throw `Musisz podać poprawną markę`}
    } else { throw `Musisz podać poprawną markę` }
    if(!product.model || product.model==='' || product.model.includes('  ')) { throw 'Podaj poprawną nazwę modelu'};
    

    

    return product
}


exports.Product = Product;
exports.validateProduct = validateProduct;