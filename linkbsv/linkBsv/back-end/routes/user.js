var express = require('express');
var router = express.Router();
const userController = require("../controllers/user_controller");


router.get('/top/get/all',userController.getTopUsers);
router.post('/profile/update',userController.updateUserProfileData);

module.exports = router