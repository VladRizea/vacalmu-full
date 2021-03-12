const asyncHandler = require('../middleware/async');
const User = require('../models/User');

//* @desc    Get all Users
//* @route   Get /api/v1/auth/users
//* @access  Private/Admin

exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//* @desc    Get single User
//* @route   Get /api/v1/auth/users/:id
//* @access  Private/Admin

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await user.findById(req.params.id);
  res.status(200).json({
    succes: true,
    data: user,
  });
});
