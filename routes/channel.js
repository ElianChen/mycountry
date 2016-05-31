/**
 * Created by yaoyin on 2016/5/31.
 */
'use strict';

var express = require('express');
var router = express.Router();


var listCtrl = require('../controller/channel/list');

router.get('/list',listCtrl.actionList);

module.exports = router;
