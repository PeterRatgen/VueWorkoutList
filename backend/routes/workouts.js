const express = require('express');
const router = express.Router();
require('dotenv').config();

const authentication = require('../middleware/authentication.js')
const workout_controller = require('../controller/workout.js')

router.post("/workout", authentication.authenticate_token, workout_controller.workout_post);
router.get("/workout", authentication.authenticate_token, workout_controller.workout_get);
router.delete("/workout/:workoutId", authentication.authenticate_token, workout_controller.workout_delete);

module.exports = router
