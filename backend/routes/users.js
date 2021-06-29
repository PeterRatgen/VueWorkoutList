const express = require('express');
const router = express.Router();

user_controller = require('../controller/users.js')

router.post("/user", user_controller.user_post);
router.get("/user/:userId", user_controller.user_get);
router.delete("/user/:userId", user_controller.user_delete);

module.exports = router;
