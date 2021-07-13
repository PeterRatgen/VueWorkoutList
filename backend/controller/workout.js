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

    if ('exerciseList' in workout_log === false ) {
        res.status(400);
        res.send("Include sets in post")
    }

    let date = new Date();
    workout_log["dateCreated"] = date.valueOf();
    workout_log["userId"] = ObjectId(req.user["userId"]);

    mongo.MongoClient.connect (process.env.DB_URL, function(err, db) {
        if (err) throw err;
        let dbase = db.db("workout_db");
        dbase.collection("workouts").insertOne(workout_log, function(err, result) {
            if (err) throw err;
            res.send(result["insertedId"])
            db.close();
        });
    });
}

exports.workout_get = function(req, res) {
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
    mongo.MongoClient.connect (process.env.DB_URL, function(err, db) {
        if (err) throw err;
        let body = req.body
        let dbase = db.db("workout_db");
        let query = { _id: ObjectId(body["id"])}
        let newValues = {$set : { title : body["title"]}}
        dbase.collection("workouts").updateOne(query, newValues, function(err, result) {
            if (err) throw err;
            console.log("Document updated " + result);
            db.close();
        });
    });
    res.send("Document modified: " + req.body);

}

exports.workout_post_update_exercise = function(req, res) {
    mongo.MongoClient.connect (process.env.DB_URL, function(err, db) {
        if (err) throw err;
        let dbase = db.db("workout_db");
        dbase.collection("workouts").updateOne({ _id: ObjectId(req.body.id)}, {$set : { exerciseList : req.body.exerciseList}}, function(err, result) {
            if (err) throw err;
            console.log("1 document inserted");
            console.log(result.body)
            db.close();
        });
    });
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send("document modified: " + req.body);
}


exports.workout_put_exercise_name = function(req, res) {
    let body = req.body
    mongo.MongoClient.connect (process.env.DB_URL, function(err, db) {
        if (err) throw err;
        let dbase = db.db("workout_db");
        let query = { _id: ObjectId(req.body.id)}
        let newValues = {
            $set : { 
                "exerciseList.$[el].name" : body.name
            }
        }
        let options = { 
            arrayFilters : [
                { 
                    "el.id" : body.exerciseId
                } 
            ]
        }     
        dbase.collection("workouts").updateOne(
            query, 
            newValues, 
            options,
            function(err, result) {
                if (err) throw err;
                console.log("1 document inserted");
                console.log(result.body)
                db.close();
                res.send("Completed successfully")
            });
    });
}

exports.workout_change_reps = function(req, res) {
    let body = req.body
    mongo.MongoClient.connect (process.env.DB_URL, function(err, db) {
        if (err) throw err;
        let dbase = db.db("workout_db");
        let query = { _id: ObjectId(req.body.workoutId)}
        let newValues = {
            $set : { 
                "exerciseList.$[el].set.$[rep].weight" : body.rep.weight,
                "exerciseList.$[el].set.$[rep].repetitions" : body.rep.repetitions
            }
        }
        let options = { 
            arrayFilters : [
                { 
                    "el.id" : body.exerciseId,
                    "rep.id" : body.repId
                } 
            ]
        }     
        dbase.collection("workouts").updateOne(
            query, 
            newValues, 
            options,
            function(err, result) {
                if (err) throw err;
                console.log("1 document inserted");
                console.log(result.body)
                db.close();
                res.send("Completed successfully")
            });
    });
}
