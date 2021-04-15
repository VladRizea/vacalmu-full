const asyncHandler = require('../middleware/async');
const Article = require('../models/Article');
const Categories = require('../models/Categories');

//* @desc    Get all getCategories
//* @route   Get /api/v1/categories
//* @access  Private/Admin

exports.getFeed = asyncHandler(async (req, res, next) => {
  
    let feed = [];
    const newArticles = await Article.find({ state: 'ready'}).limit(7).sort('-createdAt');
    feed.push(newArticles);

    console.log(newArticles);


    const categories = await Categories
        .find({ articlesNumber: { $gte: 2 }})
        .populate({
        path: 'articles',
        model: 'Article'
    })

    console.log(categories);

    feed.push(categories);

    res.status(200).json({content: feed});
});

