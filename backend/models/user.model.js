/************BLUEPRINT FOR A USER*******************/


const mongoose = require('mongoose');

const Schema = mongoose.Schema;//----------------------------- new Schema is created as an instance of mongoose.schema 

const userSchema = new Schema ({
    username: {
        type        : String, 
        required    : true,
        unique      : true, 
        trim        : true, //---------------------------------------- Trims off whitespaces at the end incase the user types in some extra unnecessary spaces
        minlength   : 3//---------------------------------------- Has to be atleast three characters long.
    }

}, {
    timestamps: true //--------------------------------------- Will automatically create a field for timestamps for when the entries were made.
});

const User = mongoose.model('User', userSchema);
module.exports = User;