const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listings.js');

const MONGO_URL = 'mongodb://127.0.0.1:27017/Wanderlust';

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    console.log('Documents in data.js:', initData.data.length);
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    const count = await Listing.countDocuments();
    console.log('Documents now in database:', count);
};

main()
    .then(async () => {
        console.log('Connected to MongoDB');
        await initDB();
    })
    .catch((err) => {
        console.error('Error:', err);
    })
    .finally(() => {
        mongoose.connection.close();
    });