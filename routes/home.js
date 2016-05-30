var express = require('express');
var router = express.Router();

router.get('/',function(req,res){

    res.render("home",{title:'Home'});//res.locals在home.html中也可使用
});

module.exports = router;