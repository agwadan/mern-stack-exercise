const router = require('express').Router();
const bcrypt = require('bcrypt');
let User = require('../models/user.model');


const saltRounds = 10;
//var password = 'salamader';

/* 
var password2 = 'salamander';
bcrypt.compare(password2, '$2b$10$QF4TFCqaLfxQ0QupUZPL4.v0zBpd6xzBdY7T8HiS45VqAA8/LCxX2', function (err, result) {
    if (result) {
        console.log('Matches...');
    } else {
        console.log('Invalid Password.');
    }
}) */

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

router.route('/add').post((req, res) => {
    const username = req.body.username;
    //const password = req.body.password;

    /*  const salt = bcrypt.genSaltSync(saltRounds);
     const password = bcrypt.hashSync(req.body.password, salt); */
    /*  const newUser = new User({ username, password });
     console.log(username);
     console.log(password);
  */
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            password = hash
            const newUser = new User({ username, password })

            newUser.save()
                .then(() => res.json('User added  :-)'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
    })
})

router.route('/login').get((req, res) => {

})

module.exports = router; 