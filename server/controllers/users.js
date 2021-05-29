const asyncHandler = require('../middleware/async');
const ErroResponse = require('../utils/errorUtils');
const User = require('../models/User');
const upload = require('../middleware/uploadFile')


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
  const user = await User.findById(req.params.id);
  res.status(200).json({
    succes: true,
    data: user,
  });
});

//* @desc    Up a single user
//* @route   PUT /api/v1/articles/:id
//* @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {

  

  if(!req.file){
    return next(
      new ErroResponse(
        `Something went wrong`,
        500
      )
    );
  }
  
 req.user.profilePicture = req.file.location;

 user = await User.findByIdAndUpdate(req.user._id, req.user, {
  new: true,
  runValidators: true,
});

  
  res.status(200).json({ location: req.file.location });
 
});
