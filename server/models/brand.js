const mongoose = require('mongoose');


const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ID: {
        type: Number
    }
})

const Brand = mongoose.model('Brand', brandSchema);

function validateBrand(brand) {
    if(brand.name==='') { throw `Podaj poprawną nazwę marki!`}
    if(brand.name.includes('  ')) { throw `Podaj poprawną nazwę marki!`}


    return brand
}

exports.Brand = Brand;
exports.brandSchema = brandSchema;
exports.validateBrand = validateBrand;