const express = require('express');
const router = express.Router();

const user_controller = require('../controller/users.js')

router.post("/user", user_controller.user_post);
router.get("/user/:userId", user_controller.user_get);
router.delete("/user/:userId", user_controller.user_delete);

router.post("/user/generateToken", user_controller.generate_token)
router.get("/user/validateToken", user_controller.validate_token)

module.exports = router;
