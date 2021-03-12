const express = require('express');

const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
  getAllReviews,
  like,
} = require('../controllers/review');

const Review = require('../models/Review');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');

const { protect, authorize } = require('../middleware/auth');

router.route('/').get(advancedResults(Review), getAllReviews);

router
  .route('/:articleId')
  .get(advancedResults(Review), getReviews)
  .post(protect, authorize('user', 'admin', 'publisher'), addReview);

router
  .route('/single/:id')
  .get(getReview)
  .delete(protect, authorize('user', 'admin', 'publisher'), deleteReview)
  .put(protect, authorize('user', 'admin', 'publisher'), updateReview);

router
  .route('/single/:id/like')
  .get(getReview)
  .post(protect, authorize('user', 'admin', 'publisher'), like);

module.exports = router;
