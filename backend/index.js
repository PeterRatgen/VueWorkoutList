const express = require('express');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
let mongo = require('mongodb');
const {ObjectId} = require('mongodb');
let url = "mongodb://peter:Pepsi1609@localhost:27017/?authSource=admin";

const app = express();

app.set("trust proxy", 'loopback');

app.use(bodyParser.json());

mongo.MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	let dbase = db.db("workout_db")
});

app.post("/user", function(req, res) {
	if ('userId' in req.body === false) {
		res.send("Include 'userId' attribute.")
	}
	if ('name' in req.body === false) {
		res.send("Include 'name' attribute")
	}
	mongo.MongoClient.connect (url, function(err, db) {
		if (err) throw err;
		let dbase = db.db("workout_db");
		dbase.collection("workouts").insertOne(req.body, function(err, result) {
			if (err) throw err;
			console.log("1 document inserted");
			console.log(res.body)
			db.close();
		});
	});
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.send("document inserted: " + req.body);
});

app.get("/user/:userId", function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	mongo.MongoClient.connect (url, function(err, db) {
		if (err) throw err;
		let dbase = db.db("workout_db");
		dbase.collection("users").findOne({_id :  ObjectId(req.params.userId)}, function(err, result) {
			if (err) throw err;
			console.log("1 document found");
			console.log(result);
			res.send(result);
			db.close();
		});
	});
});

app.post("/workout/:userId", function(req, res) {
	if ('workout' in req.body === false) { 
		res.status(400);
		res.send("Include 'workout' to log.")
	}
	//check if user exists
	let workout_log = req.body.workout;

	if ('title' in workout_log === false) {
		res.status(400);
		res.send("Include title in workout object")
	}

	if ('dueDate' in workout_log === false) {
		res.status(400);
		res.send("Include dueDate in workout object")
	}

	let date = new Date();
	workout_log["dateCreated"] = date.valueOf();

	mongo.MongoClient.connect (url, function(err, db) {
		if (err) throw err;
		let dbase = db.db("workout_db");
		dbase.collection("workouts").insert({userId: ObjectId(req.params.userId), workout_log}, function(err, result) {
			if (err) throw err;
			console.log("1 document inserted");
			console.log(result.body)
			db.close();
		});
	});
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.send("document inserted: " + req.body);
});

app.get("/workout/:userId", function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	mongo.MongoClient.connect (url, function(err, db) {
		if (err) throw err;
		let dbase = db.db("workout_db");
		dbase.collection("workouts").findOne({userId: ObjectId("60d5e7e008f882d5aab24f8b")}, function(err, result) {
			if (err) throw err;
			console.log("1 document found");
			console.log(result);
			res.send(result);
			db.close();
		});
	});
});

app.use(serveStatic("../frontend/dist"));

app.listen(3001, function () {
	console.log("Listening on port 3001")
})
