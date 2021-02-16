const express = require('express');
const cors = require('cors'); //------------------------- cors allows access to resources outside the server
const mongoose = require('mongoose');//---------------------- Assists in connection to the MongoDB.
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

require('dotenv').config();


//**********CREATING THE EXPRESS SERVER******************/
//______________________________________________________/

const app = express();
const port = process.env.PORT || 5000;


/******************MIDDLEWARE ***************************/
//______________________________________________________/


app.use(cors()); //-------------------------------------- The Cors MiddleWare
app.use(express.json());//------------------------------- Allows parsing of JSON back and forth from the server

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

console.log("Mongoose... Connection to database successful.");


const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exerciseRouter);//-------------------------------- Loads everything in the exercises router when the url entered includes /exercises.
app.use('/users', usersRouter);//--------------------------------------- Loads everything in the users router when the url entered includes /users.

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });
const imgModel = require('./models/image.model');

app.get('/', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occured', err);
        } else {
            res.render('imagesPage', { items: items });
        }
    });
});

app.post('/', upload.single('image'), (req, res, next) => {
    const obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }

    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
})

/*              STARTING THE SERVER                          */
//__________________________________________________________*/

app.listen(port, () => {
    console.log(`Sava eduka ku Port : ${port}`);
})
