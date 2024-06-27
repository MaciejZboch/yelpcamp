const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const Review = require('../models/review')
const Campground = require('../models/campground');
const ExpressError = require('../utilities/ExpressError');
const catchAsync = require('../utilities/catchAsync');
const { campgroundSchema, reviewSchema } = require('../schemas.js')
const reviews = require('../controllers/reviews')


//routes below
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.post))
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.delete))

module.exports = router