const asyncHandler = require('../middleware/async');
const ErroResponse = require('../utils/errorUtils');
const Photo = require('../models/Photo');

//* @desc    Up a single user
//* @route   PUT /api/v1/articles/:id
//* @access  Private
exports.uploadImage = asyncHandler(async (req, res, next) => {
  if(!req.file){
    return next(
      new ErroResponse(
        `Something went wrong`,
        500
      )
    );
  }
  if(!req.user){
    return next(
      new ErroResponse(
        `You are not authorized`,
        403
      )
    );
  }
  req.body.user = req.user._id;
  req.body.url = req.file.location;
  req.body.name = req.file.originalname;
  console.log(req.file);
  const photo = await Photo.create(req.body);
  
  res.status(200).json({ data: req.file.location });
 
});

//* @desc    Search photo
//* @route   GET /api/v1/photo/search=ceva
//* @access  Public
exports.searchPhotos = asyncHandler(async (req, res, next) =>
{
  let searchQuery = req.query.search; 
  
  const photos = await Photo.fuzzySearch({query: searchQuery,  prefixOnly: true, exact: true });
  
  res.status(200).json({data: photos});
});