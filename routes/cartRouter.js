const router = require('express').Router();
const authController = require('../controllers/authController');
const cartController = require('../controllers/cartController');

router.delete('/:itemId', cartController.deletItem);
router.post(
  '/item/addglassesWithlenses/:itemId',
  cartController.addglassesWithlenses
);
router.get('/add-to-cart/:id', cartController.addToCart);
router.post('/changeQuantity/:itemId/:quntity', cartController.changeQuantity);

module.exports = router;
