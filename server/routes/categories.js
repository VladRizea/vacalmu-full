const express = require('express');

const {
  getCategories,
  postCategories,
  searchCategories,
} = require('../controllers/categories');

const Categories = require('../models/Categories');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

//* Reroute into other resource routers

router.route('/')
  .get( advancedResults(Categories), getCategories)
  .post(protect, advancedResults(Categories), postCategories);
router.route('/search')
  .get(protect, advancedResults(Categories), searchCategories);

module.exports = router;