const express = require('express');

const {
  getArticles,
  postArticle,
  getArticle,
  deleteArticle,
  updateArticle,
  actionArticle,
  searchArticles,
} = require('../controllers/articles');

const Article = require('../models/Article');

//* Include other resource routers

const router = express.Router();
const reviewRouter = require('./reviews');

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

//* Reroute into other resource routers

router
  .route('/search')
  .get(advancedResults(Article), searchArticles)

router
  .route('/')
  .get(advancedResults(Article), getArticles)
  .post(protect, authorize('admin', 'publisher'), postArticle);

router
  .route('/:id')
  .get(protect, getArticle)
  .delete(protect, authorize('admin', 'publisher'), deleteArticle)
  .put(protect, authorize('admin', 'publisher'), updateArticle);

router
  .route('/:id/:action')
  .put(protect, authorize('admin', 'publisher', 'user'), actionArticle);


module.exports = router;
