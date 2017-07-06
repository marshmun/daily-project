const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
mongoose.Promise = require("bluebird");
const dbUrl = "mongodb://localhost:27017/pokemon";
const Pokemon = require('./models/Pokemon');
const app = express();
const port = process.env.PORT || 8000;

//MIDDLEWARE
app.use(bodyParser.json());


//DB CONNECTION
mongoose.connect(dbUrl).then((err, db) => {
    if (err) {
        console.log("ERROR", err);
    }
    console.log("Connected to the DB");
});


//ROUTES
app.get('/pokemon', (req, res) => {
    Pokemon.find().then(foundPokemon => {
        res.send(foundPokemon);
    })
        .catch(err => {
            res.status(500).send(err);
        })
})



//LISTEN
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});