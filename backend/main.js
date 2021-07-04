require('dotenv').config();
const express = require('express');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.set("trust proxy", 'loopback');

app.use(bodyParser.json());

//Support preflight requests
app.options('*', cors());


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
