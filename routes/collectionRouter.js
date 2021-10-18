const router = require('express').Router();
const authController = require('../controllers/authController');
const collectionController = require('../controllers/collectionController');

router.use(authController.protect, authController.restrictTo('admin'));
router
  .route('/addcollection')
  .post(
    collectionController.uploadcollectionImages,
    collectionController.resizecollectionImages,
    collectionController.addcollection
  );

router.delete('/:id', collectionController.deletecollection);

module.exports = router;
