var express = require('express');
var router = express.Router();
const settingsController = require("../controllers/settings_controller");

router.get('/user/social/get/all',settingsController.getUserAllSocialLinks);
router.post('/user/social/add',settingsController.insertUserSocialLink);
router.post('/user/social/update',settingsController.updateUserSocialLink);

module.exports = router