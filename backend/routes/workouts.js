const express = require('express');
const router = express.Router();

workout_controller = require('../controller/workout.js')

router.post("/workout/:userId", workout_controller.workout_post);
router.get("/workout/:userId", workout_controller.workout_get);
router.delete("/workout/:workoutId", workout_controller.workout_delete);

module.exports = router
