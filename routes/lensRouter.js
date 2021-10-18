const router = require('express').Router();
const authController = require('../controllers/authController');
const lensController = require('../controllers/lensController');

router
  .route('/')
  .post(
    lensController.uploadLensImages,
    lensController.resizeLensImages,
    lensController.createLens
  );

router
  .route('/:id')
  .get(lensController.getLens)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    lensController.uploadLensImages,
    lensController.resizeLensImages,
    lensController.updateLens
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    lensController.deleteLens
  );

module.exports = router;
