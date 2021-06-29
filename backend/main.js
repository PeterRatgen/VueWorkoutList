const express = require('express');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.set("trust proxy", 'loopback');

app.use(bodyParser.json());

const PORT = process.env.PORT;

const userRoute = require('./routes/users.js')
const workoutRoute = require('./routes/workouts.js')
app.use(userRoute)
app.use(workoutRoute)

app.use(serveStatic("../frontend/dist"));

console.log("port is " + PORT);
app.listen(PORT, function () {
	console.log("Listening on port " + PORT)
})
