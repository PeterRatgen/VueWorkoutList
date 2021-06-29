const express = require('express');
const router = express.Router();
require('dotenv').config();

const authentication = require('../middleware/authentication.js')
const user_controller = require('../controller/users.js')


router.post('/user', user_controller.user_post);
router.get('/user/:userId', user_controller.user_get);
router.delete('/user/:userId', user_controller.user_delete);

router.post('/login', user_controller.login);
router.get('/user_validateToken', authentication.authenticate_token , user_controller.validate_token);

module.exports = router;
