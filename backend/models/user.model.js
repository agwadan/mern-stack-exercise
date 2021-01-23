/************BLUEPRINT FOR A USER*******************/


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    username: {
        type        : String, 
        required    : true,
        unique      : true, 
        trim        : true, //---------------------------------------- Trims off whitespaces at the end incase the user types in some extra unnecessary spaces
        minlength   : 3//---------------------------------------- Has to be atleast three characters long.
    } ,

    password: {
        type : String,
        required : true,
        minlength : 8
    }

}, {
    timestamps: true //--------------------------------------- Will automatically create a field for timestamps for when the entries were made.
});

const User = mongoose.model('User', userSchema);
module.exports = User;