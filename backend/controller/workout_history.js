let mongo = require('mongodb');
const {ObjectId} = require('mongodb');
require('dotenv').config();



exports.start_workout = function(req, res) {
	mongo.MongoClient.connect (process.env.DB_URL, function(err, db) {
		if (err) throw err;
		let dbase = db.db("workout_db");
        let date = new Date();
		dbase.collection("workout_history").insertOne({
            workoutId: ObjectId(req.body.workoutId),
            userId : ObjectId(req.user.userId),
            startTime : date.valueOf()
        }, function(err, result) {
			if (err) {
                console.log(err)
                throw err;
            }
            res.send(result.insertedId)
			db.close();
		});
	});
	res.setHeader('Access-Control-Allow-Origin', '*')
}

