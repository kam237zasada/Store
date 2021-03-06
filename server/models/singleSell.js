const { date } = require('joi');
const mongoose = require('mongoose');


const singleSellSchema = new mongoose.Schema({
    date: {
        type: Number,
        required: true
    },
    brand: {
        type: Object,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    serialNumber: {
        type: String,
        required: true
    },
    buyNetPrice: {
        type: Number,
        required: true
    },
    buyGrossPrice: {
        type: Number,
        required: true
    },
    sellNetPrice: {
        type: Number,
        required: true
    },
    sellGrossPrice: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    ID: {
        type: Number
    }
})

const SingleSell = mongoose.model('SingleSell', singleSellSchema);

function validateSingleSell(singleSell) {
    let date = singleSell.date.toString();
    let grossPrice = singleSell.sellGrossPrice.toString();
    if(!singleSell.date || singleSell.date==='' || date.includes(' ')) { throw `Podaj poprawną datę!`};
    if(!singleSell.brandId || singleSell.brandId.length!==24 || singleSell.brandId.includes(' ')) { throw `Podaj poprawną markę!`};
    if(!singleSell.model || singleSell.model==='' || singleSell.model.includes('  ')) { throw `Podaj poprawny model!`};
    if(!singleSell.serialNumber || singleSell.serialNumber==='' || singleSell.serialNumber.includes('  ')) { throw `Podaj poprawny numer seryjny!`};
    if(!singleSell.sellNetPrice || singleSell.sellNetPrice==='' || !singleSell.sellNetPrice.match(/\b\d{1,}\.\d{2}\b/ || /\s/.test(singleSell.sellNetPrice))) { throw `Niepoprawny format kwoty!`}
    if(!singleSell.sellGrossPrice || singleSell.sellGrossPrice==='' || !grossPrice.match(/\b\d{1,}\.\d{2}\b/) || /\s/.test(grossPrice)) { throw `Niepoprawny format kwoty!`}

    return singleSell
};

exports.SingleSell = SingleSell;
exports.validateSingleSell = validateSingleSell;

