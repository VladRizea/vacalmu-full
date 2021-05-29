const express = require('express');

const {
  sendVerification,
  verifyEmail,
  unsubscibeEmail,
  articleEmail

} = require('../controllers/emails');


const router = express.Router({ mergeParams: true });


const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

//* Reroute into other resource routers
router.use(protect);

router
  .route('/send-verification')
  .post(sendVerification);
router
  .route('/verify')
  .post(verifyEmail);
router
  .route('/unsubscribe')
  .post(unsubscibeEmail);
router
  .route('/article')
  .post(articleEmail);



module.exports = router;
