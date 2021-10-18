const router = require('express').Router();
const authController = require('../controllers/authController');
const bannerController = require('../controllers/bannerController');

router.use(authController.protect, authController.restrictTo('admin'));
router
  .route('/addbanner')
  .post(
    bannerController.uploadBannerImages,
    bannerController.resizeBannerImages,
    bannerController.addBanner
  );

router.delete('/delete-banner/:id', bannerController.deleteBanner);

module.exports = router;
