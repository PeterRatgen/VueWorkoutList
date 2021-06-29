const express = require('express');
const router = express.Router();

app.post("/workout/:userId", function(req, res) {
	//check if user exists
	let workout_log = req.body;

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
    workout_log["userId"] = ObjectId(req.params.userId);

	mongo.MongoClient.connect (url, function(err, db) {
		if (err) throw err;
		let dbase = db.db("workout_db");
		dbase.collection("workouts").insertOne(workout_log, function(err, result) {
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
		dbase.collection("workouts").find({userId: ObjectId(req.params.userId)}, {limit : 10}).toArray( function(err, result) {
			if (err) throw err;
			console.log("1 document found");
			console.log(result);
			res.send(result);
			db.close();
		});
	});
});

app.delete("/workout/:workoutId", function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
	mongo.MongoClient.connect (url, function(err, db) {
		if (err) throw err;
		let dbase = db.db("workout_db");
		dbase.collection("workouts").deleteOne({_id : ObjectId(req.params.workoutId)}, function(err, result) {
			if (err) throw err;
			console.log("1 document found");
			console.log(result);
			res.send(result);
			db.close();
		});
	});
})

module.exports = router
