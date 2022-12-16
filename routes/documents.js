const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/documents.js');
const upload = require('../middleware/upload');



// Роут на create dogovor
router.post('/', passport.authenticate('jwt', { session: false }), controller.create);

// Роут на create
//router.post('/', passport.authenticate('jwt', { session: false }), controller.create);

// Роут на fetch
//router.get('/', passport.authenticate('jwt', { session: false }), controller.fetch);

// Роут на update
//router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update);


// Роут на getById
//router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);



// // Роут на remove
//router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove);


module.exports = router;