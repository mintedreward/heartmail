var express = require('express');
var router = express.Router();
const authController = require("../controllers/auth_controller");

router.post('/signup',authController.doSignUp);
router.post('/signin',authController.doSignIn);
router.get('/state',authController.getAuthState);

module.exports = router