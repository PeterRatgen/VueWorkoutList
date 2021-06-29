const express = require('express');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const app = express();

app.set("trust proxy", 'loopback');

app.use(bodyParser.json());

const userRoute = require('./routes/users.js')
const workoutRoute = require('./routes/workouts.js')
app.use(userRoute)
app.use(workoutRoute)

app.use(serveStatic("../frontend/dist"));

app.listen(3001, function () {
	console.log("Listening on port 3001")
})
