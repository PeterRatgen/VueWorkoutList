let mongo = require('mongodb');
const {ObjectId} = require('mongodb');
require('dotenv').config();
const authentication = require('../middleware/authentication.js')



exports.user_post = function(req, res) {
	if ('userId' in req.body === false) {
		res.send("Include 'userId' attribute.")
	}
	if ('name' in req.body === false) {
		res.send("Include 'name' attribute")
	}
	mongo.MongoClient.connect (process.env.DB_URL, function(err, db) {
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

exports.user_get = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	mongo.MongoClient.connect (process.env.DB_URL, function(err, db) {
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
}

exports.user_delete = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
	mongo.MongoClient.connect (process.env.DB_URL, function(err, db) {
		if (err) throw err;
		let dbase = db.db("workout_db");
		dbase.collection("users").deleteOne({_id :  ObjectId(req.params.userId)}, function(err, result) {
			if (err) throw err;
			console.log(result);
			res.send(result);
			db.close();
		});
	});
}


exports.generate_token = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const token = authentication.generate_token({userId : req.params.userId})
    res.json(token);
}


exports.validate_token = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send("authenticated " + JSON.stringify(req.userId));
}
