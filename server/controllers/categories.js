const asyncHandler = require('../middleware/async');
const Categories = require('../models/Categories');

//* @desc    Get all getCategories
//* @route   Get /api/v1/categories
//* @access  Public

exports.getCategories = asyncHandler(async (req, res, next) => {


  //* used for adding related articles to another article
  let searchQuery = req.query.articles;
  if(searchQuery == "true"){
  const categories = await Categories
  .find()
  .populate({
  path: 'articles',
  model: 'Article'
  })
  res.status(200).json(categories);
  return 0;
}

res.advancedResults.data[0].articles.reverse();

  res.status(200).json(res.advancedResults);
});


//* @desc    Post an category
//* @route   POST /api/v1/categories
//* @access  Private
exports.postCategories = asyncHandler(async (req, res, next) =>
{
  const categorie = await Categories.create(req.body);
  res.status(201).json({ success: true, data: categorie });
});

//* @desc    Search categories
//* @route   GET /api/v1/categories?search=ceva
//* @access  Public
exports.searchCategories = asyncHandler(async (req, res, next) =>
{
  let searchQuery = req.query.search; 
  
  const categories = await Categories.fuzzySearch({query: searchQuery,  prefixOnly: true, exact: true });
  
  res.status(200).json({data: categories});
});