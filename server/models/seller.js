const mongoose = require('mongoose');


const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    NIP: {
        type: String,
        required: true
    },
    ID: {
        type: Number
    }
})

const Seller = mongoose.model('Seller', sellerSchema);

function validateSeller(seller) {
    if(seller.name==='') { throw `Podaj nazwę firmy!`}
    if(seller.address==='') { throw `Podaj adres firmy!`}
    if(!/\d/.test(seller.address)) { throw `Podaj numer w adresie!`}
    if(!seller.postalCode.match(/\b\d{2}-\d{3}\b/)) { throw `Podaj poprawny format kodu pocztowego! Na przykład 00-000`}
    if(seller.city==='') { throw `Podaj miasto!`}
    if(seller.NIP==='') { throw `Podaj NIP firmy!`}
    if(/\D/.test(seller.NIP)) { throw `Numer NIP nie można zawierać innych znaków niż liczby!`}
    if(seller.NIP.length!==10) { throw `Numer NIP musi zawierać 10 cyfr!`}



    return seller
}

exports.Seller = Seller;
exports.sellerSchema = sellerSchema;
exports.validateSeller = validateSeller;