const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mustacheExpress = require("mustache-express");
mongoose.Promise = require("bluebird");
const dbUrl = "mongodb://localhost:27017/pokemon";
const Pokemon = require('./models/Pokemon');
const app = express();
const port = process.env.PORT || 8000;

//ENGINE
app.engine("mustache", mustacheExpress());
app.set('views', './views');
app.set("view engine", "mustache")

//MIDDLEWARE
app.use(bodyParser.json());
app.use('/', express.static('./models'))
app.use(bodyParser.urlencoded({ extended: false }));



//DB CONNECTION
mongoose.connect(dbUrl).then((err, db) => {
    if (err) {
        console.log("ERROR", err);
    }
    console.log("Connected to the DB");
});


//ROUTES

app.get('/', (req, res) => {
    Pokemon.find({})
        .then(foundPokemon => {
            res.render('index', { pokemon: foundPokemon })
        })
})


app.get('/update/:id', (req, res) => {
    Pokemon.findOne({ _id: req.params.id })
        .then(singlePokemon => {
            res.render('update', { pokemon: singlePokemon })
        })
})

app.post('/pokemon/:id', (req, res) => {
    Pokemon.updateOne({ _id: req.params.id }, req.body)
        .then(updatedPokemon => {
            res.redirect('/')
        })
        .catch(err => {
            res.status(500).send(err)
        })
})


app.post('/', (req, res) => {
    let pokemonData = req.body;
    let newPokemon = new Pokemon(pokemonData);

    newPokemon.save().then(savedPokemon => {
        res.redirect('/')
    })
        .catch(err => {
            res.status(500).send(err);
        })
});
app.post('/delete', (req, res) => {
    Pokemon.deleteOne({ _id: req.body.id })
        .then(() => {
            res.redirect("/");
        })
        .catch(err => {
            res.status(500).send(err)
        })
})





//LISTEN
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});