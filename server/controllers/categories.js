const asyncHandler = require('../middleware/async');
const Categories = require('../models/Categories');

//* @desc    Get all getCategories
//* @route   Get /api/v1/categories
//* @access  Private/Admin

exports.getCategories = asyncHandler(async (req, res, next) => {
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