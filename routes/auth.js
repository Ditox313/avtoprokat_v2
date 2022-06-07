const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.js');
const passport = require('passport');



// Роут на login
router.post('/login', controller.login);


// Роут на register
router.post('/register', controller.register);



module.exports = router;