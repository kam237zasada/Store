const express = require('express');
const brandController = require('../controllers/brands');
const router = express.Router();
const { accessTokenVerify } = require('../controllers/auth');

router.get('/', accessTokenVerify, brandController.getBrands);
router.get('/:id', accessTokenVerify, brandController.getBrands);
router.post('/add', accessTokenVerify, brandController.addBrand);
router.put('/update/:id', accessTokenVerify, brandController.updateBrand);
router.put('/model/:brandId', accessTokenVerify, brandController.addModel)

module.exports = router;