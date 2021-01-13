const express = require('express');
const productController = require('../controllers/products');
const router = express.Router();
const { accessTokenVerify } = require('../controllers/auth');

router.get('/', accessTokenVerify, productController.getProducts);
router.get('/:id', accessTokenVerify, productController.getProduct);
router.post('/add', accessTokenVerify, productController.addProduct);

module.exports = router;