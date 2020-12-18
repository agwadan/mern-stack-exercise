/*********************BLUEPRINT FOR THE EXERCISES*************************/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({//--------------------------- Contains 4 fields as seen below.
    username: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date, required: true},
}, {
    timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;