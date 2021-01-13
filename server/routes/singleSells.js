const express = require('express');
const sellsController = require('../controllers/singleSells');
const router = express.Router();
const { accessTokenVerify } = require('../controllers/auth');

router.get('/', accessTokenVerify, sellsController.getSells);
router.get('/:id', accessTokenVerify, sellsController.getSell);
router.post('/add', accessTokenVerify, sellsController.addSell);

module.exports = router;