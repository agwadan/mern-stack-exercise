const express   = require('express');
const cors      = require('cors'); //------------------------- cors allows access to resources outside the server
const mongoose  = require('mongoose');//---------------------- Assists in connection to the MongoDB.

require ('dotenv').config();


//**********CREATING THE EXPRESS SERVER******************/
//______________________________________________________/

const app   = express();
const port  = process.env.PORT || 5000;


/******************MIDDLEWARE ***************************/
//______________________________________________________/


app.use(cors()); //-------------------------------------- The Cors MiddleWare
app.use(express.json());//------------------------------- Allows parsing of JSON back and forth from the server



const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, 
                        useCreateIndex: true, 
                        useUnifiedTopology: true});
                        
console.log("Mongoose... Connection to database successful.");


const exerciseRouter    = require('./routes/exercises');
const usersRouter       = require('./routes/users');

app.use('/exercises', exerciseRouter);//-------------------------------- Loads everything in the exercises router when the url entered includes /exercises.
app.use('/users', usersRouter);//--------------------------------------- Loads everything in the users router when the url entered includes /users.


/****STARTING THE SERVER**********/
//___________________________________________________________/

app.listen(port, () => {
    console.log(`Sava eduka ku Port : ${port}`);
})
