const { Brand, validateBrand, validateModel } = require('../models/brand');
const { setID, compareNumbers } = require('../js/index');

getBrand = async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    if(!brand) { return res.status(404).send("Nie ma takiej marki.")}
    res.send(brand);
};

getBrands = async (req, res) => {
    const brands = await Brand.find().sort('name');
    if(brands.length===0) { return res.status(404).send('Brak zdefiiowanych marek')};
    res.send(brands)
};

addBrand = async (req, res) => {
    try {
        validateBrand(req.body)
    } catch(err) {
        return res.status(400).send(err)
    }

    const nameExisting = await Brand.findOne({name: req.body.name});
    if(nameExisting) { return res.status(400).send('Istnieje już marka o podanej nazwie!')};


    if(req.body.models.length>0) {
        req.body.models.sort(compareNumbers).reduce((prev, cur) => {if(prev.name===cur.name) { return res.status(400).send('Nie można dodać dwóch modeli o takiej samej nazwie')}})
    }
    let brands = await Brand.find();
    let ID = setID(brands);

    const newBrand = new Brand({
        name: req.body.name,
        models: req.body.models || [],
        ID: ID
    })

    try {
        await newBrand.save();
        res.send({
            message: 'Nowa marka dodana prawidłowo'
        })
    } catch(err) {
        return res.status(500).send("Coś poszło nie tak")
    }
}

addModel = async (req, res) => {
    try {
        validateModel(req.body)
    } catch(err) {
        return res.status(400).send(err)
    }
    
    let brand = await Brand.findById(req.params.brandId);

    let models = brand.models;

    let existingModel = false;

    models.map(model => {
        if(model===req.body.name) {
            existingModel = true
        }
    });

    if(existingModel) { return res.status(400).send('Istnieje już model o takiej nazwie w bazie') };

    models.push(req.body.name);

    brand.set({
        models: models
    })

    try {
        await brand.save();
        res.send({
            message: 'Model dodany'
        })
    } catch(err) {
        return res.status(500).send('Coś poszło nie tak')
    }

}

updateBrand = async (req, res) => {
    let brand = await Brand.findById(req.params.id);
    if(!brand) { return res.status(404).send('Nie ma takiej marki')};

    try {
        validateBrand(req.body);
    } catch(err) {
        return res.status(400).send(err)
    }

    const name = await Brand.findOne({name: req.body.name});
    if(name && name._id != req.params.id) { return res.status(400).send("Istnieje już marka o takiej nazwie")};

    if(req.body.models.length>0) {
        let existingModel = false;
        for(let i=0; i<req.body.models.length; i++) {
            req.body.models.map((model, index) => {
                if(req.body.models[i]===model && i!==index) {
                    existingModel = true;
                    i = req.body.models.length+1;
                }
            })
            
        }
        if(existingModel) { return res.status(400).send('Nie mogą istnieć dwa modele o takiej samej nazwie!')}
    }

    brand.set({
        name: req.body.name,
        models: req.body.models
    });

    try {
        await brand.save();
        res.send({
            message: "Marka zaktualizowana"
        })
    } catch(err) {
        console.log(err)
        return res.status(500).send("Coś poszło nie tak")
    }
}
    



module.exports = {
    getBrand, 
    getBrands, 
    addBrand,
    addModel,
    updateBrand
}