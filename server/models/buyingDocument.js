const mongoose = require('mongoose');
const { sellerSchema } = require('./seller')



const buyingDocumentSchema = new mongoose.Schema({
    seller: {
        type: sellerSchema,
        required: true
    },
    docNumber: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    totalPrice: {
        type: Number
    },
    ID: {
        type: Number
    }
})

const buyingDocument = mongoose.model('buyingDocument', buyingDocumentSchema);

function validateBuyingDocument(doc) {
    if(doc.docNumber==='') { throw `Podaj numer dokumentu!`};
    if(doc.date==='') { throw `Podaj datę dokumentu zakupowego`};
    if(doc.products.length===0) { throw `Dokument zakupowy musi zawierać produkty!`};
    if(doc.sellerId.length!==24 || !doc.sellerId) { throw `Musisz podać sprzedawcę!`};
    
    return doc
}

exports.buyingDocument = buyingDocument;
exports.buyingDocumentSchema = buyingDocumentSchema;
exports.validateBuyingDocument = validateBuyingDocument;