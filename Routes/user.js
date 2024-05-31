const express = require('express');
const router = express.Router();
const {
    handelGetAllUsers,
    handelLoginUser,
    handelCreateUsers,
    handelForgotUser,
    handelResetPassword,
  } = require('../controllers/user');


router.get('/getUsers', handelGetAllUsers);
router.post('/login', handelLoginUser);
router.post('/register', handelCreateUsers)  
router.post('/forgot', handelForgotUser);
router.post('/reset', handelResetPassword);


module.exports = router;