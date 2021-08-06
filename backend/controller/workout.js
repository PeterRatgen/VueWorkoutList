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

    for (let exercise of workout_log.exerciseList) {
        let exId = new ObjectId()
        exercise["id"] = exId
        for (let set of exercise.set) {
            set["id"] = new ObjectId()
        }
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
            db.close();
        });
    });
    res.send("Document modified: " + req.body);

}

exports.workout_post_update_exercise = function(req, res) {
    mongo.MongoClient.connect (process.env.DB_URL, function(err, db) {
        if (err) throw err;
        let dbase = db.db("workout_db");
        dbase.collection("workouts").updateOne(
            {
                _id: ObjectId(req.body.id)
            }, 
            {
                $set : 
                    { 
                        exerciseList : req.body.exerciseList
                    }
            }, function(err, result) {
                if (err) throw err;
                db.close();
            }
        );
    });
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send("document modified: " + req.body);
}


exports.workout_put_exercise_name = function(req, res) {
    let body = req.body
    mongo.MongoClient.connect (process.env.DB_URL, function(err, db) {
        if (err) throw err;
        let dbase = db.db("workout_db");
        let query = { 
            _id: ObjectId(req.body.id)
        }
        let newValues = {
            $set : { 
                "exerciseList.$[el].name" : body.name
            }
        }
        let options = { 
            arrayFilters : [
                { 
                    "el.id" : ObjectId(body.exerciseId)
                } 
            ]
        }     
        dbase.collection("workouts").updateOne(
            query, 
            newValues, 
            options,
            function(err, result) {
                if (err) throw err;
                db.close();
                console.log(body)
                res.send(result)
            });
    });
}

exports.workout_change_reps = function(req, res) {
    let body = req.body
    console.log(req.body)
    mongo.MongoClient.connect (process.env.DB_URL, function(err, db) {
        if (err) throw err;
        let dbase = db.db("workout_db");
        let query = { _id: ObjectId(req.body.workoutId), userId: ObjectId(req.user["userId"])}
        let newValues = {
            $set : { 
                "exerciseList.$[el].set.$[rep].weight" : body.repItem.weight,
                "exerciseList.$[el].set.$[rep].repetitions" : body.repItem.repetitions
            }
        }
        let options = { 
            arrayFilters : [
                { 
                    "el.id" : body.exerciseId
                }, 
                {
                    "rep.id" : body.repItem.id
                }
            ]
        }     
        dbase.collection("workouts").updateOne(
            query, 
            newValues, 
            options,
            function(err, result) {
                if (err) throw err;
                console.log(JSON.stringify(result))
                console.log(JSON.stringify(req.body))
                db.close();
                if (result.modifiedCount == 0) {
                    res.send("Completed successfully, none modified. Found " + result.matchedCount + " documents.")
                } else {
                    res.send("Result modified")
                }
            }
        );
    });
}

exports.workout_add_exercise = function(req, res) {
    mongo.MongoClient.connect (process.env.DB_URL, function(err, db) {
        if (err) throw err;
        let dbase = db.db("workout_db");

        let new_exercise = {
            id : new ObjectId(),
            name : '',
            set : []
        }
        let query = { _id: ObjectId(req.body.workoutId), userId: ObjectId(req.user["userId"])}
        let newValues = {
            $push : { 
                "exerciseList" : new_exercise
            }
        }
        dbase.collection("workouts").updateOne(
            query, 
            newValues, 
            function(err, result) {
                if (err) throw err;
                console.log(JSON.stringify(result))
                console.log(JSON.stringify(req.body))
                db.close();
                if (result.modifiedCount == 0) {
                    res.send("Completed successfully, none modified. Found " + result.matchedCount + " documents.")
                } else {
                    res.send(new_exercise.id)
                }
            }
        );
    });

}

exports.workout_add_repetition = function(req, res) {
    let body = req.body
    mongo.MongoClient.connect (process.env.DB_URL, function(err, db) {
        console.log(" ")
        console.log("Adding a new repetition")
        console.log(" ")
        console.log("To the workout " + body.workoutId)
        console.log("To the exercise " + body.exerciseId)
        console.log("The new repetition " + JSON.stringify(body.repetitions))
        if (err) throw err;
        body.repetitions.id = new ObjectId()
        let dbase = db.db("workout_db");
        let query = { _id: ObjectId(body.workoutId), userId: ObjectId(req.user["userId"])}
        let newValues = {
            $push : { 
                "exerciseList.$[el].set" : body.repetitions,
            }
        }
        let options = { 
            arrayFilters : [
                { 
                    "el.id" : body.exerciseId
                }, 
            ]
        }     
        dbase.collection("workouts").updateOne(
            query, 
            newValues, 
            options,
            function(err, result) {
                if (err) throw err;
                db.close();
                res.send(body.repetitions.id)
            }
        );
    });
}
