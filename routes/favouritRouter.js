const router = require('express').Router();
const authController = require('../controllers/authController');
const favouritController = require('../controllers/favouritController');

router.use(authController.protect);
router.route('/').post(favouritController.addFavourit);

router.delete('/deleteFa/:id', favouritController.deleteFavouritTest);

module.exports = router;
