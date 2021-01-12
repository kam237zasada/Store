const express = require('express');
const sellerController = require('../controllers/sellers');
const router = express.Router();
const { accessTokenVerify } = require('../controllers/auth');

router.get('/', accessTokenVerify, sellerController.getSellers);
router.get('/:id', accessTokenVerify, sellerController.getSeller);
router.post('/add', accessTokenVerify, sellerController.addSeller);
router.put('/update/:id', accessTokenVerify, sellerController.updateSeller);

module.exports = router;