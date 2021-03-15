const express = require('express');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
let mongo = require('mongodb');
let url = "mongodb://peter:Pepsi1609@localhost:27017/?authSource=workout_db";

const app = express();

app.set("trust proxy", 'loopback');

app.use(bodyParser.json());

mongo.MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let dbase = db.db("workout_db")
});

app.post("/adduser", function(req, res) {
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

app.get("/getUser/:userId", function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  mongo.MongoClient.connect (url, function(err, db) {
    if (err) throw err;
    let dbase = db.db("workout_db");
    dbase.collection("workouts").find({userId : req.params.userId}, {limit: 10}).toArray(function(err, result) {
      if (err) throw err;
      console.log("1 document found");
      console.log(result);
      res.send(result);
      db.close();
    }); 
  });
});

app.post("/addWorkout/:userId", function(req, res) {
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
    dbase.collection("workouts").updateOne({userId: req.params.userId}, {"$push" : {"workout" : workout_log }} , function(err, result) {
      if (err) throw err;
        console.log("1 document inserted");
        console.log(result.body)
      db.close();
    });
  });
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send("document inserted: " + req.body);
});

app.use(serveStatic("../todofront/dist"));

app.listen(3001, function () {
  console.log("Listening on port 3001")
})