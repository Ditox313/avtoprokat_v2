const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/cars.js');
const upload = require('../middleware/upload');



// Роут на create
router.post('/', passport.authenticate('jwt', { session: false }), upload.single('previewSrc'), controller.create);

// Роут на getByCategoryId
// router.get('/:categoryId', passport.authenticate('jwt', { session: false }), controller.getByCategoryId);





// // Роут на update
// router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update);


// // Роут на remove
// router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove);

module.exports = router;