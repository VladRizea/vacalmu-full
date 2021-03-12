const crypto = require('crypto');
const ErrorResponse = require('../utils/errorUtils');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const UserGenerator = require('../models/UserGenerator');

//* @route   POST /api/v1/auth/createToken
//* @access  Private
//* @desc   Create token for user creation
exports.createToken = asyncHandler(async (req, res, next) => {
  //* Generate token
  const generatorToken = crypto.randomBytes(10).toString('hex');
  req.body.generatorToken = generatorToken;

  const generatedUser = await UserGenerator.create(req.body);
  res.status(201).json({
    succes: true,
    data: generatedUser,
    token: generatorToken,
  });
});


//* @desc   getTokens
//* @route   Get /api/v1/auth/getTokens
//* @access  Private
exports.getTokens = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public

exports.register = asyncHandler(async (req, res, next) => {
  //* Get hashed token
  console.log(req.body.generatorToken);
  if (!req.body.generatorToken) req.body.generatorToken = 'sancky';

  const generatorTokenCrypted = crypto
    .createHash('sha256')
    .update(req.body.generatorToken)
    .digest('hex');

    let role = 'publisher';
    const { name, email, password } = req.body;
  
  const token = await UserGenerator.findOne({
    generatorToken: generatorTokenCrypted,
    generatorTokenExpire: { $gt: Date.now() },
  });

  if (!token) { 
    return next(
      new ErrorResponse('Please provide an email and a password', 400)
    );
  }


  
  //* Create User
  const user = await User.create({
    name,
    email,
    password,
    role,
  });
 
  token.delete();
  console.log(token);
  sendTokenResponse(user, 200, res);
});

// @desc    login user
// @route   POST /api/v1/auth/login
// @access  Public

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //* Validate email and password

  if (!email || !password) {
    return next(
      new ErrorResponse('Please provide an email and a password', 400)
    );
  }

  //* Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  //* Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Get current user
// @route   POST /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Log user out
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logOut = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Update user
// @route   PUT /api/v1/auth/updateDetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Current user password update
// @route   Put /api/v1/auth/updatepassword
// @access  Private
exports.updatepassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  //* Check current user's password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorect', 401));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendTokenResponse(user, 200, res);
});

// @desc   Forgot password
// @route   POST /api/v1/auth/forgotpassword
// @access  Private
exports.forgotpassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  //* Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });
  //* Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetPassword/${resetToken}`;

  const message = `You are receiving this email because you(or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// @desc   Reset password
// @route   Put /api/v1/auth/resetpassword/:resetToken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  //* Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  //* Set a new password
  user.password = req.body.password;

  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();

  sendTokenResponse(user, 200, res);
});



//* Get token from model create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //* Create token
  const token = user.getSignedJwtToken();
  console.log(token);
  res.header('Access-Control-Allow-Origin', '*');

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};
