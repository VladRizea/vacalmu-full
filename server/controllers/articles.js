// const path = require('path');
const ErroResponse = require('../utils/errorUtils');
const asyncHandler = require('../middleware/async');
const Article = require('../models/Article');
const Review = require('../models/Review');
const Categories = require('../models/Categories');

//* @desc    Get all articles
//* @route   GET /api/v1/articles
//* @access  Public
exports.getArticles = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//* @desc    Post an article
//* @route   POST /api/v1/articles
//* @access  Private
exports.postArticle = asyncHandler(async (req, res, next) =>
{
  req.body.publisher = req.user._id;
  const article = await Article.create(req.body);

  const category = await Categories.find({name: article.category})

  category[0].addArticle(article._id);

  await category[0].save();
  
  

  res.status(201).json({ success: true, data: article });
});

//* @desc    Get a single article by slug
//* @route   GET /api/v1/articles/single/:slug
//* @access  Public
exports.getArticleSlug = asyncHandler(async (req, res, next) => {
  let article = await Article.find({slug: req.params.slug})
    .populate({
    path: 'publisher',
    model: 'User',
    select: 'name profilePicture'
    })
    .populate(
    {
      path: 'recomandedArticles',
      model: 'Article',
    }
    );
    article = article[0];
    

  if(!article.publisher){
    article.publisher = article.user._id;
    article = await Article.findByIdAndUpdate(article._id, article, {
      new: true,
      runValidators: true,
    })
    .populate({
    path: 'publisher',
    model: 'User',
    select: 'name profilePicture'
    })
  }

  if(!article.recomandedArticles[0]){
    article.recomandedArticles = await Article.find({ state: 'ready', _id: {$ne: article._id}}).limit(3).sort('-createdAt');
    await article.populate(
      {
        path: 'recomandedArticles',
        model: 'Article',
      }
      ).execPopulate();
  }
 

  res.status(200).json({ succes: true, data: article });
});

//* @desc    Get a single article
//* @route   GET /api/v1/articles/:id
//* @access  Public
exports.getArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id);

  if (article.publisher.toString() != req.user.id && req.user.role !== 'admin')
  {
    return next(
      new ErroResponse(
        `User ${req.params.id} is not authorized to update this article`,
        401
      )
    );
  }

  res.status(200).json({ succes: true, data: article });
});

//* @desc    Delete a single article
//* @route   DELETE /api/v1/articles/:id
//* @access  Private
exports.deleteArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id);
  if (!article)
    return next(
      new ErroResponse(
        `Article can not be found with id of ${req.params.id}`,
        404
      )
    );

  //! Make sure User is article owner
  if (article.publisher.toString() != req.user.id && req.user.role !== 'admin')
    return next(
      new ErroResponse(
        `User ${req.params.id} is not authorized to update this article`,
        401
      )
    );
  
  let category = await Categories.find({name: article.category})
  category[0].deleteArticle(article._id);
  await category[0].save();
  
  article.remove();
  try {
    await Review.deleteMany({ articleId: req.params.id });
  } catch (err) {
    console.error(err);
  }

  res.status(200).json({ succes: true, data: {} });
});

//* @desc    Up a single article
//* @route   PUT /api/v1/articles/:id
//* @access  Private
exports.updateArticle = asyncHandler(async (req, res, next) => {
  let article = await Article.findById(req.params.id);
  if (!article)
    return next(
      new ErroResponse(
        `Article can not be found with id of ${req.params.id}`,
        404
      )
    );

  //! Make sure User is article owner

  if (article.publisher.toString() != req.user.id && req.user.role !== 'admin')
    return next(
      new ErroResponse(
        `User ${req.params.id} is not authorized to update this article`,
        401
      )
    );
  
  req.body.edited = true;

  if (req.body.category !== article.category) {
    let category = await Categories.find({name: article.category})
    category[0].deleteArticle(article._id);
    await category[0].save();

    category = await Categories.find({name: req.body.category})
    category[0].addArticle(article._id);
    await category[0].save();
  }

  req.body.user = req.user;
  


  article = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });


  article.resetSlugAndContent();

  article = await Article.findByIdAndUpdate(req.params.id, article, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ succes: true, data: article });
});

//* @desc    Article actions
//* @route   DELETE /api/v1/articles/:id/:action
//* @access  Private
exports.actionArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id);
  if (!article)
    return next(
      new ErroResponse(
        `Article can not be found with id of ${req.params.id}`,
        404
      )
    );

  //! Make sure User is article owner
  if (article.publisher.toString() != req.user.id && req.user.role !== 'admin')
    return next(
      new ErroResponse(
        `User ${req.params.id} is not authorized to update this article`,
        401
      )
    );

  if (req.params.action === 'togglereviews') {
    article.toggleReviews();
  } else if (req.params.action === 'togglevisibility') {
    article.toggleVisibility();
  } else if (req.params.action === 'like') {
    article.like(req.user.id);
  }

  const dogg = await Article.findByIdAndUpdate(req.params.id, article, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ succes: true, data: dogg });
});


//* @desc    Get all articles
//* @route   GET /api/v1/articles
//* @access  Public
exports.searchArticles = asyncHandler(async (req, res, next) =>
{
  let searchQuery = req.query.search; 
  const articles = await Article.fuzzySearch(searchQuery);
  
  res.status(200).json({data: articles});
  
});