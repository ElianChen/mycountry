/**
 * Created by yaoyin on 2016/6/24.
 */

//该文件用于测试

var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/',
    function(req, res, next){
        next();
    },
    function(req, res,next) {

        var a1 = Object.prototype.toString.call( require('../data/test') ).slice(8,-1);

        var a2 = require('../data/test')[0]['a'];

        var a3 = (require('../data/user')['name']);

        res.send([a1, a2, a3].join('<br/><br/>'));
    }
);

module.exports = router;


