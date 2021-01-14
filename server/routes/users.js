const express = require('express');
const userController = require('../controllers/users');
const router = express.Router();
const { accessTokenVerify } = require('../controllers/auth');

router.get('/', accessTokenVerify, userController.getUsers);
router.get('/single', accessTokenVerify, userController.getUser);
router.post('/add', accessTokenVerify, userController.addUser);
router.post('/signin', userController.signInUser);
router.put('/update', accessTokenVerify, userController.updateUser);
router.put('/password', accessTokenVerify, userController.updatePassword);

module.exports = router;