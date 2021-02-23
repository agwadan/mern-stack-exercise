const router = require('express').Router();
const bcrypt = require('bcrypt');
let User = require('../models/user.model');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
const upload = multer({ storage: storage });
const imgModel = require('../models/image.model');

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

router.route('/add').post(upload.single('image'), (req, res, next) => {
  const username = req.body.username;

  const email = req.body.email;
  const nameRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (!nameRegEx.test(email)) {
    return res.send('wrong email...');
  }
  console.log(nameRegEx.test(email));

  const salt = bcrypt.genSaltSync(saltRounds);
  const password = bcrypt.hashSync(req.body.password, salt);
  const newUser = new User({
    username,
    email,
    password,

    /*  img: {
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