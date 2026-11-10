const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listings.js');
const path = require('path');

const MONGO_URL = 'mongodb://127.0.0.1:27017/Wanderlust';

async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));    
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hi am root');
});

//Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    console.log("listings found:", allListings.length);
    res.render("listings/index.ejs", { allListings });
});


//new route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

//Show route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});



// app.get('/testListing', async (req, res) => {
//     let sampleListing = new Listing({
//         title: 'My Kashmir',
//         description: 'A beautiful place to visit',
//         price: 1200,
//         location: 'Kashmir',
//         country: 'India',
//     });

//     await sampleListing.save();
//     console.log('sample was saved');
//     res.send('successful testing');
// });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});