let mongo = require('mongodb');
const {ObjectId} = require('mongodb');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

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
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    let data = {
        time: Date(),
        userId: 12,
    }
  
    const token = jwt.sign(data, jwtSecretKey);
    res.send(token);
}


exports.validate_token = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = req.header(tokenHeaderKey);
        console.log(token)
  
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Successfully Verified");
        } else{
            // Access Denied
            return res.status(401).send('err');
        }
    } catch (err) {
        // Access Denied
        return res.status(401).send('err');
    }

}
