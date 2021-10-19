const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.use(viewsController.cart);
router.use(viewsController.pages);
router.use(authController.isLoggedIn);

router.get('/', viewsController.getOverview);
router.get('/login', viewsController.getLoginForm);
router.get('/page/:id', viewsController.getPage);
router.get('/frames', viewsController.getFrames);
router.get('/sunglasses', viewsController.getSunGlasees);
router.get('/collections/:col', viewsController.getBycollection);
router.get('/categories/:cat', viewsController.getBycategory);

router.get(
  '/register',

  viewsController.getRegisterForm
);
router.get(
  '/my-order',
  orderController.createOrderCheckout,
  authController.protect,
  viewsController.getOverview
);

router.get('/users/resetPassword/:token', viewsController.passChange);
router.get('/search', viewsController.getSearch);
router.get('/products', viewsController.getProducts);
router.get('/product/:productId', viewsController.getSingleProduct);
router.get('/lense/:productId', viewsController.getLense);
router.get('/cart', viewsController.getCart);
router.get('/account', viewsController.getAccount);
router.get(
  '/admin-panel-mhsoptics',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminPanel
);

module.exports = router;
