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
    const username      = req.body.username;
    const description   = req.body.description;
    const duration      = Number(req.body.duration);
    const date          = Date.parse(req.body.date);

    //*********After getting all the variables above, a new exercise is created as below*********** */
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    newExercise.save()
        .then(()    => res.json('Exercise added'))
        .catch(err  => res.status(400).json('Error:' +err));
});


//>>>>>>>>>>>>>>>>>>Router to fetch info about a given exercise by taking an id>>>>>>>>>>>> */
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise  => res.json(exercise))
        .catch(err      => res.status(400).json('Error: ', +err));
});


//>>>>>>>>>>>>>>>>>>Router to delete a given exercise by taking an id>>>>>>>>>>>> */
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(()    => res.json('Exercise Deleted.'))
        .catch(err  => res.status(400).json('Error: ', +err));
});


//>>>>>>>>>>>>>>>>>>Router to update info about a given exercise by taking an id>>>>>>>>>>>> */

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise =>{
            exercise.username       = req.params.username;
            exercise.description    = req.params.description;
            exercise.duration       = Number(req.params.duration);
            exercise.date           = Date.parse(req.params.date);

            exercise.save()
                .then(()    => res.json('Exercise updated!'))
                .catch(err  => res.status(400).json('Error', +err));
        })
        .catch(err => res.status(400).json('Error: ', +err));
})

module.exports = router;