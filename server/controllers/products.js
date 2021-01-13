const { Product, validateProduct } = require('../models/product');
const { Brand } = require('../models/brand')

getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product) { return res.status(404).send('Nie ma takiego produktu')};
    res.send(product)
}

getProducts = async (req, res) => {
    const products = await Product.find();
    if(products.length===0) { return res.status(404).send('Nie ma żadnych produktów')};
    res.send(products)
}

addProduct = async (req, res) => {
    try {
        validateProduct(req.body) 
    } catch(err) {
        return res.status(400).send(err)
    }

    const brand = await Brand.findById(req.body.brandId);

    if(!brand.models.includes(req.body.model)) { return res.status(400).send('Nie ma takiego modelu wśród zadeklarowanych dla tej marki!')};
    
    let exists = await Product.findOne({"brand._id":req.body.brandId, model:req.body.model});

    let serialNumbers = req.body.serialNumbers.map(serialNumber => {
        return { serialNumber: serialNumber, netPrice: req.body.netPrice, grossPrice: req.body.grossPrice}
    })

    if(exists) {
        let amount = exists.amount +req.body.amount
        let serials = exists.serialNumbers.concat(serialNumbers);
        exists.set({
            amount: amount,
            serialNumbers: serials
            
        })

        try {
            await exists.save();
            res.send({
                message: "Produkt dodany"
            })
        } catch(err) {
            return res.status(500).send('Coś poszło nie tak')
        }
        
    } else {
        const newProduct = new Product({
            brand: brand,
            model: req.body.model,
            amount: req.body.amount,
            serialNumbers: serialNumbers
        })

        try {
        await newProduct.save();
        res.send({
            message: 'Produkt dodany'
        })
        } catch(err) {
            return res.status(500).send('Coś poszło nie tak')
        }

    }



}
module.exports = {
    getProduct,
    getProducts,
    addProduct
}