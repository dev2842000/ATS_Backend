const express = require('express');
const authMiddleware = require('../Utils/authMiddleware');
const router = express.Router();
const {
    handelGetAllUsers,
    handelLoginUser,
    handelCreateUsers,
    handelForgotUser,
    handelResetPassword,
  } = require('../Controllers/user');

router.get('/protected-route', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});
router.get('/getUsers', handelGetAllUsers);
router.post('/login', handelLoginUser);
router.post('/register', handelCreateUsers)  
router.post('/forgot', handelForgotUser);
router.post('/reset', handelResetPassword);


module.exports = router;