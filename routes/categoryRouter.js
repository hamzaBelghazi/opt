const router = require('express').Router();
const authController = require('../controllers/authController');
const categoryController = require('../controllers/categoryController');

router.use(authController.protect, authController.restrictTo('admin'));
router
  .route('/addcategory')
  .post(
    categoryController.uploadCategoryImages,
    categoryController.resizeCategoryImages,
    categoryController.addCategory
  );

router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
