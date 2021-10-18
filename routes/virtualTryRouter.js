const router = require('express').Router();
const authController = require('../controllers/authController');
const virtualTryController = require('../controllers/virtualTryController');

router.use(authController.protect, authController.restrictTo('admin'));

router
  .route('/addvirtualTry')
  .post(
    virtualTryController.uploadProductVirt,
    virtualTryController.resolveJsonObject,
    virtualTryController.addVirtualTry
  );

router.delete(virtualTryController.deleteVirtualTry);

module.exports = router;
