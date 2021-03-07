const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World')
})

var server = app.listen(3001, function () {
  console.log("Listening on port 3001")
})
