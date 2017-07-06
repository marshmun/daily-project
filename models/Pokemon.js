var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var pokemonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["grass", "water", "electric", "fire"],
        required: true,
        default: "unknown"
    },
    gender: {
        type: String,
        required: true,
        enum: ["m", "male", "f", "female"]
    },
    size: {
        type: String,
        default: "unknown"
    },
    health: {
        type: Number
    },
    owner: {
        name: {
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String
            }
        },
        age: Number,
        gender: {
            type: String,
            enum: ["m", "male", "f", "female"]
        }
    }
});


module.exports = mongoose.model("Pokemon", pokemonSchema);