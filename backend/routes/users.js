const router = require('express').Router();
const bcrypt = require('bcrypt');
let User = require('../models/user.model');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const storageVar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({ storage: storageVar })

const saltRounds = 10;


/***********The code below handles incoming http GET requests**************/
//________________________________________________________________________/


router.route('/').get((req, res) => {
  User.find() /*-------------------------------------------------Mongoose method that returns all users in the DB*/
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


/***********The code below handles incoming http POST requests
 * *************** to add users to the database**************/
//___________________________________________________________/

router.route('/add').post(upload.single('img'), (req, res, next) => {
  console.log(req.file);
  const username = req.body.username;

  const email = req.body.email;
  const nameRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (!nameRegEx.test(email)) {
    return res.send('wrong email...');
  }

  const img = req.file.path;

  const salt = bcrypt.genSaltSync(saltRounds);
  const password = bcrypt.hashSync(req.body.password, salt);
  const newUser = new User({
    username,
    email,
    password,
    img: img
    /* 'Dr.Charles.image' *//* {
      data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
      contentType: 'image/png'
    } */
  });
  console.log(username);
  console.log(password);
  //console.log(req.file.filename);
  newUser.save()
    .then(() => res.json('User added  :-)'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/login').post((req, res) => {

  const username = req.body.username;
  const pass = req.body.password;

  User.findById(req.params.id)
    .then((users) => {
      const password = users.password;
      bcrypt.compare(pass, password, function (err, result) {
        console.log('success :)');
      });
    });
})

module.exports = router;