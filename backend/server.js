const express = require('express');
const cors = require('cors'); //------------------------- cors allows access to resources outside the server
const mongoose = require('mongoose');

require ('dotenv').config();


//**********CREATING THE EXPRESS SERVER************** */
const app = express();
const port = process.env.PORT || 5000;


/**MIDDLEWARE */
app.use(cors()); //-------------------------------------- The Cors MiddleWare
app.use(express.json());//------------------------------- Allows parsing of JSON back and forth from the server


/****STARTING THE SERVER**********/
app.listen(port, () => {
    console.log(`Server running on Port : ${port}`);
})