const router = require('express').Router();
const authController = require('../controllers/authController');
const pageController = require('../controllers/pageController');

router.use(authController.protect, authController.restrictTo('admin'));
router.route('/addpage').post(pageController.addPage);

router
  .route('/:id')
  .patch(pageController.updatePage)
  .delete(pageController.deletePage);

module.exports = router;
