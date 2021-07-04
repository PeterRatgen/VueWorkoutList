let mongo = require('mongodb');
const {ObjectId} = require('mongodb');
require('dotenv').config();
const authentication = require('../middleware/authentication.js')



exports.user_post = function(req, res) {
	if ('name' in req.body === false) {
		res.send("Include 'name' attribute")
	}
	if ('email' in req.body === false) {
		res.send("Include 'email' attribute")
	}
	if ('password' in req.body === false) {
		res.send("Include 'password' attribute")
	}
	mongo.MongoClient.connect (process.env.DB_URL, function(err, db) {
		if (err) throw err;
		let dbase = db.db("workout_db");
		dbase.collection("users").insertOne(req.body, function(err, result) {
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
	mongo.MongoClient.connect (process.env.DB_URL, function(err, db) {
		if (err) throw err;
		let dbase = db.db("workout_db");
		dbase.collection("users").findOne({_id :  ObjectId(req.params.userId)}, function(err, result) {
			if (err) throw err;
			console.log("1 document found");
			console.log(result);
            res.setHeader('Access-Control-Allow-Origin', '*')
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

async function validateEmailAndPassword(email, password){
    let user = await findUserForEmail(email)
    if (user == undefined)
        return false

    if (user["password"] == password) {
        return true
    }
    else {
        return false
    }
}

async function findUserForEmail(email) {
    const db = await mongo.MongoClient.connect (process.env.DB_URL);
    let dbase = db.db("workout_db");
    const result = await dbase.collection("users").findOne({email : email});
    return result
}

exports.login = async function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const email = req.body.email,
        password = req.body.password;
    let result = await validateEmailAndPassword(email, password)
    if (result){
        let user = await findUserForEmail(email)
        const token = authentication.generate_token({userId: user["_id"]})

        res.send(token)
    }
    else {
        // send status 401 Unauthorized
        res.sendStatus(401); 
    }
}



exports.validate_token = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send("authenticated " + JSON.stringify(req.userId));
}
