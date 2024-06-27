const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo connection succesful!')
    })
    .catch(err => {
        console.log('damn, Mongo error!')
        console.log(err)
    })

const db = mongoose.connection;


const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() + 20 + 10)
        const camp = new Campground({
            author: "666d82fcf73eae6d3cf64b1f",
            price,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dlem22ukx/image/upload/v1719073379/YelpCamp/eczsxx6o5biif6f5p0y9.jpg',
                    filename: 'YelpCamp/eczsxx6o5biif6f5p0y9'
                },
                {
                    url: 'https://res.cloudinary.com/dlem22ukx/image/upload/v1719073379/YelpCamp/r7cbnfgxzgxmobg7ml2t.jpg',
                    filename: 'YelpCamp/r7cbnfgxzgxmobg7ml2t'
                }
            ],


            description: 'This stuff is innawoods and that is plenty goods like in dream of the roods.'
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close()
})