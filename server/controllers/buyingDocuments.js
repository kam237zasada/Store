const { buyingDocument, validateBuyingDocument } = require('../models/buyingDocument');
const { Product, validateProduct } = require('../models/product')
const { Seller } = require('../models/seller')
const { setID } = require('../js/index');
const jwt = require('jsonwebtoken');

getBuyingDocument = async (req, res) => {
    const document = await buyingDocument.findById(req.params.id);

    if(!document) {return res.status(404).send("Nie ma takiego dokumentu zakupowego")};

    res.send(document);
};

getBuyingDocuments = async (req, res) => {
    const documents = await buyingDocument.find();

    if(documents.length<1) {return res.status(404).send("Brak dokumentów zakupowych")};

    res.send(documents);
};

addBuyingDocument = async (req, res) => {
    try {
        validateBuyingDocument(req.body);
    } catch(err) {
        return res.status(400).send(err)
    };

    // let products = req.body.products.reduce((prev, cur) => {
    //     return prev.concat(cur)
    // });

    // products.map(product => {
    //     try{
    //         validateProduct(product)
    //     } catch(err) {
    //         return res.status(400).send(err)
    //     }
    // })

    const seller = await Seller.findById(req.body.sellerId);
    if(!seller) { return res.status(404).send('Nie ma takiego sprzedawcy!')}

    // let totalPrice = req.body.products.reduce((prev, cur) => {
    //     console.log(prev.totalPrice)
    //     return prev.totalPrice + cur.totalPrice
    // });

    let documents = await buyingDocument.find();
    let ID = setID(documents);

    const newDocument = new buyingDocument({
        seller: seller,
        docNumber: req.body.docNumber,
        date: req.body.date,
        products: req.body.products,
        totalPrice: req.body.totalPrice,
        ID: ID
    })

    try {
        await newDocument.save();
        res.send({
            message: 'Dokument zakupowy dodany prawidłowo',
            seller: newDocument.seller,
            docNumber: newDocument.docNumber,
            date: newDocument.date,
            products: newDocument.products,
            totalPrice: newDocument.totalPrice,
            ID: newDocument.ID,
            _id: newDocument._id
        })

    } catch(err) { 
        console.log(err)
        res.status(500).send('Coś poszło nie tak')
    }

}

module.exports = {
    getBuyingDocument,
    getBuyingDocuments,
    addBuyingDocument
}