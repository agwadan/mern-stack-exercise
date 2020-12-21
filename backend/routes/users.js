const router = require('express').Router();
let User = require('../models/user.model');


/***********The code below handles incoming http GET requests**************/
//____________________________________________________________________/


router.route('/').get((req, res) => {
    User.find() /*-------------------------------------------------Mongoose method that returns all users in the DB*/
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});


/***********The code below handles incoming http POST requests**************/
//_________________________________________________________________________/

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added  :-)'))
        .catch(err => res.status(400).json('Error: This is the problem', +err));
})

module.exports = router;