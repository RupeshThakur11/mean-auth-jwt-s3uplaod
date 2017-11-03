var express = require('express');
var router = express.Router();

var downloadController = require('../controllers/downloadController');


router.post('/up', downloadController.uploadFile);
router.post('/getObj', downloadController.getObjects);
module.exports = router;
