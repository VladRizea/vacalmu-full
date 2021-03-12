const asyncHandler = require('../middleware/async');
const Article = require('../models/Article');
const Categories = require('../models/Categories');

//* @desc    Get all getCategories
//* @route   Get /api/v1/categories
//* @access  Private/Admin

exports.getFeed = asyncHandler(async (req, res, next) => {
  
    let feed = [];
    const newArticles = await Article.find().limit(7).sort('-createdAt');
    feed.push(newArticles);

    const categories = await Categories
        .find({ articlesNumber: { $gte: 3 } })
        .populate({
        path: 'articles',
        model: 'Article'
    })

    feed.push(categories);

    console.log(feed);
    res.status(200).json({content: feed});
});

