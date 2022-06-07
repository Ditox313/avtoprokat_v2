const express = require('express');
const passport = require('passport');
const upload = require('../middleware/upload');
const router = express.Router();
const controller = require('../controllers/category.js');



// Роут на getAll
router.get('/', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.getAll);







module.exports = router;