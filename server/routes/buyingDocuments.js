const express = require('express');
const buyDocsController = require('../controllers/buyingDocuments');
const router = express.Router();
const { accessTokenVerify } = require('../controllers/auth');

router.get('/', accessTokenVerify, buyDocsController.getBuyingDocuments);
router.get('/:id', accessTokenVerify, buyDocsController.getBuyingDocument);
router.post('/add', accessTokenVerify, buyDocsController.addBuyingDocument);

module.exports = router;