var express = require('express');
var router = express.Router();
const appearaneController = require("../controllers/appearance_controller");

router.get('/user/get',appearaneController.getUserAppearanceInfo);
router.post('/user/add',appearaneController.addUserAppearanceInfo);
router.post('/user/update',appearaneController.updateUserAppearanceInfo);

module.exports = router