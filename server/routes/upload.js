const express = require('express');
const upload = require('../middleware/uploadFile')
const Photo = require('../models/Photo')

const {
  uploadImage,
  searchPhotos

} = require('../controllers/upload');

const User = require('../models/User');

const router = express.Router({ mergeParams: true });


const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

//* Reroute into other resource routers
router.use(protect);

router
  .route('/')
  .put(protect, upload.single('file'), uploadImage);

router.route('/search')
  .get(protect, advancedResults(Photo), searchPhotos);

module.exports = router;
