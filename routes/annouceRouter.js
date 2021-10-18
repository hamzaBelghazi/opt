const router = require('express').Router();
const authController = require('../controllers/authController');
const announceController = require('../controllers/announceController');

router.use(authController.protect, authController.restrictTo('admin'));
router.route('/addannounce').post(announceController.addAnnouncement);

router
  .route('/:id')
  .patch(announceController.updateAnnouncement)
  .delete(announceController.deleteAnnouncement);

module.exports = router;
