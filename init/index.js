const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listings.js');

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log('Database initialized with sample data');
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