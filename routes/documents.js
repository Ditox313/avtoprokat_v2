const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/documents.js');
const upload = require('../middleware/upload');



// Роут на create dogovor
router.post('/create_dogovor', passport.authenticate('jwt', { session: false }), controller.create_dogovor);

// Роут на getDogovorsById
router.get('/dogovors_list/:id', passport.authenticate('jwt', { session: false }), controller.getDogovorsById);

// Роут на getDogovorById
router.get('/dogovor/:id', passport.authenticate('jwt', { session: false }), controller.getDogovorById);


// Роут на изменение state все договоров клиента при создании нового
// router.patch('/clear_state', passport.authenticate('jwt', { session: false }), controller.update_state);

// Роут на create
//router.post('/', passport.authenticate('jwt', { session: false }), controller.create);

// Роут на fetch
//router.get('/', passport.authenticate('jwt', { session: false }), controller.fetch);

// Роут на update
//router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update);


// // Роут на remove
//router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove);


module.exports = router;