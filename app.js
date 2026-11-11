const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listings.js');
const path = require('path');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

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

//create route
app.post("/listings", async (req, res) => {
    // let {title, description, price, location, country} = req.body;
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    // let listing = req.body;
    res.redirect(`/listings/${newListing._id}`);
});    

//Edit route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });

});    

//update route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});    

//Delete route

app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
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