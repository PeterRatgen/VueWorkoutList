let mongo = require('mongodb');
const dotenv = require('dotenv');
const {ObjectId} = require('mongodb');
dotenv.config();

exports.workout_post = function(req, res) {
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
    workout_log["userId"] = ObjectId(req.user["userId"]);

	mongo.MongoClient.connect (process.env.DB_URL, function(err, db) {
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
}

exports.workout_get = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	mongo.MongoClient.connect (process.env.DB_URL, function(err, db) {
		if (err) throw err;
		let dbase = db.db("workout_db");
		dbase.collection("workouts").find({userId: ObjectId(req.user["userId"])}, {limit : 10}).toArray( function(err, result) {
			if (err) throw err;
			console.log("1 document found");
			console.log(result);
			res.send(result);
			db.close();
		});
	});
}

exports.workout_delete = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
	mongo.MongoClient.connect (process.env.DB_URL, function(err, db) {
		if (err) throw err;
		let dbase = db.db("workout_db");
		dbase.collection("workouts").deleteOne({_id : ObjectId(req.params.workoutId), userId: ObjectId(req.user["userId"])}, function(err, result) {
			if (err) throw err;
			console.log("1 document found");
			console.log(result);
			res.send(result);
			db.close();
		});
	});
}


exports.workout_post_rename =  function(req, res) {
	const body = req.body
	mongo.MongoClient.connect (process.env.DB_URL, function(err, db) {
		if (err) throw err;
		let dbase = db.db("workout_db");
		let query = { _id: ObjectId(body["id"])}
		let newValues = {$set : { title : body["name"]}}
		dbase.collection("workouts").updateOne(query, newValues, function(err, result) {
			if (err) throw err;
			console.log("Document updated");
			db.close();
		});
	});
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.send("document modified: " + req.body);

}


