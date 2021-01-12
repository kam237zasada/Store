const mongoose = require('mongoose');


const modelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ID: {
        type: Number
    }
})

const Model = mongoose.model('Model', modelSchema);

function validateModel(model) {
    if(model.name==='') { throw `Podaj poprawną nazwę modelu!`};
    if(model.name.includes('  ')) { throw `Podaj poprawną nazwę modelu!`}

    return model
}

exports.Model = Model;
exports.modelSchema = modelSchema;
exports.validateModel = validateModel;