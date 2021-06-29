let mongo = require('mongodb');
const {ObjectId} = require('mongodb');
let url = "mongodb://peter:Pepsi1609@localhost:27017/?authSource=admin";

exports.user_get = function(req, res) {
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
}

exports.user_post = function(req, res) {
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

