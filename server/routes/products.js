const express = require('express');
const productController = require('../controllers/products');
const router = express.Router();
const { accessTokenVerify } = require('../controllers/auth');

router.get('/', accessTokenVerify, productController.getProducts);
router.get('/get/:id', accessTokenVerify, productController.getProduct);
router.get('/query/:query', accessTokenVerify, productController.findSerials)
router.get('/serial/:serial', accessTokenVerify, productController.findBySerialNumber)
router.post('/add', accessTokenVerify, productController.addProduct);

module.exports = router;