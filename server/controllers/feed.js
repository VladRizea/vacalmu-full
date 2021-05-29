const asyncHandler = require('../middleware/async');
const Article = require('../models/Article');
const Categories = require('../models/Categories');

//* @desc    Get all getCategories
//* @route   Get /api/v1/categories
//* @access  Private/Admin

exports.getFeed = asyncHandler(async (req, res, next) => {
  
    let feed = [];
    const newArticles = await Article.find({ state: 'ready'}).limit(8).sort('-createdAt');
    
    const half = Math. ceil(newArticles.length / 2);

    const firstHalf = newArticles.splice(0, half)
    
    feed.push(firstHalf);

    const categories = await Categories.find({}).sort({articlesNumber: -1});

    feed.push(categories);


    const secondHalf = newArticles.splice(-half)

    feed.push(secondHalf);

    res.status(200).json({content: feed});
});

