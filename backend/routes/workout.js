const express = require('express');
const router = express.Router();

workout_controller = require('../controller/workout.js')

app.post("/workout/:userId", workout_controller.workout_post);
app.get("/workout/:userId", workout_controller.workout_get);
app.delete("/workout/:workoutId", workout_controller.workout_delete);

module.exports = router
