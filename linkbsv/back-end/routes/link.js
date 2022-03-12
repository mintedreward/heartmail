var express = require('express');
var router = express.Router();
const linkController = require("../controllers/link_controller");

router.get('/user/get/all',linkController.getUserLinks);
router.post('/user/add',linkController.addUserLink);
router.post('/user/update',linkController.updateUserLink);
router.post('/user/delete',linkController.deleteUserLink);
router.post('/user/orderWeight/update',linkController.updateUserLinkOrderWeightData);
router.post('/user/order/update',linkController.updateUserLinkOrderData);

module.exports = router