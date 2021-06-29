const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const user_controller = require('../controller/users.js')

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

router.post("/user", user_controller.user_post);
router.get("/user/:userId", user_controller.user_get);
router.delete("/user/:userId", user_controller.user_delete);

router.post("/user/generateToken", user_controller.generate_token)
router.get("/user/validateToken", authenticateToken, user_controller.validate_token)

module.exports = router;
