const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review')

//https://res.cloudinary.com/dlem22ukx/image/upload/c_scale,w_399/cld-sample.jpg
//https://res.cloudinary.com/dlem22ukx/image/upload/v1719079295/YelpCamp/loc3xypthpk4cqm36vb8.jpg
const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/c_scale,w_399')
});

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});
CampgroundSchema.post('findOneAndDelete', async function (doc) {
    console.log(doc)
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

module.exports = mongoose.model('Campground', CampgroundSchema);
