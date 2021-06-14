const express = require('express');
const Article = require('../models/Article');

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
  .get( advancedResults(Categories, {
    path: 'articles',
    model: 'Article'
    }), getCategories)
  .post(protect, advancedResults(Categories, 'Article'), postCategories);
router.route('/search')
  .get(protect, advancedResults(Categories, 'Article'), searchCategories);

module.exports = router;