var express = require('express');
var router = express.Router();
const referralController = require("../controllers/referral_controller");

router.get('/user/get',referralController.getReferralInfo);

module.exports = router