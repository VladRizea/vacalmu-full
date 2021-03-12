const express = require('express');

const {
    getFeed
} = require('../controllers/feed');


const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

//* Reroute into other resource routers

router.route('/')
    .get(getFeed);
  

module.exports = router;