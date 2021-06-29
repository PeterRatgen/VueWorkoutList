const express = require('express');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();

app.set("trust proxy", 'loopback');

app.use(bodyParser.json());

dotenv.config();

const userRoute = require('./routes/users.js')
const workoutRoute = require('./routes/workouts.js')
app.use(userRoute)
app.use(workoutRoute)

app.use(serveStatic("../frontend/dist"));

app.listen(process.env.PORT, function () {
	console.log("Listening on port 3001")
})
