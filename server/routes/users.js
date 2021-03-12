const express = require('express');

const {
  getUsers,
  getUser,
  createUsers,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const User = require('../models/User');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

//* Reroute into other resource routers
router.use(protect);

router
  .route('/')
  .get(protect, authorize('admin'), advancedResults(User), getUsers);

router.route('/:id').get(protect, getUser);

module.exports = router;
