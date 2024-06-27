const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const Review = require('../models/review')
const Campground = require('../models/campground');
const ExpressError = require('../utilities/ExpressError');
const catchAsync = require('../utilities/catchAsync');
const { campgroundSchema, reviewSchema } = require('../schemas.js')
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })


//routes below
router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.post))

router.get('/new', isLoggedIn, campgrounds.newForm)
router.route('/:id')
    .get(catchAsync(campgrounds.show))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.edit))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.delete))
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.editForm))




module.exports = router;