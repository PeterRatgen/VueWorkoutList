const express = require('express');
const router = express.Router();
require('dotenv').config();

const authentication = require('../middleware/authentication.js')
const workout_controller = require('../controller/workout.js')
const cors = require('../middleware/cors_allow_all.js')

router.post("/workout", cors.allow_all,  authentication.authenticate_token, workout_controller.workout_post);
router.get("/workout", cors.allow_all, authentication.authenticate_token, workout_controller.workout_get);
router.delete("/workout/:workoutId", cors.allow_all, authentication.authenticate_token, workout_controller.workout_delete);

router.post("/workout/rename", cors.allow_all, authentication.authenticate_token, workout_controller.workout_post_rename);
router.post("/workout/update_exercise", cors.allow_all, authentication.authenticate_token, workout_controller.workout_post_update_exercise)

router.put("/workout/rename_exercise", cors.allow_all, authentication.authenticate_token, workout_controller.workout_put_exercise_name)
router.put("/workout/rep_change", cors.allow_all, authentication.authenticate_token, workout_controller.workout_change_reps)

router.post("/workout/add_exercise", cors.allow_all, authentication.authenticate_token, workout_controller.workout_add_exercise)

module.exports = router
