const router = require('express').Router();
const bcrypt = require('bcrypt');
let User = require('../models/user.model');


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
    const password = req.body.password;
    const newUser = new User({username, password});

   

    newUser.save()
        .then(() => res.json('User added  :-)'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router; 