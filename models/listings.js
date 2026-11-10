const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        filename: {
            type: String,
            default: "listingimage",
        },
        url: {
            type: String,
            default: DEFAULT_IMAGE,
            set: (v) => (v === "" ? DEFAULT_IMAGE : v),
        },
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    date: Date,
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;