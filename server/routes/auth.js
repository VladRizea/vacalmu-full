const express = require('express');
const {
  register,
  login,
  getMe,
  forgotpassword,
  resetPassword,
  updateDetails,
  updatepassword,
  logOut,
  createToken,
  getTokens,
} = require('../controllers/auth');

const UserGenerator = require('../models/UserGenerator');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.post('/register', register);

router.post('/login', login);

router.get('/me', protect, getMe);

router.put('/updatepassword', protect, updatepassword);

router.put('/updatedetails', protect, updateDetails);

router.post('/forgotpassword', forgotpassword);

router.put('/resetPassword/:resetToken', resetPassword);

router.get('/logout', logOut);

router.post('/createToken', protect, authorize('admin'), createToken);

router.get(
  '/getTokens',protect,authorize('admin'),advancedResults(UserGenerator),getTokens);

module.exports = router;
