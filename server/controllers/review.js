const ErrorResponse = require('../utils/errorUtils');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const Article = require('../models/Article');

//* @desc    Get all Reviews
//* @route   Get /api/v1/reviews
//* @access  Private/Admin
exports.getAllReviews = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//* @desc    Get reviews
//* @route   GET /api/v1/reviews
//* @route   GET /api/v1/reviews/:articleId/
//* @access  Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.articleId) {
    const review = await Review.find({ articleId: req.params.articleId });
    return res.status(200).json({
      success: true,
      count: review.length,
      data: review,
    });
  } else {
    return res.status(200).json(res.advancedResults);
  }
});

//* @desc    Get single review
//* @route   GET /api/v1/reviews/single/:id
//* @access  Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(
        `The review with id : ${req.params.id} does not exist`,
        404
      )
    );
  }

  return res.status(200).json({
    success: true,
    data: review,
  });
});

//* @desc    Add review
//* @route   Post /api/v1/reviews/:articleId
//* @access  Private

exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.articleId = req.params.articleId;
  req.body.user = req.user;

  const article = await Article.findById(req.params.articleId);

  if (!article) {
    return next(
      new ErrorResponse(
        `The article with Id ${req.params.articleId} does not exist`,
        404
      )
    );
  }

  if (!article.reviews) {
    return next(
      new ErrorResponse(
        `The article with Id ${req.params.articleId} does not allow reviews for now`,
        406
      )
    );
  }

  const review = await Review.create(req.body);

  return res.status(201).json({
    success: true,
    data: review,
  });
});

//* @desc    Delete review
//* @route   DELETE /api/v1/reviews/:id
//* @access  Public

exports.deleteReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(
        `The review with Id ${req.params.id} does not exist`,
        404
      )
    );
  }

  //* Make sure review belongs belongs to a user
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorized to  update review`, 401));
  }

  await review.remove();

  return res.status(200).json({
    success: true,
    data: {},
  });
});

exports.updateReview = asyncHandler(async (req, res, next) => {
  req.body.edited = true;
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    succes: true,
    data: review,
  });
});

exports.like = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(
        `The review with id : ${req.params.id} does not exist`,
        404
      )
    );
  }

  review.like(req.params.id);

  const dogg = await Review.findByIdAndUpdate(req.params.id, review, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    succes: true,
    data: dogg,
  });
});
