const router = require('express').Router();
let Exercise = require('../models/exercise.model');

/***********The code below handles incoming http GET requests**************/
//____________________________________________________________________/

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' +err));
});


/***********The code below handles incoming http POST requests**************/
//____________________________________________________________________/


router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    //*********After getting all the variables above, a new exercise is created as below*********** */
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    newExercise.save()
        .then(() => res.json('Exercise added'))
        .catch(err => res.status(400).json('Error:' +err));
});

module.exports = router;