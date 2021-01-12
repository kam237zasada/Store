const { Seller, validateSeller } = require('../models/seller');
const { setID } = require('../js/index');
const jwt = require('jsonwebtoken');

getSeller = async (req, res) => {
    const seller = await Seller.findById(req.params.id);

    if(!seller) {return res.status(404).send("Brak takiego sprzedawcy")};

    res.send(seller);
};

getSellers = async (req, res) => {
    const sellers = await Seller.find();

    if(sellers.length<1) {return res.status(404).send("Brak zdefiniowanych sprzedawców")};

    res.send(sellers);
};

addSeller = async (req, res) => {
    try {
        validateSeller(req.body)
    } catch(err) {
        return res.status(400).send(err)
    }

    const NIPExisting = await Seller.findOne({NIP: req.body.NIP});
    if(NIPExisting) { return res.status(400).send('Istnieje już firma o podanym NIPie w bazie, sprawdź poprawność danych!')};
    
    const nameExisting = await Seller.findOne({name: req.body.name});
    if(nameExisting) { return res.status(400).send('Istnieje już firma o podanej nazwie w bazie, sprawdź poprawność danych!')};

    let sellers = await Seller.find();
    let ID = setID(sellers);

    const newSeller = {
        name: req.body.name,
        address: req.body.address,
        postalCode: req.body.postalCode,
        city: req.body.city,
        NIP: req.body.NIP,
        ID: ID
    }

    try {
        await newSeller.save();
        res.send({
            message: 'Nowy sprzedawca zdefiniowany'
        })
    } catch(err) {
        res.status(500).send('Coś poszło nie tak!')
    }
};

updateSeller = async (req, res) => {
    let seller = await Seller.findById(req.params.id);
    if(!seller) { return res.status(404).send('Nie ma takiego sprzedawcy!')};

    try {
        validateSeller(req.body);
    } catch(err) {
        return res.status(400).send(err);
    }

    const name = await Seller.findOne({name: req.body.name});
    if(name && name._id != req.params.id) { return res.status(400).send("Istnieje już firma o takiej nazwie!")};

    const NIP = await Seller.findOne({NIP: req.body.NIP});
    if(NIP && NIP._id != req.params.id) { return res.status(400).send("Istnieje już firma o takim numerze NIP!")};

    seller.set({
        name: req.body.name,
        address: req.body.address,
        postalCode: req.body.postalCode,
        city: req.body.city,
        NIP: req.body.NIP
    });

    try {
        await seller.save();
        res.send({
            message: 'Dane firmy zostały zaktualizowane'
        })
    } catch(err) {
        res.status(500).send('Coś poszło nie tak')
    }
}

module.exports = {
    getSeller,
    getSellers,
    addSeller,
    updateSeller
}