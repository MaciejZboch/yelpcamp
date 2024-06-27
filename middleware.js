const ExpressError = require('./utilities/ExpressError');
const { campgroundSchema, reviewSchema } = require('./schemas.js');

const Campground = require('./models/campground');
const Review = require('./models/review')
//campground middleware
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'sign in first!')
        return res.redirect('/login')
    }
    next();
}
module.exports.isAuthor = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id)
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'No permission to do that!')
        return res.redirect('/campgrounds/' + campground.id)
    }
    next();
}
module.exports.validateCampground = (req, res, next) => {

    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

//review middleware
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const review = await Review.findById(req.params.reviewId)
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'No permission to do that!')
        return res.redirect('/campgrounds/' + req.params.id)
    }
    next();
}