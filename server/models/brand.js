const mongoose = require('mongoose');


const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    models: {
        type: Array,
        default: []
    },
    ID: {
        type: Number
    }
})

const Brand = mongoose.model('Brand', brandSchema);

function validateBrand(brand) {
    if(brand.name==='') { throw `Podaj poprawną nazwę marki!`}
    if(brand.name.includes('  ')) { throw `Podaj poprawną nazwę marki!`}
    if(brand.models.length>0) {
        brand.models.map(model => {
            if(model==="" || model.includes('  ')) { throw `Podaj poprawną nazwę modelu`}
        })
    }


    return brand
}

function validateModel(model) {
    if(model.name==='') { throw `Podaj poprawną nazwę modelu!`};
    if(model.name.includes('  ')) { throw `Podaj poprawną nazwę modelu!`}

    return model
}

exports.Brand = Brand;
exports.brandSchema = brandSchema;
exports.validateBrand = validateBrand;
exports.validateModel = validateModel;