const { SingleSell, validateSingleSell } = require('../models/singleSell');
const { Brand } = require('../models/brand');
const { Product } = require('../models/product');
const { setID } = require('../js/index')


getSell = async (req, res) => {
    const sell = await SingleSell.findById(req.params.id);
    if(!sell) { return res.status(404).send('Nie ma takiego sprzedanego przedmiotu')};
    res.send(sell)
};

getSells = async (req, res) => {
    const sells = await SingleSell.find();
    if(!sells) { return res.status(404).send('Nie ma jeszcze sprzedanych produktów')};
    res.send(sells)
};

addSell = async (req, res) => {
    try {
        validateSingleSell(req.body);
    } catch(err) {
        console.log("błąd")
        return res.status(400).send(err)
    }

    let brand = await Brand.findById(req.body.brandId);
    if(!brand) { return res.status(404).send('Nie ma takiej marki!')}

    let modelExists = false
    brand.models.map( model => {
        if(model===req.body.model) {
            modelExists = true
        }
    })
    if(!modelExists) { return res.status(400).send('Ten model nie jest przypisany do danej marki')}

    let product = await Product.findOne({'serialNumbers': { '$elemMatch': { "serialNumber": req.body.serialNumber}}});
    if(!product) { return res.status(400).send('Nie ma takiego numeru seryjnego')};


    let netPrice;
    let grossPrice;
    let indexToDelete;
    product.serialNumbers.map((serial, index) => {
        if(serial.serialNumber === req.body.serialNumber) {
            netPrice = serial.netPrice;
            grossPrice = serial.grossPrice
            indexToDelete = index
        }   
    })

    product.serialNumbers.splice(indexToDelete, 1);
    product.amount -=1;

    try{
        await product.save()
    } catch(err) {
        return res.status(500).send('Coś poszło nie tak')
    }



    const sells = await SingleSell.find();
    let ID = setID(sells)

    const newSell = new SingleSell({
        date: req.body.date,
        brand: brand,
        model: req.body.model,
        serialNumber: req.body.serialNumber,
        buyNetPrice: netPrice,
        buyGrossPrice: grossPrice,
        sellNetPrice: req.body.sellNetPrice,
        sellGrossPrice: req.body.sellGrossPrice,
        description: req.body.description,
        ID: ID
    });

    try {
        await newSell.save();
        res.send('Nowa sprzedaż dodana')
    } catch(err) {
        console.log(err)
        return res.status(500).send('Coś poszło nie tak')
    }

    res.send(product)



}

module.exports = {
    getSell,
    getSells,
    addSell
}
